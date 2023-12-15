import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

const NewPassword = () => {

  const [password , setPassword] = useState("");
  const [confirm , setConfirm] = useState("");

  const navigate = useNavigate();

  const handleChange = async () => {

    if(password == ""){
      return toast.error("Password is empty");
    }

    if(password.length < 7){
      return toast.error("Minimum password length should be 7");
    }

    if(password != confirm){
      return toast.error("Password do not match");
    }

    const resetToken = Cookies.get("resetToken");

    try {

      toast.loading("Changing..");
      const response = await axios.post(`http://localhost:4000/reset-password/${resetToken}` , {
        password
      });

      toast.dismiss();
      toast.success(response.data.message);

      navigate("/login");

    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='flex flex-col justify-center px-10 py-6'>

        <h2 className='text-center font-extrabold text-3xl text-slate-200 italic'>Reset Password</h2>

        <div className='flex flex-1 flex-col gap-10 justify-around pt-10 pb-10'>

            <div className='flex flex-col gap-1'>
                <label htmlFor="e" className='text-slate-300 font-bold'>Password:</label>
                <input type="password" placeholder='Enter password' id='e' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="p" className=' text-slate-300 font-bold'>Confirm Password:</label>
                <input type="password" placeholder='Confirm password' id='p' className='input' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
        </div>

        <div className='flex justify-center items-center'>
            <button className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl' onClick={handleChange}>
                Change
            </button>
        </div>

    </div>
  )
}

export default NewPassword