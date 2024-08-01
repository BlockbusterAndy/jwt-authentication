import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Secret = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/secret",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <section className='flex flex-col justify-center items-center bg-slate-900 h-[100vh] gap-4'>
      <ToastContainer />
      <h1 className='text-7xl font-semibold text-center text-white'>Secret Page</h1>
      <button className=' w-[10vw] bg-slate-200 rounded-md text-xl py-2 px-4' onClick={()=>{logOut()}}>Log out</button>
    </section>
  )
}

export default Secret