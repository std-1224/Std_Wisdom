// pages/signin.js
'use client'
import React from "react";
import { useUserContext } from '@/context/UserContext';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {

    const { user, login, loading, error } = useUserContext();

    const handleGoogleSignIn = async () => {
        login();
    };

    return (
        <div className="flex items-center justify-center min-h-96 p-24">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Welcome Back!</h1>
                <p className="mb-6 text-gray-600">Please sign in to your account</p>
                <button
                    className={`flex items-center justify-center bg-gradient-to-r from-blue-300 to-cyan-300 text-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                >
                    <FcGoogle className="h-6 w-6 mr-2" />
                    <span className="text-lg font-medium">{loading ? 'Signing In...' : 'Log In with Google'}</span>
                </button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default SignIn;
