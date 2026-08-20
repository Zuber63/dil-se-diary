import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useOutletContext,useNavigate } from "react-router";
import { updateprofile } from "../Appwrite/service";
import toast from 'react-hot-toast'
const EditProfile = () => {
  const navigate= useNavigate()
const {data,getdata}=useOutletContext()

const [pre,setpre] = useState()
const refinput =useRef()
const handleinput=()=>{
  refinput.current.click()}
const {register,handleSubmit,watch,reset}=useForm({
  defaultValues:data ||{}
})
useEffect(()=>{
reset(data)
},[data,reset])

const image =watch("image")
useEffect(()=>{
  if(image?.[0] instanceof File){
    const url =URL.createObjectURL(image?.[0])
setpre(url)

  }
  else{
    setpre(image)
  }


},[image])



const onsubmit = async (pdata) => {
  try {
    await updateprofile(pdata, data.$id);

    toast.success("Profile updated successfully");

    await getdata(); // agar yeh bhi async hai

    navigate("/Deshboard/");
  } catch (error) {
    toast.error("Profile update failed");
    console.error(error);
  }
};

  return (
    <div className="p-8 flex-1 bg-[#fdf6f0] min-h-screen">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-[#3e2c2c]">
          Edit Profile
        </h1>
        <p className="text-gray-500">
          Update your personal information
        </p>
      </div>
<form onSubmit={handleSubmit(onsubmit)} action="">
      {/* Profile Section */}
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-5xl">

        <div className="flex flex-col md:flex-row gap-12">

          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <img
              src={pre?pre:`https://api.dicebear.com/9.x/initials/svg?seed=${data.fullname}`}
              className="w-40 h-40 rounded-full object-cover border-4 border-[#e8d5c4]"
            />
<input {...register("image")} type='file'  />
{/* <input {...register("image1")} type='file' ref={refinput} className="hidden"   /> */}
            {/* <button onClick={handleinput} className="mt-4 cursor-pointer text-[#8b5e3c] hover:underline">
              Change Photo
            </button> */}
          </div>

          {/* Form */}
          <div className="flex-1 space-y-6">

            <div>
              <label className="block text-gray-600 mb-2">
                Full Name
              </label>
              <input
            {...register("fullname")}
                type="text"
                placeholder="Enter your name"
                className="w-full border p-3 rounded-lg outline-none focus:border-[#8b5e3c]"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Email
              </label>
              <input
              {...register("email")}
              readOnly
                type="text"
                placeholder="email"
                className="w-full border p-3 rounded-lg outline-none focus:border-[#8b5e3c]"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Bio
              </label>
              <textarea
              {...register("bio")}
                placeholder="Write about yourself..."
                className="w-full border p-3 rounded-lg h-32 outline-none focus:border-[#8b5e3c]"
              ></textarea>
            </div>

        

            <div className="flex gap-4 pt-4">

              <button type="submit" className=" bg-[#e8a0a8] cursor-pointer text-white px-6 py-3 rounded-lg  bg-[#e8a0a8] text-white rounded-xl hover:bg-[#d88c94] transition">
                Save Changes
              </button>

              <button type="button" onClick={()=>navigate('/Deshboard/profile')} className="cursor-pointer border px-6 py-3 rounded-lg hover:bg-gray-100">
                Cancel
              </button>

            </div>

          </div>

        </div>
      </div>
</form>
    </div>
  );
};

export default EditProfile;