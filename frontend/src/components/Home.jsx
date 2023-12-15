import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-between items-center max-lg:flex-col'>

        <div className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl cursor-pointer'>
            <button><Link to="/register">Register</Link></button>
        </div>

        <div>
            <button className='px-10 py-4 bg-slate-400 hover:bg-slate-600 text-white rounded-xl text-xl'><Link to="/login">Login</Link></button>
        </div>

    </div>
  )
}

export default Home