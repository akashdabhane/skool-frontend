import React from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineAudio, AiOutlineAudioMuted, AiOutlineMore } from "react-icons/ai";
import { extractFirstLetter } from "../../utils/helper";

const videoCallRightPanelPeople = ({ closePanelNav, participants }) => {
    const participantList = participants?.length
        ? participants.map((participant) => ({
            id: participant.socketId,
            name: participant.userId?.toString().slice(-6) || "Participant",
            profileImage: "",
            color: "purple",
            isMuted: false,
            isHost: false
        }))
        : [];

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
                    {participantList.length > 0 ? (
                        participantList.map((participant, index) => (
                            <ParticipantCard participant={participant} key={participant.id || index} />
                        ))
                    ) : (
                        <p className="text-xs text-gray-400">No participants yet</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default videoCallRightPanelPeople;



const ParticipantCard = ({ participant, index }) => {

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className={`bg-${participant.color}-500 rounded-full w-10 h-10 flex justify-center items-center`}>
                    <p className="text-white text-lg">{participant.profileImage === "" ? extractFirstLetter(participant.name) : participant.profileImage}</p>
                </div>
                <p className="ml-2 text-white">{participant.name}</p>
            </div>
            <div className="space-x-1 flex items-center justify-center">
                <button className="text-gray-400 hover:bg-gray-600 rounded-full p-1 text-xl">
                    {participant.isMuted ? <AiOutlineAudioMuted /> : <AiOutlineAudio />}
                </button>
                <button className="text-gray-400 hover:bg-gray-600 rounded-full p-1 text-xl">
                    <AiOutlineMore />
                </button>
            </div>
        </div>
    )
}

