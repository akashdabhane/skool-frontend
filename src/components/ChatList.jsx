import React from "react";
import ChatCard from "./ChatCard";

const ChatList = () => {
    const chats = [
        { name: "example", message: "jjj", date: "15 Dec 2024" },
        { name: "lakhan", message: "hello and welcome to india's...", date: "13 Dec 2024" },
    ];

    return (
        <div>
            {/* Search Bar */}
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button className="text-gray-300 hover:text-white">
                    <i className="fas fa-search"></i>
                </button>
                <button className="text-gray-300 hover:text-white">
                    <i className="fas fa-plus"></i>
                </button>
                <button className="text-gray-300 hover:text-white">
                    <i className="fas fa-ellipsis-v"></i>
                </button>
            </div>

            {/* Chat Cards */}
            <div className="space-y-4">
                {chats.map((chat, index) => (
                    <ChatCard key={index} name={chat.name} message={chat.message} date={chat.date} />
                ))}
            </div>
        </div>
    );
};

export default ChatList;
