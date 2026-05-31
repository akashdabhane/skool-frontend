import React, { useEffect } from "react";
import ChatCard from "./ChatCard";

const ChatList = ({ rooms, selectedRoomId, onSelectRoom }) => {

    return (
        <div>
  {/* Search Bar */}
  <div className="flex items-center space-x-2 mb-4 w-full">
    <input
      type="text"
      placeholder="Search here..."
      className="flex-1 w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 rounded-lg text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
    />
  </div>

  {/* Chat Cards */}
  <div className="space-y-4">
    {rooms.map((chat, index) => (
      <ChatCard
        key={index}
        name={chat.name}
        message={chat.lastMessage?.message || ""}
        date={chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt).toDateString() : ""}
        isActive={selectedRoomId === chat._id}
        onClick={() => onSelectRoom(chat)}
      />
    ))}
  </div>
</div>

    );
};

export default ChatList;
