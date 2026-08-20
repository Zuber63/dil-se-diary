import { useOutletContext, Link } from "react-router";
import { Deletpost } from "../Appwrite/service";
import toast from "react-hot-toast";
import { useState } from "react";
import { RiMenuUnfold3Fill } from "react-icons/ri";
const DeshboardHome = () => {
  const { data, postdata, getdata } = useOutletContext();
  const [inputv, setinputv] = useState("");
  const delet = (id) => {
    const c = confirm("Are you sure You want to delet your post");
    if (c) {
      Deletpost(id);
      getdata();
      toast.success("your post deleted successfully");
    }
  };
  const draft = postdata.filter((d) => d.status == "draft");
  const publish = postdata.filter((d) => d.status == "publish");
  const filter = postdata.filter((d) => {
    return d.title.toLowerCase().includes(inputv.toLowerCase().trim());
  });
  return (
    //   {/* Main Content */}
    <div className="flex-1 p-8">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-serif text-[#3e2c2c]">
            Welcome Back, {data.fullname} 👋
          </h2>
          <p className="text-[#7a6c6c]">Let your thoughts flow today.</p>
        </div>

        <img
          src={
            data?.image
              ? data.image
              : `https://api.dicebear.com/9.x/initials/svg?seed=${data.fullname}`
          }
          alt="profile"
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h4 className="text-sm text-[#7a6c6c]">Total Posts</h4>
          <p className="text-2xl font-semibold text-[#3e2c2c] mt-2">
            {postdata.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h4 className="text-sm text-[#7a6c6c]">Draft posts</h4>
          <p className="text-2xl font-semibold text-[#3e2c2c] mt-2">
            {draft.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h4 className="text-sm text-[#7a6c6c]">Publish Posts</h4>
          <p className="text-2xl font-semibold text-[#3e2c2c] mt-2">
            {publish.length}
          </p>
        </div>
      </div>

      {/* Recent Posts */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-serif text-[#3e2c2c]">Recent Diaries</h3>

          <Link to={"/Deshboard/CreatePost"}>
            <button className="bg-[#e8a0a8] cursor-pointer   text-white px-5 py-2 rounded-full hover:bg-[#d88c94] transition">
              + New Post
            </button>
          </Link>
        </div>
        <div className="mb-10">
          {/* Input */}
          <input
            type="text"
            onChange={(e) => setinputv(e.target.value)}
            placeholder="Search by Title."
            className="w-1.5xl pl-12 pr-4 py-3 rounded-full bg-white shadow-md border border-[#e5dcd5] focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] text-[#3e2c2c]"
          />
        </div>
        <div className="space-y-4">
          {filter?.reverse().map((p) => {
            return (
              <div
                key={p.$id}
                className="bg-white  p-5 rounded-xl shadow-sm flex justify-between items-center"
              >
                <div>
                  <h4 className="text-lg font-serif text-[#3e2c2c]">
                    {p.title}
                  </h4>
                  <p className="text-sm text-[#7a6c6c]">{p.category}</p>
                </div>

                <div className="space-x-4 text-sm">
                  <Link to={`/Deshboard/ViewPost/${p.$id}`}>
                    {" "}
                    <button className="cursor-pointer text-[#e8a0a8] hover:underline">
                      view
                    </button>
                  </Link>
                  <Link to={`/Deshboard/EditPost/${p.$id}`}>
                    {" "}
                    <button className="cursor-pointer text-[#e8a0a8] hover:underline">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => delet(p.$id)}
                    className="cursor-pointer text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Empty State */}
        {filter.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
            <p>No posts on this Title 😢</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeshboardHome;
