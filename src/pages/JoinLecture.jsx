import React from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const JoinLecture = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1">
                <MainCard />
                <RightPanel />
            </div>
        </div>
    );
};

export default JoinLecture;


const Navbar = () => {
    return (
        <header className="w-full bg-gray-100 border-b border-gray-300 py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
                <Link to={'/'}>
                    <img
                        src={Logo}
                        alt="Skool Logo"
                        className="w-20 h-10 mr-2"
                    />
                </Link>
            </div>
            <div className="text-sm text-gray-600">akashdabhane10@gmail.com</div>
        </header>
    );
};



const MainCard = () => {
    return (
        <div className="flex-1 flex justify-center items-center bg-gray-200 p-4">
            <div className="w-full max-w-md bg-black text-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Akash Dabhane</h2>
                <p className="text-sm mb-4">
                    Do you want people to see and hear you in the meeting?
                </p>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Allow microphone and camera
                </button>
                <div className="flex justify-center mt-4 space-x-4">
                    <button className="bg-red-500 text-white rounded-full p-3">🔇</button>
                    <button className="bg-red-500 text-white rounded-full p-3">📷</button>
                </div>
            </div>
        </div>
    );
};


const RightPanel = () => {
    const navigate = useNavigate();
    
    return (
        <div className="hidden md:flex w-1/4 bg-gray-100 flex-col p-4">
            <h2 className="text-lg font-semibold mb-2">Ready to join?</h2>
            <p className="text-sm text-gray-600 mb-4">No one else is here</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 mb-2"
                onClick={() => navigate(`/lec/${"3434"}`)}
            >
                Join now
            </button>
            <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300 mb-2">
                Present
            </button>
            <button className="w-full bg-gray-200 text-gray-600 py-2 rounded-md hover:bg-gray-300">
                Use Companion Mode
            </button>
        </div>
    );
};