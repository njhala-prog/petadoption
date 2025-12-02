import React from 'react';
import { Link } from "react-router-dom";

export const CartEmpty = () => {
    return (
        <section className="flex items-center justify-center min-h-[100vh] bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 ">
            <div className="text-center max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-300">
                <div className="mb-0">
                    <div className="text-9xl mb-4 text-purple-500 dark:text-purple-400 ">
                        <i className="bi bi-cart"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Your cart is empty!</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Looks like you haven't added any pets to your cart yet.</p>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Explore our adorable pets and find your new furry friend!</p>
                </div>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                >
                    Start Adopting <i className="ml-2 bi bi-heart-fill"></i>
                </Link>
            </div>
        </section>
    );
};
