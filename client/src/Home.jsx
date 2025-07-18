import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const isLoggedIn = !!localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/users'); // Redirect to Users page automatically
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="text-center">
        <h2 className="mb-4">Welcome to Todo Management</h2>
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/register" className="btn btn-secondary">Register</Link>
      </div>
    </div>
  );
}

export default Home;
