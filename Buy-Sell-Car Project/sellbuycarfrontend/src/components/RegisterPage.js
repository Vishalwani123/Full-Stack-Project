import React, { useState } from 'react';
import { registerUser } from '../service/authService';
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '', role: ''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await registerUser(formData);
            toast.success(`Registration successful! You can now login.`, {autoClose: 800,hideProgressBar: true});
            setTimeout(() => navigate('/login'), 300);
        } catch (err) {
            toast.error(`Registration failed.`, {autoClose: 800, hideProgressBar: true});
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
        <div className="register-container">
            <div className="register-form-container">
                <h2 className="heading">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input 
                        type="text"
                        name="name"
                        placeholder="Type your username"
                        value={formData.name}
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
                    <div className="input-group">
                        <label htmlFor="password" className="input-label">Confirm Password</label>
                        <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Type your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Type your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    {/* <div className="input-group" > 
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Role</option>
                            <option value="USER">User </option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div> */}
                    <button type="submit" className="submit-button">Register</button>
                    {error && <p style={{color:'red'}}>{error}</p>}
                    {success && <p style={{color:'green'}}>{success}</p>}
                </form>
                <span> Already User ! </span>
                <Link className="login-text" to="/login">
                   Login Now 
                </Link>
            </div>
        </div>
    );       
};

export default RegisterPage;