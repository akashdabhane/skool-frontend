import React from "react";

const ChatCard = ({ name, message, date }) => {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border border-gray-200 transition">
      {/* Avatar */}
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
        <i className="fas fa-user text-gray-500"></i>
      </div>

      {/* Chat Info */}
      <div className="flex-1 mx-1 max-w-40 space-y-1">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate line-clamp-1">{message}</p>
      </div>

      {/* Date */}
      <span className="text-xs text-gray-400 dark:text-gray-300">{date}</span>
    </div>

  );
};

export default ChatCard;
