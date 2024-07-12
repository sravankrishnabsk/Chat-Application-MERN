import { useState } from "react";
// import classes from "../css/pages.module.css";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../cloudinary/cloudinary_config";
import axios from "axios";
import toast from "react-hot-toast";

function RegisterPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [photoUpload, setPhotoUpload] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const uploadPhoto = await uploadFile(file);
      setPhotoUpload(file);

      setData((prev) => {
        return {
          ...prev,
          profile_pic: uploadPhoto?.url || "",
        };
      });
    }
  };

  const handleClickEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setPhotoUpload(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/register",
        data
      );
      console.log("Response: ", response);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate('/email');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    console.log("data: ", data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <h3>Welcome to Chat Application!</h3>
        <form action="" method="post" className="grid gap-4 mt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name :</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your Name"
              className="bg-slate-100 px-2 py-1 rounded focus:outline-[#0093fb]"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="bg-slate-100 px-2 border py-1 rounded focus:outline-[#0093fb]"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your Password"
              className="bg-slate-100 px-2 py-1 rounded focus:outline-[#0093fb]"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              Profile Photo :
              <div className="h-14 bg-slate-200 rounded border flex justify-center items-center cursor-pointer hover:bg-sky-100 hover:border-[#0093fb]">
                <p className="text-sm max-w-[300] text-ellipsis line-clamp-1">
                  {photoUpload?.name
                    ? photoUpload?.name
                    : "Upload Profile Photo"}
                </p>
                {photoUpload?.name && (
                  <button
                    className="text-xl ml-2 hover:text-red-500"
                    onClick={handleClickEvent}
                    onSubmit={handleSubmit}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 font-semibold bg-sky-400 text-lg px-3 py-2 rounded hover:bg-sky-500 hover:text-white"
          >
            Register
          </button>
        </form>
        <p className="mt-1">
          Already have an account? {"   "}
          <Link
            to={"/email"}
            className="text-teal-500 font-semibold hover:text-blue-500"
          >
             Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
