import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useCart } from "../../Context/Contextpet"

export const DropdownLogin = ({ setshowLogin }) => {
    const { user, logout } = useAuth();
    const { clearCart, petList } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        console.log(petList)
        clearCart();
        setshowLogin(false);
        navigate("/");
    }

    return (
        <div className="absolute top-12 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <div className="px-4 py-3">
                    <p className="text-sm">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email || 'naman@example.com'}</p>
                </div>
                <div className="border-t border-gray-100"></div>
                <Link
                    to="/"
                    onClick={() => setshowLogin(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    All Pets
                </Link>
                <Link
                    to="/Dashboard"
                    onClick={() => setshowLogin(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    MyApplications
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    Log out
                </button>
            </div>
        </div>
    )
}