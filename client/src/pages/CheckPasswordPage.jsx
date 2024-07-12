/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/userSlice";

import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

function CheckPasswordPage() {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const URL = import.meta.env.VITE_BACKEND_URL + "/api/password";

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id, // Ensure this is the correct userId
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);

        setData({
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      if (data.password.trim() === "") toast.error("Enter Password!!");
      else toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full shadow-md max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-5 flex justify-center items-center flex-col">
          <Avatar
            width={80}
            height={80}
            name={location?.state?.name}
            imageURL={location?.state?.profile_pic}
          />

          <h2 className="font-semibold text-lg mt-1">
            {location?.state?.name}
          </h2>
        </div>
        <h3 className="text-slate-600 font-semibold">
          Welcome to Chat Application!
        </h3>
        <form action="" method="post" className="grid gap-4 mt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password :</label>
            <input
              type={type}
              name="password"
              id="password"
              placeholder="Enter your Password"
              className="bg-slate-100 px-2 border shadow-md py-1 rounded focus:outline-[#0093fb]"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <span
              className="relative cursor-pointer hover:"
              onClick={handleToggle}
              style={{color: "#0093fb"}}
            >
              <Icon className="absolute mr-2 right-4 bottom-3" icon={icon} size={18} />
            </span>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-3 font-semibold bg-sky-400 text-lg px-3 py-2 rounded hover:bg-sky-500 hover:text-white"
          >
            Login
          </button>
        </form>
        <p className="mt-1">
          <Link
            to={"/forgot-password"}
            className="text-teal-500 font-semibold hover:text-blue-500"
          >
            Forgot Password ?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CheckPasswordPage;
