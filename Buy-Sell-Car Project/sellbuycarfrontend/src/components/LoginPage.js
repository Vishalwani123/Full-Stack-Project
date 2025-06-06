import React, { useState } from 'react';
import { loginUser } from '../service/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("The FormData is --------"+formData);
            const data = await loginUser(formData);
            localStorage.setItem('token', data.jwt);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userName', data.username);
            toast.success(`Login Successfull`, {autoClose: 800, hideProgressBar: true});
            setTimeout(() => navigate('/dashboard'), 300);
        } catch (err) {
            toast.error('Invalid username or password', {autoClose: 800, hideProgressBar: true});
        }
    };

    

    return (
        
        <div className="login-container">
            <div className="login-form-container">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Email</label>
                        <input 
                        type="text"
                        name="email"
                        placeholder="Type your username"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input 
                        type="password"
                        name="password"
                        placeholder="Type your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="forgot-password">Forgot password?</div>
                    <button type="submit" className="submit-button">LOGIN</button>
                </form>
                <span>Or</span>
                <Link className="signup-text" to="/register">
                    Sign Up
                </Link>
                
            </div>
        </div>
    );       
};

export default LoginPage;
