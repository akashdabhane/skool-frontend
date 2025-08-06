import React from "react";

const ChatWindow = () => {
    return (
        <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
  <div className="text-center p-6 rounded-lg">
    <i className="fas fa-comment text-4xl text-gray-400 mb-4"></i>
    <p className="text-sm text-gray-600 dark:text-gray-200">Send and receive messages using ChatApp</p>
    <p className="text-xs text-gray-500 dark:text-gray-300">End-to-end encryption</p>
  </div>
</div>

    );
};

export default ChatWindow;
