import React, { useState, useEffect, useCallback } from 'react';
import { useCart } from './Context/Contextpet';
import { db } from './firebaseconfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Questions = () => {
    const { petList, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        occupation: '',
        reasonForAdoption: '',
        experienceWithPets: '',
    });

    const checkExistingApplication = useCallback(async () => {
        if (petList.length === 0 || !user) return;

        const pet = petList[0];
        const q = query(
            collection(db, 'adoptionRequests'),
            where('userId', '==', user.uid),
            where('petId', '==', pet.id)
        );
        const querySnapshot = await getDocs(q);
        setIsSubmitted(!querySnapshot.empty);
    }, [petList, user]);

    useEffect(() => {
        if (petList.length === 0) {
            navigate('/pets');
            return;
        }

        checkExistingApplication();
    }, [checkExistingApplication, navigate, petList.length]);

    if (petList.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">No Pet Selected</h2>
                <p className="text-center text-gray-600">There are no pets in your adoption cart. Please select a pet to adopt.</p>
                <button
                    onClick={() => navigate('/pets')}
                    className="mt-4 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out font-semibold text-lg"
                >
                    Browse Pets
                </button>
            </div>
        );
    }

    const pet = petList[0];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitted || isSubmitting) {
            alert('Application has already been submitted or is currently being submitted.');
            return;
        }
        setIsSubmitting(true);
        try {
            if (!pet) {
                throw new Error('No pet selected for adoption');
            }
            const docRef = await addDoc(collection(db, 'adoptionRequests'), {
                ...formData,
                petId: pet.id,
                petName: pet.name,
                petBreed: pet.breed,
                userId: user.uid,
                image: pet.imageUrl,
                status: 'pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            console.log("Application submitted with ID: ", docRef.id);

            try {
                removeFromCart(pet.id);
            } catch (removeError) {
                console.error("Error removing pet from cart:", removeError);
                // Continue with the process even if removing from cart fails
            }

            setIsSubmitted(true);
            setFormData({
                fullName: '',
                email: '',
                phoneNumber: '',
                address: '',
                occupation: '',
                reasonForAdoption: '',
                experienceWithPets: '',
            });
            alert('Application submitted successfully!');
            navigate('/adoption-confirmation');
        } catch (error) {
            console.error("Error submitting application:", error);
            alert('Error submitting application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Application Already Submitted</h2>
                <p className="text-center text-gray-600">You have already submitted an application for {pet.name}. You cannot submit another application for this pet.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Adoption Application for {pet.name}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-24 resize-none"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                    <input
                        type="text"
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="reasonForAdoption" className="block text-sm font-medium text-gray-700 mb-1">Reason for Adoption</label>
                    <textarea
                        id="reasonForAdoption"
                        name="reasonForAdoption"
                        value={formData.reasonForAdoption}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="experienceWithPets" className="block text-sm font-medium text-gray-700 mb-1">Experience with Pets</label>
                    <textarea
                        id="experienceWithPets"
                        name="experienceWithPets"
                        value={formData.experienceWithPets}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out font-semibold text-lg"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};