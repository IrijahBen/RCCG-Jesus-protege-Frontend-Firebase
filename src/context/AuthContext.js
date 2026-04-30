import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setUserId(currentUser.uid);
            } else {
                // If no user, sign in anonymously for basic visitor access
                try {
                    const anonUser = await signInAnonymously(auth);
                    setUser(anonUser.user);
                    setUserId(anonUser.user.uid);
                } catch (error) {
                    console.error("Anonymous sign-in failed:", error);
                    setUser(null);
                    setUserId(null);
                }
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // --- NEW: Add Admin Login & Logout Functions ---
    const loginAdmin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutAdmin = () => {
        return signOut(auth);
    };

    const value = {
        user,
        userId,
        isLoggedIn: user && !user.isAnonymous, // True ONLY if logged in with email/password
        loginAdmin,   // Export the login function
        logoutAdmin,  // Export the logout function
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}