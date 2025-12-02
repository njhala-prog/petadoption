import React, { useState, useEffect } from 'react';
import { PetCard } from "../../components/Elements/PetCard";
import { collection, getDocs, query as firebaseQuery, where, or } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useLocation } from 'react-router-dom';

export const SearchList = () => {
    const [pets, setPets] = useState([]);
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        async function search() {
            let q = collection(db, "pets");

            if (searchQuery) {
                q = firebaseQuery(q, 
                    or(
                        where("name", "==", searchQuery),
                        where("breed", "==", searchQuery),
                        where("type", "==", searchQuery),
                        where("age", "==", searchQuery)
                    )
                );
            }

            const petsSnapshot = await getDocs(q);
            setPets(petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }

        search();
    }, [searchQuery]);

    return (
        <main>
            <section className="my-4">
                <div className="my-5 flex justify-between items-center">
                    <span className="text-2xl font-semibold text-black">
                        Search Results: {pets.length} pets found
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pets.map((pet) => (
                        <PetCard key={pet.id} pet={pet} />
                    ))}
                </div>

                {pets.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">
                        No pets found matching your search. Try a different search term.
                    </p>
                )}
            </section>
        </main>
    );
};

// Suggestion for search placeholder
