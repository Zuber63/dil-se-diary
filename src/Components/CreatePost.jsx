import PostForm from "./PostForm";
import { createPost } from "../Appwrite/service";

const CreatePost = () => {
  return (
    <div className="min-h-screen bg-[#fdf6f0] p-10">
      <div className="max-w-full mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-serif text-[#3e2c2c] mb-8">
          Create New Post
        </h1>

        <PostForm isedit={false} createblog={createPost} />
      </div>
    </div>
  );
};

export default CreatePost;
