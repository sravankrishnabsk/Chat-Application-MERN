import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";

function CheckEmailPage() {
  const [data, setData] = useState({
    email: "",
  });

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/email",
        data
      );
      console.log("Response: ", response);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });
        navigate("/password",{
          state: response?.data?.data
        });
      }
    } catch (error) {
      if(data.email.trim() === "") toast.error("Enter Email!!");
      else
      toast.error(error?.response?.data?.message);
    }

    console.log("data: ", data);
  };

  return (
    <div className="mt-5">
      <div className="bg-white w-full shadow-md max-w-md mx:2 rounded overflow-hidden p-4 md:mx-auto">
        <div className="w-fit mx-auto mb-2">
          <PiUserCircle size={80}/>
        </div>
        <h3 className="text-slate-600 font-semibold">
          Welcome to Chat Application!
        </h3>
        <form action="" method="post" className="grid gap-4 mt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="bg-slate-100 px-2 border shadow-md py-1 rounded focus:outline-[#0093fb]"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-3 font-semibold bg-sky-400 text-lg px-3 py-2 rounded hover:bg-sky-500 hover:text-white"
          >
            Next
          </button>
        </form>
        <p className="mt-1">
          New User?{"  "}
          <Link
            to={"/register"}
            className="text-teal-500 font-semibold hover:text-blue-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CheckEmailPage;
