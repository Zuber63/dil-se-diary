import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { isloading } from "../Redux/dilsediary";
import { useDispatch, useSelector } from "react-redux";
const PostForm = ({ createblog, post = null, isedit }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.blog);

  const dispatch = useDispatch();
  const { data, getdata } = useOutletContext();

  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: post,
  });
  const [preview, setPreview] = useState(null);
  const [editorContent, setEditorContent] = useState("");
  const handlecontent = (Content) => {
    setValue("description", Content);
    setEditorContent(Content);
  };

  const Description = watch("description");

  const image = watch("thumbnail");
  useEffect(() => {
    if (image?.[0] instanceof File) {
      const url = URL.createObjectURL(image?.[0]);
      setPreview(url);
    } else {
      setPreview(image);
    }
  }, [image]);

  const Createpost = async (d) => {
    dispatch(isloading(true));
    if (isedit) {
      await createblog(d, post.$id);
      toast.success("Post Update successfully");
    } else {
      await createblog(d, data.userid);
      toast.success("Post Save successfully");
    }
    await getdata();
    navigate("/Deshboard/");
    dispatch(isloading(false));
  };

  console.log(loading);
  useEffect(() => {
    reset(post);
    if (post) {
      setEditorContent(post.description);
    }
  }, [post, reset]);

  return (
    <form onSubmit={handleSubmit(Createpost)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Post Title
        </label>
        <input
          required
          {...register("title")}
          type="text"
          placeholder="Write your title..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#7c5c5c]"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Category</label>
        <input
          required
          list="catogry"
          {...register("category")}
          className="w-full cursor-pointer border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#7c5c5c]"
        />
        <datalist id="catogry">
          {" "}
          <option value="life"></option>
          <option value="love"></option>
          <option value="motivation"></option>
          <option value="stories"></option>
          <option value="shayari"></option>
          <option value="Technology"></option>
          <option value="Programming"></option>
          <option value="Web Development"></option>
          <option value="Frontend Development"></option>
          <option value="Backend Development"></option>
          <option value="Full Stack Development"></option>
          <option value="Mobile Development"></option>
          <option value="App Development"></option>
          <option value="Software Engineering"></option>
          <option value="UI/UX Design"></option>
          <option value="Graphic Design"></option>
          <option value="Product Design"></option>
          <option value="Artificial Intelligence"></option>
          <option value="Machine Learning"></option>
          <option value="Data Science"></option>
          <option value="Cyber Security"></option>
          <option value="Cloud Computing"></option>
          <option value="DevOps"></option>
          <option value="Open Source"></option>
          <option value="Startup"></option>
          <option value="Entrepreneurship"></option>
          <option value="Business"></option>
          <option value="Marketing"></option>
          <option value="Digital Marketing"></option>
          <option value="SEO"></option>
          <option value="Content Writing"></option>
          <option value="Blogging"></option>
          <option value="Freelancing"></option>
          <option value="Remote Work"></option>
          <option value="Career"></option>
          <option value="Productivity"></option>
          <option value="Time Management"></option>
          <option value="Self Improvement"></option>
          <option value="Personal Development"></option>
          <option value="Leadership"></option>
          <option value="Communication Skills"></option>
          <option value="Finance"></option>
          <option value="Investing"></option>
          <option value="Cryptocurrency"></option>
          <option value="Education"></option>
          <option value="Online Learning"></option>
          <option value="Student Life"></option>
          <option value="Lifestyle"></option>
          <option value="Health"></option>
          <option value="Fitness"></option>
          <option value="Mental Wellness"></option>
          <option value="Travel"></option>
          <option value="Food"></option>
          <option value="Photography"></option>
          <option value="Gaming"></option>
          <option value="Entertainment"></option>
          <option value="Books"></option>
          <option value="Movies"></option>
          <option value="General"></option>
        </datalist>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Upload Cover Image
        </label>

        <input
          className="cursor-pointer"
          {...register("thumbnail")}
          type="file"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-4 w-full h-64 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">
          Description
        </label>
        <SunEditor
          placeholder="Write your story..."
          height="400px"
          onChange={handlecontent}
          setContents={editorContent}
          setOptions={{
            buttonList: [
              ["bold", "italic", "underline", "strike"],
              ["formatBlock", "fontSize", "align", "list"],
              ["link"],
              ["undo", "redo"],
            ],
          }}
        />
      </div>

      <div></div>

      {/* Status */}
      <div>
        <label className="block mb-2 text-gray-700 font-medium">Status</label>

        <select
          {...register("status")}
          className="w-full cursor-pointer border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#7c5c5c]"
        >
          <option value="draft">Draft</option>
          <option value="publish">Publish</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          disabled={loading}
          type="submit"
          className="bg-[#e8a0a8] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#d88c94] transition duration-300"
        >
          {isedit ? "Update Post" : "create post"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/Deshboard/")}
          className=" cursor-pointer border px-6 py-3 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PostForm;
