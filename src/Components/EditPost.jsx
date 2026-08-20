import { useParams } from "react-router";
import PostForm from "./PostForm";
import { Getsinglepost } from "../Appwrite/service";
import { useEffect, useState } from "react";
import { updatesinglenpost } from "../Appwrite/service";
const EditPost = () => {
const [post,setpost]=useState({})
const {postid}=useParams()

const singlepost=async()=>{
const singlepostdata =await Getsinglepost(postid) 
setpost(singlepostdata)
}
useEffect(()=>{
singlepost()
},[])

    return ( <div className="min-h-screen bg-[#fdf6f0] p-10">
      <div className="max-w-full mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-3xl font-serif text-[#3e2c2c] mb-8">
          Edit Post
        </h1>

      <PostForm isedit={true} post={post} createblog={updatesinglenpost} />
      </div>
    </div>)
}



export default EditPost;