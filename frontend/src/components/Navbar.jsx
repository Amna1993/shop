import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    localStorage.removeItem('user'); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white text-xl">Cars</h1>
      <div>
        {user ? (
          <>
            <span className="text-white mr-4">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
