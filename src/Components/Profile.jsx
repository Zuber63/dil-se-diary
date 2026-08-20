import { Link, useOutletContext } from "react-router";

const Profile = () => {
const {data,postdata} = useOutletContext()
const draft =postdata.filter((d)=>d.status=="draft")
const publish =postdata.filter((d)=>d.status=="publish")
  return (
    <div className="min-h-screen flex-1 bg-[#fdf6f0] ">

      {/* Cover Banner */}
      <div className=" h-72">

        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Profile Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8">

          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">

            {/* Profile Image */}
            <div>

              <img
                src={data?.image? data.image:`https://api.dicebear.com/9.x/initials/svg?seed=${data.fullname}`}
                className="w-36 h-36 rounded-full border-4 border-white object-cover"
              />

              

            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">

              <h2 className="text-3xl font-bold text-gray-800">
        {data.fullname}
              </h2>

              <p className="text-gray-500 mt-1">
{data.bio}
              </p>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-10 mt-4">

                <div>
                  <p className="text-xl font-bold">{postdata.length}</p>
                  <p className="text-gray-400 text-sm">Total Post</p>
                </div>

                <div>
                  <p className="text-xl font-bold">{draft.length}</p>
                  <p className="text-gray-400 text-sm">Draft</p>
                </div>

                <div>
                  <p className="text-xl font-bold">{publish.length}</p>
                  <p className="text-gray-400 text-sm">Publish</p>
                </div>

              </div>

            </div>

        <Link to={'/deshboard/EditProfile'}>    <button className="px-6 cursor-pointer py-2 bg-[#e8a0a8] text-white rounded-xl hover:bg-[#d88c94] transition">
              Edit Profile
            </button></Link>

          </div>

        </div>

      
     
      </div>

    </div>
  );
};

export default Profile;