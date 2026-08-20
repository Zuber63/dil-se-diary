import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

const MyPosts = () => {
  const { postdata } = useOutletContext();
  const [fdata, setfdata] = useState("All");
  const [search, setsearch] = useState("");
  const navigate = useNavigate();
  const matchSearch = postdata.filter((item) => {
    if (fdata === "All") return true;
    return item.status === fdata;
  });

  const filter = matchSearch.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase().trim()),
  );
  return (
    <div className="p-6 bg-[#fdf6f0] min-h-screen w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-serif text-[#3e2c2c]">My Posts</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap ">
        <button
          onClick={() => setfdata("All")}
          className={`px-4 py-1 cursor-pointer rounded-full border text-[#e8a0a8] border-[#e8a0a8] ${
            fdata === "All" ? "bg-[#e8a0a8] text-white" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setfdata("publish")}
          className={`px-4 cursor-pointer py-1 rounded-full border border-[#e8a0a8] text-[#e8a0a8] ${
            fdata === "publish" ? "bg-[#e8a0a8] text-white" : ""
          }`}
        >
          Published
        </button>
        <button
          onClick={() => setfdata("draft")}
          className={`px-4 cursor-pointer py-1 rounded-full border border-[#e8a0a8] text-[#e8a0a8] ${
            fdata === "draft" ? "bg-[#e8a0a8] text-white" : ""
          }`}
        >
          Draft
        </button>
        {/* Input */}
        <input
          type="text"
          onChange={(e) => setsearch(e.target.value)}
          placeholder="Search by Title."
          className="px-4 py-1 rounded-full border border-[#e8a0a8]  focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] text-[#3e2c2c]"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filter?.reverse().map((post) => (
          <div
            onClick={() => navigate(`/Deshboard/ViewPost/${post.$id}`)}
            key={post.$id}
            className="bg-white cursor-pointer rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={post.thumbnail}
              alt="post"
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-[#3e2c2c]">
                {post.title}
              </h2>

              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {post.category}
              </p>

              {/* Status + Date */}
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    post.status === "publish"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {post.status}
                </span>

                <span className="text-xs text-gray-400">{}</span>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-4 text-[#3e2c2c]">
                <button className="hover:text-blue-500"></button>
                <button className="hover:text-red-500"></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filter.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p>No posts yet 😢</p>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
