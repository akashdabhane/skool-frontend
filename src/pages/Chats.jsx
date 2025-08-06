import React from "react";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Chats = () => {
    return (
        <div className="flex-1">
  <Navbar showMenu={true} />
  <div className="flex bg-gray-50 dark:bg-gray-800">
    <Sidebar />
    <div className="md:p-6 md:py-4 w-full">
      <div className="min-h-screen flex bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {/* Chat List Panel */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-200 dark:bg-gray-700 border-r border-gray-200 p-4">
          <ChatList />
        </div>

        {/* Chat Window Panel */}
        <div className="hidden md:block flex-1 bg-gray-100 dark:bg-gray-700  p-4">
          <ChatWindow />
        </div>
      </div>
    </div>
  </div>
</div>


    );
};

export default Chats;
