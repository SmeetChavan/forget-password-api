import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

import Cookies from 'js-cookie';

const Login = () => {

  const navigate = useNavigate();

  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleLogin = async() => {

    try {

      toast.loading("Logging in");;

      const response = await axios.post("http://localhost:4000/login" , {
        email,
        password
      });

      toast.dismiss();
      toast.success(response.data.message);

      const token = response.data.token;

      Cookies.set("token" , token , {expires: Date.now() + 5*60*1000});

      navigate("/logged");

    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }

  }

  return (

    <div className='flex flex-col justify-center px-10 py-6'>

        <h2 className='text-center font-extrabold text-3xl text-slate-200 italic'>Login User</h2>

        <div className='flex flex-1 flex-col gap-10 justify-around pt-10 pb-10'>

            <div className='flex flex-col gap-1'>
                <label htmlFor="e" className='text-slate-300 font-bold'>Email</label>
                <input type="email" placeholder='Enter email' id='e' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="p" className=' text-slate-300 font-bold'>Password</label>
                <input type="password" placeholder='Enter password' id='p' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>

        <div className='flex justify-between items-center max-lg:flex-col'>
            <button className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl' onClick={handleLogin}>
                Login
            </button>

            <Link to={"/forget"} className='text-blue-200'>Forget password?</Link>
        </div>

    </div>
  )
}

export default Login