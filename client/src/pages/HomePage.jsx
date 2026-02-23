import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import DashBoard from "./DashBoard";
import LandingPage from "./LandingPage";
import Loader from "../components/Loader";
import Lesson from "../pages/Lesson"

const HomePage = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();
    console.log({isAuthenticated, isLoading, error})
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#080814] to-[#1a0a1e]">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#080814] to-[#1a0a1e] text-white">
                <h1>Something went wrong</h1>
                <h2>{error.message}</h2>
            </div>
        );
    }

    return (
        isAuthenticated ? <DashBoard /> : <LandingPage />
    );
};

export default HomePage;