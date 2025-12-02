import React, { useState } from 'react';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig'
import { useNavigate } from 'react-router-dom';

export const Ai = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const placeholderText = "Tell us about your ideal pet, your lifestyle, and any specific requirements you have. For example:\n\n" +
    "• I'm looking for a playful, medium-sized dog that's good with kids and doesn't shed much.\n" +
    "• I want a calm, low-maintenance cat that's suitable for a small apartment.\n" +
    "• I need an energetic companion for my daily runs, preferably a large breed dog.\n" +
    "• I'm seeking a senior pet that's well-trained and good with other animals.";

    const examples = [
        {
            title: "Medium-Energy Dog",
            text: "I'm looking for a medium-sized dog with high energy levels. I live in a house with a small yard and can provide daily walks. The dog should be good with children and other pets. I prefer a breed that doesn't shed too much and is relatively easy to train."
        },
        {
            title: "Low-Energy Cat",
            text: "I need a calm, low-energy cat that's suitable for a small apartment. I work from home and want a quiet companion that's content with indoor living. The cat should be affectionate but not overly demanding. I'd prefer an adult cat that's already litter trained and doesn't require too much attention during work hours."
        },
        {
            title: "High-Energy Large Dog",
            text: "I'm an active person looking for a large, high-energy dog to be my exercise companion. I enjoy long runs and hikes, so the dog should have good stamina. I have a spacious house with a big fenced yard. The dog should be trainable and well-behaved on a leash. I'm open to breeds that need lots of exercise and mental stimulation."
        },
        {
            title: "Small, Low-Energy Senior Dog",
            text: "I'm retired and looking for a small, low-energy senior dog to keep me company. I have a quiet home and can provide a lot of attention and care. The dog should be calm and well-trained, enjoying cuddles and short walks but not requiring intense exercise. I'm open to dogs with special needs or medical conditions that need extra care."
        }
    ];

    const handleExampleClick = (exampleText) => {
        setInput(exampleText);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            console.log("Creating new chat session...");
            const docRef = await addDoc(collection(db, 'chatSessions'), {
                prompt: `Based on this description, suggest pet characteristics for adoption: ${input}. Provide the response in JSON format with the following structure:
{
  "type": "string (must be either 'dog' or 'cat')",
  "breed": "string (e.g., 'Labrador Retriever', 'Siamese', 'Mixed Breed')",
  "age": "string (must be one of: 'young', 'adult', 'senior')",
  "size": "string (must be one of: 'small', 'medium', 'large')",
  "energy": "string (must be one of: 'low', 'moderate', 'high')",
  "goodWith": ["string"] (array of strings, must include one or more of: ["kids", "otherPets", "adults", "seniors"]),
  "care": "string (must be one of: 'low', 'moderate', 'high')",
  "temperament": ["string"] (array of strings, e.g., ["playful", "affectionate", "calm", "independent", "loyal", "energetic", "gentle", "protective"]),
  "specialNeeds": ["string"] (array of strings, use ["none"] if no special needs, otherwise examples include ["medical care", "behavioral training", "dietary restrictions"]),
  "shedding": "string (must be one of: 'low', 'moderate', 'high')",
  "training": "string (must be one of: 'untrained', 'basic', 'well-trained')"
}

Ensure all fields are included and match the types and options specified. For arrays, provide at least one value but you may include multiple relevant values. Do not include any fields not listed above. Here are some example responses:

Example 1:
{
  "type": "dog",
  "breed": "Golden Retriever",
  "age": "young",
  "size": "large",
  "energy": "high",
  "goodWith": ["kids", "otherPets"],
  "care": "moderate",
  "temperament": ["playful", "affectionate", "friendly"],
  "specialNeeds": ["none"],
  "shedding": "high",
  "training": "basic"
}

Example 2:
{
  "type": "cat",
  "breed": "Siamese",
  "age": "adult",
  "size": "medium",
  "energy": "moderate",
  "goodWith": ["adults"],
  "care": "low",
  "temperament": ["independent", "vocal", "intelligent"],
  "specialNeeds": ["none"],
  "shedding": "low",
  "training": "basic"
}

Example 3:
{
  "type": "dog",
  "breed": "Chihuahua",
  "age": "senior",
  "size": "small",
  "energy": "low",
  "goodWith": ["adults", "seniors"],
  "care": "moderate",
  "temperament": ["loyal", "affectionate"],
  "specialNeeds": ["medical care"],
  "shedding": "low",
  "training": "well-trained"
}

Please provide a JSON response that accurately reflects the pet characteristics based on the given input, following the structure and examples provided above.`,
                response: '',
                created: new Date()
            });

            console.log("Chat session created, waiting for response...");
            const unsubscribe = onSnapshot(docRef, (doc) => {
                console.log("Received update:", doc.data());
                if (doc.exists() && doc.data().response) {
                    try {
                        const responseData = JSON.parse(doc.data().response);
                        console.log("Parsed response data:", responseData);

                        const searchParams = new URLSearchParams();
                        for (const [key, value] of Object.entries(responseData)) {
                            if (Array.isArray(value)) {
                                value.forEach(v => searchParams.append(key, v));
                            } else {
                                searchParams.append(key, value);
                            }
                        }

                        console.log("Navigating to search results...");
                        console.log("Search params:", searchParams.toString());
                        navigate(`/Aisearch?${searchParams.toString()}`);

                        unsubscribe();
                        setIsLoading(false);
                    } catch (parseError) {
                        console.error("Error parsing response:", parseError);
                        setError('Failed to parse AI response. Please try again.');
                        setIsLoading(false);
                    }
                }
            }, (error) => {
                console.error("Error in snapshot listener:", error);
                setError('Error listening for AI response. Please try again.');
                setIsLoading(false);
            });
        } catch (err) {
            console.error('AI recommendation error:', err);
            setError('Failed to get AI recommendations. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-10 bg-white shadow-lg rounded-lg mb-40 mt-40">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Find Your Perfect Pet</h2>
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Example Searches:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {examples.map((example, index) => (
                        <button
                            key={index}
                            onClick={() => handleExampleClick(example.text)}
                            className="text-left p-2 bg-blue-100 hover:bg-blue-200 rounded transition duration-200"
                        >
                            {example.title}
                        </button>
                    ))}
                </div>
            </div>



            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Describe your ideal pet</label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={ placeholderText}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 ease-in-out"
                >
                    {isLoading ? 'Searching...' : 'Find My Perfect Pet'}
                </button>
                {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
        </div>
    );
};