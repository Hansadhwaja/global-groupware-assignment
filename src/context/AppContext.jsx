import { createContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin')?localStorage.getItem('isLogin'):false);
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):null);

    const login = (token) => {
        setIsLogin(true);
        setToken(token);
        localStorage.setItem('isLogin',true);
        localStorage.setItem('token',token);
    }

    const logout = () => {
        setIsLogin(false);
        setToken(null);
        localStorage.removeItem('isLogin');
        localStorage.removeItem('token');
    }

    const handleSuccess = (title) => {
        toast.success(title);
      };
    
    
      const handleError = (title) => {
        toast.error(title);
      };

    const value = {
        isLogin,
        token,
        login,
        logout,
        handleSuccess,
        handleError
    };
    return <AuthContext.Provider value={value}  {...props} />
}

export { AuthProvider, AuthContext };