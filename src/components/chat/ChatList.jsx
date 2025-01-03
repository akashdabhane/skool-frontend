import React from "react";
import ChatCard from "./ChatCard";

const ChatList = () => {
    const chats = [
        { name: "example", message: "jjj", date: "15 Dec 2024" },
        { name: "lakhan", message: "hello and welcome to india's kskdf djfda k dfd", date: "13 Dec 2024" },
    ];

    return (
        <div>
            {/* Search Bar */}
            <div className="flex items-center space-x-2 mb-4 w-full">
                <input
                    type="text"
                    placeholder="Search here..."
                    className="flex-1 w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
                />
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
