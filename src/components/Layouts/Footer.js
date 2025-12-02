import React from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="PetAdopt Logo"className="h-10 rounded-full shadow-md" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">PetAdopt</span>
            </Link>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <ul className="flex flex-wrap justify-center space-x-4">
              <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-300">About</Link></li>
              <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Licensing</Link></li>
              <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 text-center md:text-right">
            <p>&copy; 2024 PetAdopt™. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}