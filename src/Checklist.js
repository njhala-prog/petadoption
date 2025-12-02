import React, { useState } from 'react';

export const Checklist = () => {
    const [checklist, setChecklist] = useState([
        { id: 1, text: 'Research different pet breeds and their needs', completed: false },
        { id: 2, text: 'Ensure your living space is pet-friendly', completed: false },
        { id: 3, text: 'Budget for initial and ongoing pet expenses', completed: false },
        { id: 4, text: 'Find a local veterinarian', completed: false },
        { id: 5, text: 'Purchase essential pet supplies', completed: false },
        { id: 6, text: 'Plan for pet care during work hours or vacations', completed: false },
        { id: 7, text: 'Research local pet laws and licensing requirements', completed: false },
        { id: 8, text: 'Prepare family members or roommates for the new pet', completed: false },
        { id: 9, text: 'Plan the first few days with your new pet', completed: false },
        { id: 10, text: 'Schedule a vet check-up for shortly after adoption', completed: false },
    ]);

    const toggleItem = (id) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Adopter's Checklist</h2>
            <ul>
                {checklist.map(item => (
                    <li key={item.id} className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleItem(item.id)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className={`ml-3 ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {item.text}
                        </span>
                    </li>
                ))}
            </ul>
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    {checklist.filter(item => item.completed).length} of {checklist.length} tasks completed
                </p>
            </div>
        </div>
    );
};

