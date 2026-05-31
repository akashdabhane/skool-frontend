import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { socketUrl } from "../../utils/helper";
import axios from "axios";
import { baseUrl } from "../../utils/helper";

const ChatWindow = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const socketRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!room) return;

    axios.get(`${baseUrl}chats/messages/${room._id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setMessages(response.data.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [room]);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token || !room) return;

    const socket = io(socketUrl, {
      auth: { token },
    });
    socketRef.current = socket;

    socket.emit("join-room", { roomId: room._id });

    socket.on("chat-message", (payload) => {
      if (payload.room !== room._id) return;
      setMessages((prev) => [...prev, payload]);
    });

    socket.on("typing", ({ userId }) => {
      setTypingUsers((prev) => (prev.includes(userId) ? prev : [...prev, userId]));
    });

    socket.on("stop-typing", ({ userId }) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      socket.emit("leave-room", { roomId: room._id });
      socket.disconnect();
    };
  }, [room]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !socketRef.current) return;
    socketRef.current.emit("chat-message", { roomId: room._id, message: message.trim() });
    setMessage("");
    socketRef.current.emit("stop-typing", { roomId: room._id });
  };

  const handleTyping = (value) => {
    setMessage(value);
    if (!socketRef.current) return;
    if (value.trim()) {
      socketRef.current.emit("typing", { roomId: room._id });
    } else {
      socketRef.current.emit("stop-typing", { roomId: room._id });
    }
  };

  if (!room) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700">
        <div className="text-center p-6 rounded-lg">
          <i className="fas fa-comment text-4xl text-gray-400 mb-4"></i>
          <p className="text-sm text-gray-600 dark:text-gray-200">Select a chat to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-700">
      <div className="p-3 border-b border-gray-200 bg-white">
        <h3 className="text-sm font-semibold text-gray-700">{room.name}</h3>
        {typingUsers.length > 0 && (
          <p className="text-xs text-gray-500">Someone is typing...</p>
        )}
      </div>
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((item) => (
          <div key={item._id} className="bg-white rounded-lg p-2 shadow-sm">
            <p className="text-sm text-gray-800">{item.message}</p>
            <span className="text-xs text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ""}</span>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="p-3 border-t border-gray-200 bg-white flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(event) => handleTyping(event.target.value)}
          placeholder="Type a message"
          className="flex-1 border border-gray-300 rounded-md p-2"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
