import { FaHeart, FaBookmark } from "react-icons/fa";
import { Getsinglepost } from "../Appwrite/service";
import { useParams,Link } from "react-router";
import { useEffect, useState } from "react";
const ViewPost = () => {
 const {postid}=useParams()
 const [data,setdata]=useState({})
 const getpost =async()=>{
 const d=await Getsinglepost(postid)
 setdata(d)
 }
useEffect(()=>{
  getpost()
},[postid])
const sethtml=(d)=>{
  return {__html:d}
}

  return (
    <div className="bg-[#fdf6f0] min-h-screen w-full py-10 px-4 md:px-">

      {/* Post Container */}
      <div className="max-w-7xl  mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-md">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-serif text-[#3e2c2c] leading-tight">
          {data.title}
        </h1>

        {/* Author + Date */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span> {data.category}</span>
          {/* <span>{"post.date"}</span> */}
        </div>

        {/* Image */}
        <img
          src={data.thumbnail}
          alt=""
          className="w-full h-[300px] object-cover rounded-xl mt-6"
        />

        {/* Content */}
        <div dangerouslySetInnerHTML={sethtml(data.description)} className="mt-6  text-gray-700 leading-7 whitespace-pre-line">
          {/* {data.description} */}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8 border-t pt-4">


        <Link to={'/Deshboard/'} > <button className="text-sm cursor-pointer text-gray-500 hover:underline">
            Back to Home
          </button></Link> 
        </div>
      </div>
    </div>
  );
};

export default ViewPost;