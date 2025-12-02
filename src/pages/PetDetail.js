import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import { useCart } from '../Context';
import { useAuth } from '../Context/AuthContext';

const PetDetail = () => {
    const [pet, setPet] = useState(null);
    const { id } = useParams();
    const { addToCart, petList, removeFromCart } = useCart();
    const [inCart, setInCart] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        if (pet) {
            const productInCart = petList.find(item => item.id === pet.id);
            setInCart(!!productInCart);
        }
    }, [petList, pet]);

    useEffect(() => {
        async function fetchPetDetail() {
            try {
                const petDocRef = doc(db, "pets", id);
                const petDoc = await getDoc(petDocRef);
                if (petDoc.exists()) {
                    setPet({ id: petDoc.id, ...petDoc.data() });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching pet detail: ", error);
            }
        }
        if (id) {
            fetchPetDetail();
        }
    }, [id]);
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


    if (!pet) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-100 to-blue-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <main className="bg-gradient-to-r from-purple-100 to-blue-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-96 w-full object-cover md:w-96" src={pet.imageUrl} alt={pet.name} />
                    </div>
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">{pet.breed}</div>
                        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{pet.name}</h1>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500">{pet.description}</p>

                        <div className="mt-6 border-t border-gray-200 pt-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Age</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.age}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Size</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.size}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Energy Level</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.energy}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Shedding</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.shedding}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Training</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.training}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Care Requirements</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.care}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Good With</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.goodWith.join(', ')}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Temperament</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.temperament.join(', ')}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Special Needs</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{pet.specialNeeds.join(', ')}</dd>
                                </div>
                                <div className="sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{`${pet.location.city}, ${pet.location.state}, ${pet.location.country}`}</dd>
                                </div>
                            </dl>
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
        </main>
    );
}

export default PetDetail;
