import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {

    const [username , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirm , setConfirm] = useState("");

    const handleRegister = async() => {
    
        if(username == "" || email == "" || password == ""){
            return toast.error("Any field cannot be field");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return toast.error('Invalid email format');
        }

        if(password.length < 7){
            return toast.error("Minimum password length should be 7");
        }

        if(password != confirm){
            return toast.error("Passwords do not match");
        }

        try {

            toast.loading("Adding");
    
            const response = await axios.post("http://localhost:4000/add" , {
                username,
                email,
                password
            });
    
            toast.dismiss();
            toast.success(response.data.message);
            
        } catch (error) {

            toast.dismiss();
            toast.error(error.response.data.message);
        }
    }

  return (

    <div className='flex flex-col justify-center px-10 py-6'>

        <h2 className='text-center font-extrabold text-3xl text-slate-200 italic'>Add User</h2>

        <div className='flex flex-1 flex-col gap-10 justify-around pt-10 pb-20'>

            <div className='flex flex-col gap-1'>
                <label htmlFor="u" className='text-slate-300 font-bold'>Username:</label>
                <input type="text" placeholder='Enter username' id='u' className='input' value={username} onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="e" className='text-slate-300 font-bold'>Email</label>
                <input type="email" placeholder='Enter email' id='e' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="p" className=' text-slate-300 font-bold'>Password</label>
                <input type="password" placeholder='Enter password' id='p' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='flex flex-col gap-1'>
                <label htmlFor="cp" className=' text-slate-300 font-bold'>Confirm Password</label>
                <input type="password" placeholder='Confirm password' id='cp' className='input' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
        </div>

        <div className='text-center'>
            <button className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl' onClick={handleRegister}>
                Register
            </button>
        </div>

    </div>
  )
}

export default Register