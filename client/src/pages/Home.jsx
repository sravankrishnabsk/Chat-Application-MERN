import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/userSlice";

function Home() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()



  console.log("REDUX USER: ",user);

  const getUserDetails = async() => {
    try {
      const URL = import.meta.env.VITE_BACKEND_URL+"/api/user-details";
      const response = await axios({
        url: URL,
        withCredentials: true
      })
      dispatch(setUser(response.data.data));

      if(response.data.logout) {
        navigate('/email');
        dispatch(logout())
      }

      console.log('Current User Details: ',response);
    } catch (error) {
      console.log("Error: ",error.message || error);
    }
  }

  useEffect(()=>{
    getUserDetails()
  },[]);
  
  return (
    <div>
      Home
      <section>
        <Outlet />
      </section>
    </div>
  );
}

export default Home;
