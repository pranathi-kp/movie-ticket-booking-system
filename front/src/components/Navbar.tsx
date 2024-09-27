import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const NavBar: React.FC = () => {
  const { token, logout, isAdmin } = useAuth(); 
  const navigate = useNavigate();

  const onLogout=()=>{
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between border-b-2 border-white">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/movies" className="mr-4">Movies</Link>
        {isAdmin && <Link to="/admin" className="mr-4">Admin Dashboard</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={onLogout} className="bg-red-500 p-2 rounded">Logout</button>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup" className="mr-4">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
