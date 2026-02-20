import React, { useState } from "react";
import {LogoutButton} from "../components/auth";
import { useAuth0 } from '@auth0/auth0-react';

const DashBoard = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL;
  const [message, setMessage] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverURL}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();

      setMessage(responseData.message)
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Create a new course</h1>
      <div>
        <button type="button" onClick={callSecureApi}>Protected Message</button>
        {message && (<p>{message}</p>)}
      </div>
      <LogoutButton />
    </div>
  );
};

export default DashBoard;