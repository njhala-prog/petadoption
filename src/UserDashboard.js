import React, { useState, useEffect } from 'react';
import { db } from './firebaseconfig';
import { collection, where, getDocs, query } from 'firebase/firestore';
import { useAuth } from './Context/AuthContext';

export const UserDashboard = () => {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            if (user) {
                const q = query(collection(db, 'adoptionRequests'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);
                setApplications(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
        };
        fetchApplications();
    }, [user]);

    const formatDate = (timestamp) => {
        return timestamp.toDate().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-7">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">My Adoption Applications</h1>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {applications.map(app => (
                        <div key={app.id} className="bg-white overflow-hidden shadow-xl rounded-lg transition-all duration-300 hover:shadow-2xl">
                            <div className="relative h-64">
                                <img
                                    src={app.image || "/api/placeholder/400/320"}
                                    alt={`${app.petName} - ${app.petBreed}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h2 className="text-2xl font-bold text-white">{app.petName}</h2>
                                    <p className="text-sm text-gray-200">{app.petBreed}</p>
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <p className="font-semibold text-lg mb-3">
                                    Status: <span className={`inline-block px-2 py-1 rounded ${app.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                        app.status === 'approved' ? 'bg-green-200 text-green-800' :
                                            'bg-red-200 text-red-800'
                                        }`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                    </span>
                                </p>
                                <p className="text-gray-600 mb-2"><span className="font-medium">Applied:</span> {formatDate(app.createdAt)}</p>
                                <p className="text-gray-600 mb-2"><span className="font-medium">Updated:</span> {formatDate(app.updatedAt)}</p>
                                <p className="text-gray-700 mb-2"><span className="font-medium">Name:</span> {app.fullName}</p>
                                <p className="text-gray-700 mb-2"><span className="font-medium">Email:</span> {app.email}</p>
                                <p className="text-gray-700 mb-2"><span className="font-medium">Phone:</span> {app.phoneNumber}</p>
                            </div>
                            <div className="px-6 py-4 bg-gray-50">
                                <p className="text-gray-700 mb-2"><span className="font-medium">Address:</span></p>
                                <p className="text-gray-600">{app.address}</p>
                            </div>
                            <div className="px-6 py-4">
                                <p className="text-gray-700 mb-2"><span className="font-medium">Occupation:</span> {app.occupation}</p>
                                <p className="text-gray-700 mb-2"><span className="font-medium">Reason for Adoption:</span></p>
                                <p className="text-gray-600 italic">{app.reasonForAdoption}</p>
                                <p className="text-gray-700 mt-4 mb-2"><span className="font-medium">Experience with Pets:</span></p>
                                <p className="text-gray-600">{app.experienceWithPets}</p>
                            </div>
                            <div className="px-6 py-4 bg-gray-100 text-xs text-gray-500">
                                Application ID: {app.id}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};