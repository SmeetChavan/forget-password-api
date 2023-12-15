import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const LoggedIn = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            await axios.get("http://localhost:4000/logout");
            toast.success("Logged out");

            Cookies.remove('token', { path: '/', domain: 'localhost' });

            navigate("/login");

        } catch (error) {
            toast.error(error);
        }
    }

    useEffect(() => {
    
        const checkToken = () => {

            const token = Cookies.get("token");

            if(!token){
                toast.error("Log in error");
                navigate("/login");
            }
        }

        checkToken();
    }, [])

  return (
    <div>
        <button className='bg-red-500 inline-block w-full rounded-xl' onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LoggedIn