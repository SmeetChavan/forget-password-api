import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react'
import Cookies from 'js-cookie'

const ForgetPassword = () => {

  const [email , setEmail] = useState("");

  const handleMail = async () => {

    if(email == ""){
      return toast.error("Empty field");
    }

    try {

      toast.loading("Sending..");
      const response = await axios.post("http://localhost:4000/forget" , {
        email
      });

      toast.dismiss();
      toast.success(response.data.message);

      const resetToken = response.data.resetToken;

      Cookies.set("resetToken" , resetToken , {expires: Date.now() + 5*60*1000});

    } catch (error) {
      toast.dismiss();
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='flex flex-col justify-center px-10 py-6'>

      <h2 className='text-center font-extrabold text-3xl text-slate-200 italic'>Forget Password</h2>

      <div className='flex flex-1 flex-col gap-10 justify-around pt-10 pb-10'>

          <div className='flex flex-col gap-1'>
              <label htmlFor="e" className='text-slate-300 font-bold'>Email</label>
              <input type="email" placeholder='Enter email' id='e' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
      </div>

      <div className='flex justify-center items-center'>
          <button className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl' onClick={handleMail}>
              Send Mail
          </button>
      </div>

    </div>
  )
}

export default ForgetPassword