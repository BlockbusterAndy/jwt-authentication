import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import axios from 'axios'

const LoginPage = () => {
  
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
      console.log(form)
  }

  const generateError = (error) =>
    toast(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      type: 'error'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        {
          ...form,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/secret");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };


  return (
    <section className='flex justify-center items-center h-[100vh] bg-slate-800'>
      <ToastContainer />
      <div className='w-[70vh] p-4 bg-slate-300 rounded-md shadow-xl'>
          <h1 className='text-4xl mb-4 text-center font-semibold'>Login Account</h1>
          <form onSubmit={(e)=>handleSubmit(e)} className='p-4'>

              <div className='mb-4'>
                  <label htmlFor="email" className='block text-md font-medium text-gray-700'>Email</label>
                  <input type="email" placeholder='E-Mail' name='email' id='email' className=' p-2 form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={handleChange} />
              </div>

              <div className='mb-4'>
                  <label htmlFor="password" className='block text-md font-medium text-gray-700'>Password</label>
                  <input type="password" placeholder='Password' name='password' id='password' className=' p-2 form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={handleChange} />
              </div>

              <div className='flex justify-center items-center mb-4'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded' type='submit'>Submit</button>
              </div>

              <span className='font-semibold text-lg text-gray-900 '>Don't have an account ? <Link className='text-blue-500 hover:text-blue-700' to={'/register'}>Register.</Link> </span>

          </form>
      </div>
  </section>
  )
}

export default LoginPage