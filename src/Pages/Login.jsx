import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { account } from "../Appwrite/config";
import { isloading } from "../Redux/dilsediary";
import { islogin } from "../Redux/dilsediary";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { loading, session } = useSelector((state) => state.blog);

const onsubmit = async (d) => {
    dispatch(isloading(true));

    try {
      // Step 1: Pehle check karein ki agar koi purana session bacha hai toh use delete kar dein
      try {
        await account.deleteSession("current");
      } catch (err) {
        // Agar koi session nahi hoga toh error aayega, use ignore kar dena hai
      }

      // Step 2: Naya session create karein (Appwrite SDK expects direct email and password strings)
      const result = await account.createEmailPasswordSession(d.email, d.password);
      
      const session = {
        sessionid: result.$id,
        userid: result.userId,
      };

      localStorage.setItem("loginsession", JSON.stringify(session));
      dispatch(islogin(session));
      toast.success("Login successfully!");
      navigate(`/Deshboard`);
      
    } catch (e) {
      console.log("error while logging", e);
      toast.error(e.message || "Login failed");
    } finally {
      dispatch(isloading(false));
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0]  flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-10">
        {/* Heading */}
        <div className="text-center mb-8 ">
          <h2 className="text-3xl font-serif text-[#3e2c2c]">Welcome Back</h2>
          <p className="text-[#7a6c6c] text-sm mt-2">
            Login to continue your journey ✨
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm text-[#3e2c2c] mb-2">
              Email Address
            </label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email Is Required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter Vaild Email Eddress",
                },
              })}
              type="email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] ${
                errors.email
                  ? "border-2 text-red-600 border-red-600 focus:ring-2 focus:ring-red-600"
                  : ""
              }`}
            />
          </div>
          {errors.email && (
            <span className="block mt-1 text-center text-sm text-red-600 ">
              {errors.email.message}
            </span>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm text-[#3e2c2c] mb-2">
              Password
            </label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is Required",
                },
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?!.*\s).{8,32}$/,
                  message:
                    "requires specific criteria, such as a minimum length and the inclusion of various character types",
                },
              })}
              type="password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3  rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e8a0a8] ${
                errors.password
                  ? "border-2 border-red-600 text-red-600 focus:ring-2 focus:ring-red-600"
                  : ""
              }`}
            />
          </div>
          {errors.password && (
            <span className="block mt-1 text-center text-sm text-red-600 ">
              {errors.password.message}
            </span>
          )}

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <a className="text-[#e8a0a8] hover:underline">Forgot Password?</a>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="cursor-pointer w-full bg-[#e8a0a8] text-white py-3 rounded-full shadow-md hover:bg-[#d88c94] transition duration-300"
          >
            {loading ? "Loging......" : "login"}
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-center text-sm text-[#7a6c6c] mt-6">
          Don’t have an account?{" "}
          <Link
            to={"/Signup"}
            className="text-[#e8a0a8] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
