import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/register`, { name, email, password })

            .then(res => {
                alert("Registration successful");
                navigate('/login');
            })
            .catch(err => {
    console.error(err);
    alert(err.response?.data?.error || "Registration failed. Try again.");
});

    };

    return (
        <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
            <div className="w-50 bg-white p-3 rounded">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Name" className="form-control mb-2" onChange={(e) => setName(e.target.value)} required />
                    <input type="email" placeholder="Email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" className="form-control mb-2" onChange={(e) => setPassword(e.target.value)} required />
                    <button className="btn btn-primary w-100">Register</button>
                </form>
                <p className="mt-2">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
