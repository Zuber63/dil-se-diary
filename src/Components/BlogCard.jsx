import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";


const Home = ({postdata}) => {
const [catt, setcatt]= useState("All")
const publishedPosts = postdata?.filter((d) => d.status === "publish");
const filterdata = publishedPosts?.filter((d)=>{
if(catt=="All") return true
return d.category==catt
})

const allCategories = postdata?.map(item => item.category);

    const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // filter categories
  const filtered = allCategories?.filter((cat) =>
    cat.toLowerCase().includes(search.toLowerCase().trim())
  );

  // show only 8 initially
  const visibleCategories = showAll ? filtered : filtered.slice(0, 5);

const sethtml=(d)=>{
  return {__html:d}
}

  return (
    <>
      <div className="w-full bg-[#fdf6f0] py-12 px-6">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore Categories
      </h2>

      {/* 🔍 Search Bar */}
      <div className="max-w-md mx-auto  mb-8">
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white px-4 py-2 rounded-full border focus:outline-none focus:border-none focus:ring-2 focus:ring-[#e8a0a8] "
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4">
              <button
                   onClick={
()=>{
  
  setcatt("All")
}
                   }
            className={`px-5 py-2  rounded-full shadow cursor-pointer ${
              catt==="All"?" text-white bg-[#e8a0a8] ":"bg-white hover:bg-[#e8a0a8]  hover:text-white transition"}`}
            >
              All
            </button>
        {visibleCategories.map((cat, index) => (
          
          <button
          key={index}
                   onClick={
()=>{
  
  setcatt(cat)
}
              }
            className={`px-5 py-2 text-black  rounded-full shadow cursor-pointer ${
              catt===cat?"bg-[#e8a0a8] text-white":"bg-white hover:bg-[#e8a0a8]  hover:text-white transition"}`}>
              {cat}
            </button>
          
        ))}
      </div>

      {/* More Button */}
      {filtered.length > 5 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-[#e8a0a8] text-white rounded-full hover:bg-[#d88c94]  transition"
          >
            {showAll ? "Show Less" : "More Categories"}
          </button>
        </div>
      )}
    </div>



    {/* card  */}
    
    <div id="blogs" className="bg-[#fdf6f0] min-h-screen px-4 md:px-10 py-10">

      {/* Heading */}
      <h1 className="text-4xl font-serif text-center mb-12 text-gray-800">
        💖 Latest Diary
      </h1>

    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {
        filterdata.reverse().slice(0,15)?.map((d)=>{
          return(
              
      <div key={d.$id} className="">

        {/* CARD */}
        <div className="bg-white  rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition">
          <img
            src={d.thumbnail}
            className="h-52 w-full object-cover"
          />
          <div className="p-5">
            
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={d.image}
                className="w-9 h-9 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold">{d.fullname}</p>
                <p className="text-xs text-gray-500">  {d?.$createdAt 
    ? new Date(d.$createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      })
    : ""}</p>
              </div>
            </div>

            <h2 className="text-lg font-bold line-clamp-1">
              {d.title}
            </h2>

            <p dangerouslySetInnerHTML={sethtml(d.description)}  className="text-sm text-gray-600 mb-4 line-clamp-3 ">
            
            </p>

         <Link to={`/FullStory/${d.$id}`} >  <button className="text-rose-500 cursor-pointer font-medium hover:underline">
              Read full story →
            </button></Link> 
          </div>
        </div>
        
      </div>

          )
        })
      }
   
    </div>
    <div className="mt-20 flex justify-center">
         <button
            
            className="px-6 py-2 cursor-pointer bg-[#e8a0a8] text-white rounded-full hover:bg-[#d88c94]  transition"
          >
            { "More Diarys"}
          </button>
    </div>
    
    </div>
    </>

  );
};

export default Home;