import React from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const Chats = () => {
    return (
        <div className="min-h-screen flex bg-gray-900 text-gray-100">
            {/* Chat List Panel */}
            <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-800 p-4">
                <ChatList />
            </div>

            {/* Chat Window Panel */}
            <div className="hidden md:block flex-1 bg-gray-700 p-4">
                <ChatWindow />
            </div>
        </div>
    );
};

export default Chats;
