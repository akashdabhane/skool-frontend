import React from "react";
import { IoMdClose } from "react-icons/io";

const videoCallRightPanelPeople = ({ closePanelNav }) => {
    const Participants = [
        {
            name: "Akash Dabhane",
            profileImage: "",
            color: "purple",
            isMuted: true,
            isHost: true
        },
        {
            name: "Lakhan",
            profileImage: "",
            color: "green",
            isMuted: true,
            isHost: false
        },
    ]

    return (
        <div className="w-full h-full md:w-96 p-4 flex flex-col bg-gray-800">
            <nav className="text-white text-xl">
                <div className="flex items-center justify-between my-2 mb-4">
                    <span>People</span>
                    <IoMdClose
                        className="cursor-pointer p-1 w-8 h-8 rounded-full hover:bg-gray-700 "
                        onClick={closePanelNav}
                    />
                </div>
            </nav>

            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search for people"
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Participants Section */}
            <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-2">In Meeting</h3>
                <div className="p-4 space-y-4">
                    {
                        Participants.map((participant, index) => (
                            <ParticipantCard participant={participant} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default videoCallRightPanelPeople;



const ParticipantCard = ({ participant, index }) => {
    const extractFirstLetter = (word) => {
        return word.charAt(0).toUpperCase();
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className={`bg-${participant.color}-500 rounded-full w-10 h-10 flex justify-center items-center`}>
                    <p className="text-white text-lg">{participant.profileImage === "" ? extractFirstLetter(participant.name) : participant.profileImage}</p>
                </div>
                <p className="ml-2 text-white">{participant.name}</p>
            </div>
            <button className="text-gray-400 hover:text-white">
                <i className="fas fa-ellipsis-v"></i>
            </button>
        </div>
    )
}

