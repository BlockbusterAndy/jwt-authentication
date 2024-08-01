import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import axios from 'axios'


const Register = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          const data = await axios.post("http://localhost:3000/register", {
            ...form,
            withCredentials: true
          })
            console.log(data)
            if(data.status === 201){
                toast(`User Created Succesfully, Redirecting in .. 5`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: 'success'
                });
                setTimeout(() => {
                  navigate('/login')
                }, 5000);
            }
            if(data.status === 400){
                toast('User already exists', {
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
            }
        }
        catch(err){
            if(err.response.status === 400){
                toast('User already exists', {
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
            }
        }
    }

  return (
    <section className='flex justify-center items-center h-[100vh] bg-slate-800'>
        <ToastContainer />
        <div className='w-[70vh] p-4 bg-slate-300 rounded-md shadow-xl'>
            <h1 className='text-4xl mb-4 text-center font-semibold'>Register Account</h1>
            <form onSubmit={(e)=>handleSubmit(e)} className='p-4'>
                <div className='mb-4'>
                    <label htmlFor="name" className='block text-md font-medium text-gray-700'>Name</label>
                    <input type="text" placeholder='Name' name='name' id='name' className=' p-2 form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50' onChange={handleChange} />
                </div>

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
                <span className='font-semibold text-lg text-gray-900 '>Already have an account ? <Link className='text-blue-500 hover:text-blue-700' to={'/login'}>Login.</Link> </span>
            </form>
        </div>

    </section>
  )
}

export default Register