import React, { useContext } from 'react'
import { AuthContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const { isLogin, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className='flex justify-between p-4 shadow-xl mt-5'>
            <h1 className='text-3xl font-extrabold text-blue-500'>LOGO</h1>
            {isLogin ? (
                <button className='bg-black/90 hover:bg-black/75 text-white rounded-md font-semibold px-4 py-2' onClick={() => { logout(); navigate('/login') }}>Logout</button>
            ) : (
                <Link to={'/login'} className='bg-black/90 hover:bg-black/75 text-white rounded-md font-semibold px-4 py-2'>Login</Link>
            )}


        </div>
    )
}

export default Navbar