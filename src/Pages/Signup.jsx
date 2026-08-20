import React from "react";
import { Link, useNavigate } from "react-router";
import {useForm} from 'react-hook-form'
import { account } from "../Appwrite/config";
import { ID } from "appwrite";
import {createUser} from "../Appwrite/service/"
import toast from "react-hot-toast";
const Signup = () => {
   const navigate= useNavigate()
   const {register,handleSubmit,formState:{errors} }= useForm()
console.log(errors)
   const onsubmit=async(d)=>{
try {
    const user = await account.create({
        userId: ID.unique(),
        email: d.email,
        password: d.password,
        fullname:d.fullname
    });
    createUser(d,user.$id)
    toast.success("Sign Up Successfuly")
    navigate('/Login')
}
 catch (e){
    console.error(e)
}

   }


  return (
    <div className="min-h-screen bg-[#fdf6f0] flex items-center justify-center px-6">

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-[#3e2c2c]">
            Create Account
          </h2>
          <p className="text-[#7a6c6c] text-sm mt-2">
            Join and start sharing your stories ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">

          {/* Full Name */}
          <div>
            <label className="block text-sm text-[#3e2c2c] mb-2">
              Full Name
            </label>
            <input
            {...register("fullname",{required:{
              value:true,
              message:"Full Name is Required"
            },
          minLength:{
            value:2,
            message:"Required Minimum 2 Charactor"
            
          }
          })}
            
              type="text"
              placeholder="Enter your name"
              
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] ${errors.fullname? "border-2 text-red-600 border-red-600  focus:ring-red-600":""}`}
            />
          </div>
          {errors.fullname && <span className="   block mt-1 text-center text-sm text-red-600">{errors.fullname.message}</span>}

          {/* Email */}
          <div>
            <label className="block text-sm text-[#3e2c2c] mb-2">
              Email Address
            </label>
            <input
            {...register("email",{
required:{
  value:true,
  message:"Email Is Required"
},
pattern:{
  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message:"Enter Valid Email Address"
}

            })}
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] ${errors.email? "border-2 border-red-600 text-red-600  focus:ring-red-600":""}`}
            />
          </div>
{errors.email &&<span className=" block mt-1 text-center text-sm text-red-600  ">{errors.email.message}</span> }
          {/* Password */}
          <div>
            <label className="block text-sm text-[#3e2c2c] mb-2">
              Password
            </label>
            <input
            {...register("password",{
              required:{
                value:true,
                message:"Password is Required"
              },
              pattern:{
                value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,32}$/,
message:"requires specific criteria, such as a minimum length and the inclusion of various character types"
              }
            })}
              type="password"
              placeholder="Create a password"
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] ${errors.password? "border-2 border-red-600 text-red-600 focus:ring-red-600":""}`}
            />
          </div>

      {errors.password && <span className="block mt-1 text-center text-sm text-red-600 ">{errors.password.message}</span>}

       

          {/* Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#e8a0a8] text-white py-3 rounded-full shadow-md hover:bg-[#d88c94] transition duration-300"
          >
            Sign Up
          </button>

        </form>

        {/* Login Redirect */}
        <p className="text-center text-sm text-[#7a6c6c] mt-6">
          Already have an account?{" "}
          <button onClick={()=>navigate('/Login')} className="cursor-pointer text-[#e8a0a8] font-medium hover:underline">

            Login
          </button>
          
        </p>

      </div>
    </div>
  );
};

export default Signup;  