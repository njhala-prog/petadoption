import React, { useState } from 'react';
import { auth, db } from '../firebaseconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, 'users', user.uid));
            const userData = userDoc.data();

            if (userData && userData.isAdmin) {
                setError('Access denied. Admins must log in via the Admin Login page.');
                await auth.signOut();
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };





    const fillDummyCredentials = () => {
        setEmail('naman@example.com');
        setPassword('namanjhala');
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="px-8 py-10">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                        Welcome Back
                    </h2>
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md transition duration-300"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    <div className="mt-4 space-y-2">

                        <button
                            onClick={fillDummyCredentials}
                            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md transition duration-300"
                        >
                            Fill Dummy Credentials
                        </button>

                    </div>
                </div>
                <div className="px-8 py-6 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                    <Link
                        to="/Loginasadmin"
                        className="block w-full px-4 py-2 text-sm font-medium text-purple-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 rounded-md transition duration-300 text-center dark:bg-gray-800 dark:text-purple-400 dark:hover:bg-gray-700"
                    >
                        Log In As Admin
                    </Link>
                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/Register" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};