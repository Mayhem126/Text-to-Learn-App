import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar"
import Content from "../components/Content"
import { useAuth0 } from "@auth0/auth0-react";

const Lesson = () => {
    const { user } = useAuth0()
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#080814] to-[#1a0a1e]">
            <Header userInfo={user} />
            <div className="grow border border-white flex">
                <Sidebar />
                <Content />
            </div>
        </div>
    );
}

export default Lesson;