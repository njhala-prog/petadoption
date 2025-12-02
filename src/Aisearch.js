import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseconfig';

export const Aisearch = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        console.log("Search Params:", Object.fromEntries(searchParams));

        const fetchPets = async () => {
            setLoading(true);
            try {
                const petsCollection = collection(db, 'pets');
                const filters = [];

               
                if (searchParams.get('type')) {
                    const typeValue = searchParams.get('type');
                    console.log("Filtering by type:", typeValue);
                    filters.push(where('type', '==', typeValue));
                }
                if (searchParams.get('size')) {
                    const sizeValue = searchParams.get('size');
                    console.log("Filtering by size:", sizeValue);
                    filters.push(where('size', '==', sizeValue));
                }
                if (searchParams.get('energy')) {
                    const energyValue = searchParams.get('energy');
                    console.log("Filtering by energy:", energyValue);
                    filters.push(where('energy', '==', energyValue));
                }

                let petsQuery;
                if (filters.length > 0) {
                    petsQuery = query(petsCollection, ...filters);
                } else {
                    petsQuery = petsCollection;
                }

                console.log("Final Query:", petsQuery);
                const querySnapshot = await getDocs(petsQuery);
                const petList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                console.log("Fetched Pets:", petList);
                setPets(petList);
            } catch (error) {
                console.error('Error fetching pets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, [location.search]);

    if (loading) return <div>Loading pets...</div>;

    return (
        <div className="mx-auto p-8 bg-white shadow-lg rounded-lg mt-20 flex justify-between items-center flex-wrap">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Recommended Pets</h2>
            {pets.length === 0 ? (
                <div className="text-center">No pets found matching your criteria. Try adjusting your search.</div>
            ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                    {pets.map(pet => (
                        <div key={pet.id} className="p-6 border border-gray-300 rounded-md w-80">
                            <h3 className="text-xl font-semibold">{pet.name}</h3>
                            <div className="h-48 overflow-hidden rounded-md mb-4">
                                <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                            </div>
                            <p>Type: {pet.type}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Size: {pet.size}</p>
                            <p>Energy: {pet.energy}</p>
                            <p>Good with: {pet.goodWith ? pet.goodWith.join(', ') : 'N/A'}</p>
                            <p>Care: {pet.care}</p>
                            <p>Temperament: {Array.isArray(pet.temperament) ? pet.temperament.join(', ') : pet.temperament}</p>
                            <p>Special Needs: {Array.isArray(pet.specialNeeds) ? pet.specialNeeds.join(', ') : pet.specialNeeds || 'None'}</p>
                            <p>Location: {`${pet.location.city}, ${pet.location.state}`}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
