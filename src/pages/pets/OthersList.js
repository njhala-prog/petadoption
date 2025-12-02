import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../firebaseconfig"; // Make sure this points to your updated firebaseConfig.js file
import { PetCard } from "../../components/Elements/PetCard";
import { Loader2 } from "lucide-react";

const CACHE_KEY = 'othersListPets';
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

export const OthersList = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOthers() {
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

        // Optimized query to fetch both birds and rabbits in a single query
        const q = query(collection(db, "pets"), where("type", "in", ["bird", "rabbit"]));
        const petsSnapshot = await getDocs(q);
        const petsData = petsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        setPets(petsData);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data: petsData, timestamp: Date.now() }));
      } catch (error) {
        console.error("Error fetching birds and rabbits:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOthers();
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
      <section className="mt-20">
        <div className="my-5 flex justify-between items-center">
          <span className="text-2xl font-semibold text-black my-20">
            Birds and Rabbits {pets.length}
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


// export const OthersList = () => {
//     const [Pets, setPets] = useState([]);

//     useEffect(() => {
//         async function Others() {
//             const q = query(collection(db, "pets"), where("type", "==", "bird"));
//             const q1 = query(collection(db, "pets"), where("type", "==", "rabbit"));
//             const pets = await getDocs(q);
//             const pets1 = await getDocs(q1);

//             const birdPets = pets.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//             const rabbitPets = pets1.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

//             setPets([...birdPets, ...rabbitPets]);
//         }
//         Others();
//     }, []);