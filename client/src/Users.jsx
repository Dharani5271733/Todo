import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('user'));
        axios.get(`${import.meta.env.VITE_API_URL}/`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${id}`)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ background: "linear-gradient(135deg, #6fb1fc, #4364f7)" }}>
            <div className='w-75 bg-white rounded p-4 shadow'>
                <div className="d-flex justify-content-between mb-3">
                    <h2 className="text-primary">User Management</h2>
                    <div>
                        {isLoggedIn && (
                            <>
                                <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
                                <Link to="/create" className='btn btn-success'>Add +</Link>
                            </>
                        )}
                    </div>
                </div>

                {isLoggedIn ? (
                    <table className='table table-striped'>
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-warning btn-sm me-2'>Update</Link>
                                        <button className='btn btn-danger btn-sm' onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center mt-5">
                        <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Users;
