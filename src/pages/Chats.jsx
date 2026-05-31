import React, { useEffect, useState } from "react";
import ChatList from "../components/chat/ChatList";
import ChatWindow from "../components/chat/ChatWindow";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Chats = () => {
  const { classid } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (!classid) return;

    axios.get(`${baseUrl}chats/room/${classid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setRooms(response.data.data || []);
        if (!selectedRoom && response.data.data?.length) {
          setSelectedRoom(response.data.data[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classid]);

    return (
        <div className="flex-1">
  <Navbar showMenu={true} />
  <div className="flex bg-gray-50 dark:bg-gray-800">
    <Sidebar />
    <div className="md:p-6 md:py-4 w-full">
      <div className="min-h-screen flex bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {/* Chat List Panel */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-gray-200 dark:bg-gray-700 border-r border-gray-200 p-4">
          <ChatList
            rooms={rooms}
            selectedRoomId={selectedRoom?._id}
            onSelectRoom={setSelectedRoom}
          />
        </div>

        {/* Chat Window Panel */}
        <div className="hidden md:block flex-1 bg-gray-100 dark:bg-gray-700  p-4">
          <ChatWindow room={selectedRoom} />
        </div>
      </div>
    </div>
  </div>
</div>


    );
};

export default Chats;
