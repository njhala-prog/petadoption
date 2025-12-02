import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../Context/Contextpet';

export const Dropdownadmin = ({ setShowLogin }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const handleLogout = () => {
        logout();
        clearCart();
        setShowLogin(false);
        navigate("/");
    };

    return (
        <div className="absolute top-12 right-0 w-60 mt-2 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-2">
                <div className="px-5 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
                    <p className="text-sm">Signed in as</p>
                    <p className="text-lg font-semibold truncate">{user?.email || 'admin@example.com'}</p>
                </div>
                <div className="border-t border-gray-200"></div>
                <Link
                    to="/"
                    onClick={() => setShowLogin(false)}
                    className="block px-5 py-3 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >

                </Link>

                <Link
                    to="/Dashboard"
                    onClick={() => setShowLogin(false)}
                    className="block px-5 py-3 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                >
                    Manage Applications
                </Link>
                <div className="border-t border-gray-200"></div>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-b-lg"
                >
                    Log out
                </button>
            </div>
        </div>
    );
};
