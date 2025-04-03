import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <div className="text-lg font-semibold">
                Welcome, {user ? user.email : 'Guest'}
            </div>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </header>
    );
};

export default Header;