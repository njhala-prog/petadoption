import React, { useState, useEffect, useRef } from 'react'
import logo from "../../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { Search } from '../Sections/Search'
import { useCart } from '../../Context'
import { DropdownLogin } from '../Elements/DropdownLogin'
import { Dropdownlogout } from '../Elements/Dropdownlogout'
import { useAuth } from '../../Context/AuthContext'
import { Dropdownadmin } from '../Elements/Dropdownadmin'

export const Header = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const { petList } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogin(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          !event.target.closest('button[onClick*="handleSearchClick"]')) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const canAccessCart = user && !user.isAdmin;

  const handleCartClick = (e) => {
    e.preventDefault();
    if (canAccessCart) {
      navigate('/Cart');
    } else {
      navigate('/Login');
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 fixed w-full z-20 top-0 start-0 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8 sm:h-10 rounded-full shadow-md" alt="PetAdopt Logo" />
          <span className="self-center text-xl sm:text-2xl font-bold text-white">PetAdopt</span>
        </Link>
        
        <div className="flex items-center md:order-2">
          <button onClick={handleSearchClick} className="text-white hover:text-yellow-300 transition-colors duration-300 p-2">
            <i className="bi bi-search text-xl sm:text-2xl"></i>
          </button>
          <Link to={"/Cart"}
            onClick={handleCartClick}
            className="text-white hover:text-yellow-300 transition-colors duration-300 p-2"
          >
            <span className="text-xl sm:text-2xl bi bi-cart-fill relative">
              {petList.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                  {petList.length}
                </span>
              )}
            </span>
          </Link>
          <button onClick={() => setShowLogin(!showLogin)} className="text-white hover:text-yellow-300 transition-colors duration-300 p-2">
            <i className="bi bi-person-circle text-xl sm:text-2xl"></i>
          </button>
          <Link to={"/Ai"} className="text-white hover:text-yellow-300 transition-colors duration-300 p-2">
            <i className="bi bi-google-play text-xl sm:text-2xl"></i>
          </Link>
          <button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-white md:hidden hover:text-yellow-300 focus:outline-none">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-sticky">
          <ul className="flex flex-col p-4 mt-4 font-medium rounded-lg bg-blue-500 md:bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {['Explore', 'Doggs/puppies', 'Cats/kittens', 'Others', 'Dashboard'].map((item, index) => (
              <li key={index}>
                <Link
                  to={item === 'Doggs/puppies' ? '/Doggs/puppies' : `/${item.toLowerCase()}`}
                  className="block py-2 px-3 text-white rounded hover:bg-white hover:text-purple-600 md:hover:bg-transparent md:hover:text-yellow-300 transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showLogin && (
        <div ref={dropdownRef} className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
          {user ? (
            user.isAdmin ? (
              <Dropdownadmin setShowLogin={setShowLogin} />
            ) : (
              <DropdownLogin setshowLogin={setShowLogin} />
            )
          ) : (
            <Dropdownlogout setshowLogin={setShowLogin} />
          )}
        </div>
      )}
      {show && <div ref={searchRef}><Search setshow={setShow} /></div>}
    </nav>
  )
}