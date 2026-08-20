import { useParams } from "react-router";
import { Getsingleblog } from "../Appwrite/service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
const FullStory = () => {
  const navigate=  useNavigate()
const {id}=useParams()
const [data,setdata]=useState()
const getblog=async()=>{
const d = await Getsingleblog(id)
setdata(d)
}

useEffect(()=>{
    getblog()
},[id])


const sethtml=(d)=>{
  return {__html:d}
}

    return (
        <div className="min-h-screen  bg-[#fdf6f0] flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
  {/* Container */}
  <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 sm:p-10">
    
    {/* Back Button */}
    <button onClick={()=>navigate("/")} className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium mb-6">
      &larr; Back
    </button>

    {/* Story Title */}
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-gray-900 leading-tight">
      {data?.title}
    </h1>

    {/* Author & Date */}
    <div className="text-sm sm:text-base text-gray-500 mb-8 flex flex-col sm:flex-row sm:items-center sm:space-x-3">
      <span>By <span className="font-medium">{data?.fullname}</span></span>
      <span className="hidden sm:block">•</span>
      <span>{data?.$createdAt 
    ? new Date(data?.$createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : ""}</span>
    </div>

    {/* Featured Image */}
    <div className="w-full mb-8">
      <img
        src={data?.thumbnail}
        alt="Story Image"
        className="w-full h-64 sm:h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
      />
    </div>

    {/* Story Content */}
    <div className="text-gray-800 text-base sm:text-lg lg:text-xl space-y-6 leading-relaxed">
      <p dangerouslySetInnerHTML={sethtml(data?.description)}>
      </p>
   
    </div>


  </div>
</div>
    )
}



export default FullStory;