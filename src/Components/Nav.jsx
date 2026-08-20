import { Link } from "react-router";
import { useSelector } from "react-redux";
const Nav = () => {
  const {session}=useSelector((state)=>state.blog)
  
    return(
      

    //   {/* Navbar */}
      <nav className="sticky bg-white top-0 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-[#3e2c2c]">
            Dil Se Diary
          </h1>

          <div className="space-x-6  md:flex">
            <Link to={'/'}  className="text-[#3e2c2c] hover:text-[#e8a0a8]">Home</Link>
           {session&& <Link to={'/Deshboard'}  className="text-[#3e2c2c] hover:text-[#e8a0a8]">Dashboard</Link>}
          {!session &&  <Link to={'/Login'} className="bg-[#e8a0a8] text-white px-4 py-2 rounded-full">
              Login
            </Link>}
          </div>
        </div>
      </nav>
    )
}



export default Nav;