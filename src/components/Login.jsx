import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Login = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [formBody, setFormBody] = useState({
        email: '',
        password: '',
    });
    const { login,handleSuccess,handleError } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formBody),
            });
    
            if (response.ok) {
                const data = await response.json();
                login(data.token);
                handleSuccess('Login successful');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
                console.log('Login successful:', data);
            } else {
                handleError('Login Failed'); 
                setFormBody({ email: '', password: '' });
            }
        } catch (error) {
            handleError('Network error, please try again.'); 
            setFormBody({ email: '', password: '' }); 
            console.error('Login failed:', error);
        }
    };
    
    
    return (
        <div className='min-h-screen w-full flex justify-center'>
            <div className='w-[90%] sm:w-[80%] lg:w-1/2'>
                <div className='flex justify-center items-center flex-col gap-4'>
                    <h1 className='text-3xl font-semibold text-blue-400 mt-24'>Login Page</h1>
                    <form className='flex flex-col gap-2 shadow-xl p-4 w-full rounded-lg' onSubmit={handleSubmit}>
                        <label className='font-semibold'>Email</label>
                        <input
                            type='text'
                            value={formBody.email}
                            onChange={(e) => setFormBody(prev => ({ ...prev, email: e.target.value }))}
                            className='border rounded-md px-4 py-1'
                        />
                        <label className='font-semibold'>Password</label>
                        <input
                            type='password'
                            value={formBody.password}
                            onChange={(e) => setFormBody(prev => ({ ...prev, password: e.target.value }))}
                            className='border rounded-md px-4 py-1'
                        />
                        <button type='submit' className='bg-blue-400 hover:bg-blue-500 px-4 py-2 font-semibold text-white mt-3 rounded-lg'>Login</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login