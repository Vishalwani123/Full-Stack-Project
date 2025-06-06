// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/authService';

// function LoginPage() {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(credentials);
//       navigate('/');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="email" placeholder="Email" className="form-control mb-2"
//           onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
//         <input type="password" placeholder="Password" className="form-control mb-2"
//           onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
//         <button className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;

import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Style/Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(formData);
            localStorage.setItem('token', data.jwt);
            toast.success(`Login Successfull`, {autoClose: 800, hideProgressBar: true});
            setTimeout(() => navigate('/'), 300);
        } catch (err) {
            toast.error('Invalid username or password', {autoClose: 800, hideProgressBar: true});
        }
    };

    

    return (
        
        <div className="container">
            <div className="form-container">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input 
                        type="text"
                        name="username"
                        placeholder="Type your username"
                        value={formData.username}
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

                <Link className="signup-text" to="/register">
                  Or Sign Up Using
                </Link>
                
            </div>
        </div>
    );       
};

export default LoginPage;
