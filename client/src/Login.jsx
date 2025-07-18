

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password })
            .then(res => {
                alert(res.data.message);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/users');
            })
            .catch(err => {
                console.error(err);
                alert(err.response?.data?.error || "Login failed");
            });
    };

    return (
        <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
            <div className="w-50 bg-white p-3 rounded">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" className="form-control mb-2" onChange={e => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="form-control mb-2" onChange={e => setPassword(e.target.value)} required />
                    <button className="btn btn-success w-100">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
