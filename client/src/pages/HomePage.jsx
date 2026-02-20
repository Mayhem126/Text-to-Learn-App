import React from "react";
import { useAuth0 } from '@auth0/auth0-react';
import DashBoard from "./DashBoard";
import LandingPage from "./LandingPage";

const HomePage = () => {
    const { isAuthenticated, isLoading, error } = useAuth0();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">Loading...</div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center">
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