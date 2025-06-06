import api from './api';

const registerUser = async (userData) => {
    const response = await api.post('/api/auth/signup', userData);
    return response.data;
};

const loginUser = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    localStorage.setItem("user", JSON.stringify(credentials));
    return response.data;
};

export {registerUser, loginUser};