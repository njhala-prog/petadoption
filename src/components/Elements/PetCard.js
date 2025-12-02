import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../Context/Contextpet';
import { useAuth } from "../../Context/AuthContext";

export const PetCard = ({ pet }) => {
  const { addToCart, petList, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const productInCart = petList.find(item => item.id === pet.id);
    setInCart(!!productInCart);
  }, [petList, pet.id]);

  const handleAddToCart = () => {
    if (user) {
      if (user.isAdmin) {
        alert('Admins cannot add pets to the cart.');
      } else {
        addToCart(pet);
      }
    } else {
      alert('You must be logged in to adopt a pet.');
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(pet.id);  
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <Link to={`${pet.id}`} className="relative block">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <img className="w-full h-64 object-cover" src={pet.imageUrl} alt={pet.name} />
        <div className="absolute bottom-4 left-4 text-white">
          <h5 className="text-2xl font-bold">{pet.name}</h5>
          <p className="text-sm">{pet.breed}</p>
        </div>
      </Link>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">{pet.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 text-xs">{pet.age}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500 text-xs">{pet.size}</span>
          </div>
          {!inCart ? (
            user ? (
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
              >
                Adopt Me
              </button>
            ) : (
              <button
                onClick={() => alert('You must be logged in to adopt a pet.')}
                className="px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors duration-300"
              >
                Login to Adopt
              </button>
            )
          ) : (
            <button
              onClick={handleRemoveFromCart}
              className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-colors duration-300"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};