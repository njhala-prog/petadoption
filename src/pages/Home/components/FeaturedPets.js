import React from 'react';
import { Link } from "react-router-dom";

export const FeaturedPets = () => {


    return (
        <div className="featured-pets bg-gradient-to-r from-purple-100 to-blue-100 py-16">
            <h1 className="text-center mb-12 text-4xl font-bold text-gray-800 md:text-5xl">
                Checkout  some Prerequsites
            </h1>
            <div className="flex flex-wrap justify-center max-w-6xl mx-auto px-4">

                <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <img className="w-full h-64 object-cover" src="https://plus.unsplash.com/premium_photo-1684330691489-2eb2620db612?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="naman" />
                        <div className="p-6">
                            <h5 className="mb-2 text-2xl font-bold text-gray-800">CheckList For New Adopters</h5>
                            <p className="mb-4 text-gray-600">Make Sure to Check all the necessary things  Required for Adoption</p>
                            <Link
                                to={"/Checklist"}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition-colors duration-300"
                            >
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <img className="w-full h-64 object-cover" src="https://plus.unsplash.com/premium_photo-1667509263640-322c7cf51691?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="naman" />
                        <div className="p-6">
                            <h5 className="mb-2 text-2xl font-bold text-gray-800">Covid-19  Resources </h5>
                            <p className="mb-4 text-gray-600">Learn how shelters/rescue groups are adapting. Find out how you can help dogs and cats.</p>
                            <Link
                                to={"/Covid"}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition-colors duration-300"
                            >
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <img className="w-full h-64 object-cover" src="https://plus.unsplash.com/premium_photo-1681147548070-e57a020d01a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="naman" />
                        <div className="p-6">
                            <h5 className="mb-2 text-2xl font-bold text-gray-800">Exclusive Articles </h5>
                            <p className="mb-4 text-gray-600">People residing in a long-term care facility, such as a hospice or nursing home.</p>
                            <Link
                                to={"/Articles"}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-purple-300 transition-colors duration-300"
                            >
                                Learn More
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};