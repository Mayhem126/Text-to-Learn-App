import React from "react";
import {LogoutButton} from "../components/auth";

const DashBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Create a new course</h1>
      <LogoutButton />
    </div>
  );
};

export default DashBoard;