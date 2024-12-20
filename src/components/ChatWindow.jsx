import React from "react";

const ChatWindow = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center">
                <i className="fas fa-comment text-4xl text-gray-500 mb-4"></i>
                <p className="text-sm text-gray-400">Send and receive messages using chatapp</p>
                <p className="text-xs text-gray-500">End-to-end encryption</p>
            </div>
        </div>
    );
};

export default ChatWindow;
