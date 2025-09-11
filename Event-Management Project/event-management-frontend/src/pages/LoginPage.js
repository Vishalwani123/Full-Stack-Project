import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import '../Style/Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('userName', data.userName);
            localStorage.setItem('userId', data.userId);
            toast.success(`Login Successfull`, {autoClose: 800, hideProgressBar: true});
            setTimeout(() => navigate('/'), 300);
        } catch (err) {
            toast.error('Invalid username or password', {autoClose: 800, hideProgressBar: true});
        }
    };

    

    return (
        <div className="customContainer">
            <div className="customLoginForm-container">
                <h2 className="customHeading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="customInput-group">
                        <label htmlFor="username" className="customInput-label">Email</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Type your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="customInput-field"
                        autoComplete="off"
                        />
                    </div>
                    <div className="customInput-group">
                        <label htmlFor="password" className="customInput-label">Password</label>
                            <div className="customPassword-wrapper">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    placeholder="Type your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="customInput-field"
                                    autoComplete="new-password"
                                />

                                <span className="toggle-eye" onClick={() => setIsShow(!isShow)}>
                                {isShow ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </span>
                            </div>
                    </div>

                    <div className="customForgot-password">Forgot password?</div>
                    <button type="submit" className="submit-button">LOGIN</button>
                </form>

                <Link className="signup-text" to="/register">
                  or SignUp
                </Link>
                
            </div>
        </div>
    );       
};

export default LoginPage;