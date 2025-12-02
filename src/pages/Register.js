import React, { useState } from 'react';
import { auth, db } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                name,
                email,
                isAdmin
            });
            navigate('/');
        } catch (error) {
            console.error("Error registering user:", error);
            // TODO: Add error handling UI
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="px-8 py-10">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Create an Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="John Doe"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="you@example.com"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="••••••••"
                                required
                                minLength="7"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isAdmin" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Register as Admin
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md transition duration-300"
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link to="/Login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};