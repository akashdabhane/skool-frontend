import React from "react";

const ChatCard = ({ name, message, date }) => {
    return (
        <div className="flex items-start space-x-2 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-gray-300"></i>
            </div>
            <div className="flex-1 mx-1 max-w-40 space-y-1">
                <h3 className="text-sm font-semibold">{name}</h3>
                <p className="text-xs text-gray-400 truncate line-clamp-1 ">{message}</p>
            </div>
            <span className="text-xs text-gray-400 m-0">{date}</span>
        </div>
    );
};

export default ChatCard;
