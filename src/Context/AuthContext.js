import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from '../firebaseconfig'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                const userData = userDoc.data();
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    isAdmin: userData?.isAdmin || false,
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);
    const logout = async () => {
        try {
            await signOut(auth);
            // You can add additional cleanup here if needed
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};