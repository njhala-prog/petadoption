import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseconfig";// Update this import to point to your new firebaseConfig.js file
import { PetCard } from "../../components/Elements/PetCard";
import { Loader2 } from "lucide-react";

const CACHE_KEY = 'dogsList';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export const DogsList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDogs() {
      setIsLoading(true);
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_EXPIRATION) {
            setPets(data);
            setIsLoading(false);
            return;
          }
        }

        const q = query(collection(db, "pets"), where("type", "==", "dog"));
        const petsSnapshot = await getDocs(q);
        const petsData = petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        setPets(petsData);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: petsData, timestamp: Date.now() }));
      } catch (error) {
        console.error("Error fetching dogs:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <main>
      <section className="mt-10">
        <div className="my-10 flex justify-between items-center">
          <span className="text-2xl font-semibold text-black my-20">
            All Dogs {pets.length}
          </span>
        </div>

        <div className="flex flex-wrap justify-center lg:flex-row gap-5">
          {pets.map((pet) => (
            <div className="flex flex-wrap justify-center lg:flex-row gap-4" key={pet.id}>
              <PetCard pet={pet} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};