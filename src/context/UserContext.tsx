'use client'
import React, { useState, useContext, useEffect, createContext } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, signInWithPopup, User } from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase'; // Adjust the path as necessary
import { doc, getDoc, setDoc } from "firebase/firestore";

interface IUser {
    uid: string;
    email: string;
    name: string;
    avatar: string;
    accessToken: string;
}

interface UserContextType {
    user: IUser | null;
    loading: boolean;
    error: string | null;
    success: string | null;
    login: () => void;
    logout: () => void;
}

interface IUserData {
    name: string;
    avatar: string;
    email: string;
    // Add any other fields your user document has
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: false,
    error: null,
    success: null,
    login: () => { },
    logout: () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();
    //authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
            if (user) {
                // Get user data from Firestore
                const userDocRef = doc(db, "users", user.uid); // Assuming 'users' is your collection name
                const userDoc = await getDoc(userDocRef);
                const accessToken = await user.getIdToken();
                console.log(accessToken);
                if (userDoc.exists()) {
                    const userData: IUserData = userDoc.data() as IUserData; // Assuming your user document has 'name', 'avatar', and 'email' fields
                    setUser({
                        accessToken: accessToken || "",
                        uid: user.uid,
                        name: userData.name || "",
                        avatar: userData.avatar || "",
                        email: userData.email || "",
                    }); // Set the additional user data
                    console.log("User===>", user)
                    console.log("User data from Firestore:", userDoc.data());
                } else {
                    const userData = {
                        uid: user?.uid,
                        name: user?.displayName,
                        email: user?.email,
                        avatar: user?.photoURL || "",
                    };

                    // Save user data to Firestore
                    await setDoc(userDocRef, userData);
                }
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const login = async () => {
        setLoading(true);
        setError("");
        try {
            await signInWithPopup(auth, googleProvider);
            setSuccess("Successfully signed in");
            router.back();
        } catch (err) {
            console.error("Error signing in:", err);
            setError("Failed to sign in. Please try again.");
        } finally{
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setSuccess('Successfully logged out!');
        } catch (error) {
            setError('Error signing out.');
            console.error('Error signing out:', error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                error,
                success,
                login,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    )

}

// Custom hook to use the UserContext
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};