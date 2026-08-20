import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/dilsediary";
import { Outlet, useNavigate, Link } from "react-router";
import { account } from "../Appwrite/config";
import toast from "react-hot-toast";
import { getuser, Getalluserpost } from "../Appwrite/service";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const Deshboard = () => {
  const location = useLocation();
  const [data, setdata] = useState("");
  const [postdata, setpostdata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { session } = useSelector((state) => state.blog);
  const logoutsession = async () => {
    await account.deleteSession({
      sessionId: session.sessionid,
    });
    dispatch(logout());
    navigate("/");
    toast.success("logout successfuly");
  };

  const getdata = async () => {
    const res = await getuser(session.userid);
    setdata(res.rows[0]);
    const Postdata = await Getalluserpost(session.userid);
    setpostdata(Postdata.rows);
    // console.log("postdata",postdata,"data",postdata)
    console.log("refresh");
  };
  useEffect(() => {
    getdata();
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen   bg-[#fdf6f0] block sm:flex ">
      <div className="sticky top-0">
        {/* Navbar */}
        <div className="sm:hidden  flex justify-between items-center p-4 bg-white shadow-md ">
          <h1 className="text-xl font-serif text-[#3e2c2c]  "> Dil Se Diary</h1>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="sm:hidden cursor-pointer text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Overlay (background blur) */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`p-6 
          fixed sm:static top-0 left-0 w-64 h-full bg-white shadow-lg
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        <h1 className="text-2xl  font-serif text-[#3e2c2c] mb-10">
          Dil Se Diary
        </h1>

        <nav className="space-y-4  text-[#3e2c2c]">
          <Link
            to={"/"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-[#e8a0a8]"
          >
            Home
          </Link>
          <Link
            to={"/Deshboard/"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-[#e8a0a8]"
          >
            Dashboard
          </Link>
          <Link
            to={"/Deshboard/Myposts"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-[#e8a0a8]"
          >
            My Posts
          </Link>
          <Link
            to={"/Deshboard/CreatePost"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-[#e8a0a8]"
          >
            Create Post
          </Link>
          <Link
            to={"/Deshboard/profile"}
            onClick={() => setIsOpen(false)}
            className="block hover:text-[#e8a0a8]"
          >
            Profile
          </Link>
          <button
            onClick={logoutsession}
            className="block cursor-pointer text-red-400 hover:underline"
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto ">
        <Outlet context={{ data, postdata, getdata }} />
      </div>
    </div>
  );
};

export default Deshboard;
