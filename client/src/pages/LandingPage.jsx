import React from "react";
import {LoginButton} from "../components/auth";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Text-to-Learn</h1>
      <LoginButton />
    </div>
  );
};

export default LandingPage;