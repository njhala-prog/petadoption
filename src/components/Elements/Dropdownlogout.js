import React from 'react'
import { Link } from "react-router-dom"


export const Dropdownlogout = ({ setshowLogin }) => {
    return (
        <div className="absolute top-12 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Welcome, Guest</p>
                    <p className="text-xs text-gray-500">Please login or register</p>
                </div>
                <Link
                    to="/"
                    onClick={() => setshowLogin(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    <i className="bi bi-book mr-2"></i>All Pets
                </Link>
                <Link
                    to="/Login"
                    onClick={() => setshowLogin(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    <i className="bi bi-box-arrow-in-right mr-2"></i>Login
                </Link>
                <Link
                    to="/Register"
                    onClick={() => setshowLogin(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-colors duration-200"
                >
                    <i className="bi bi-person-plus mr-2"></i>Register
                </Link>
            </div>
        </div>
    )
}