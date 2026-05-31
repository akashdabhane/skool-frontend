import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../images/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import JoinClassPopup from "../popups/JoinClassPopup";
import { useAuth } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/StateContext";
import OptionListPopup from "../popups/OptionListPopup";
import { useTheme } from "../contexts/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl, socketUrl } from "../utils/helper";
import { io } from "socket.io-client";
import NotificationPanel from "./NotificationPanel";


function Navbar({ showMenu }) {
  const [showJoinClass, setShowJoinClass] = useState(false);
  const navigate = useNavigate();
  const { classid } = useParams();
  const { showPage, setShowPage, loggedInUser } = useAuth();
  const { toggleBar, notifications, setNotifications, unreadCount, setUnreadCount } = useStateContext();
  const [isOptionList, setIsOptionList] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);

  const navs = [
    { _id: 1, name: 'Stream', link: `/c/stream/${classid}` },
    { _id: 2, name: 'Classwork', link: `/c/work/${classid}` },
    { _id: 3, name: 'Lectures', link: `/c/lec/${classid}` },
    { _id: 4, name: 'Exams', link: `/c/exam/${classid}` },
    { _id: 5, name: 'Chats', link: `/c/chat/${classid}` },
    { _id: 6, name: 'People', link: `/c/people/${classid}` },
    { _id: 7, name: 'Analytics', link: `/c/analytics/${classid}` },
  ];

  useEffect(() => {
    axios.get(`${baseUrl}notifications`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      .then((response) => {
        const items = response.data.data || [];
        setNotifications(items);
        setUnreadCount(items.filter((item) => !item.isRead).length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    const socket = io(socketUrl, {
      auth: { token }
    });

    socket.on("notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => socket.disconnect();
  }, []);

  const markNotificationRead = (notification) => {
    axios.patch(`${baseUrl}notifications/${notification._id}/read`, {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      .then(() => {
        setNotifications((prev) => prev.map((item) =>
          item._id === notification._id ? { ...item, isRead: true } : item
        ));
        setUnreadCount((prev) => Math.max(0, prev - 1));
      })
      .catch((error) => console.log(error));
  };

  const markAllNotificationsRead = () => {
    axios.patch(`${baseUrl}notifications/read-all`, {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`
        }
      })
      .then(() => {
        setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
        setUnreadCount(0);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 shadow p-4 sticky top-0 right-0 z-10 w-full">
      <div className="flex ">
        <button className="mx-2 mr-4 md:mr-10" onClick={toggleBar}>
          <RxHamburgerMenu className="text-2xl dark:text-white" />
        </button>
        <div className="flex items-center space-x-12">
          <img
            className="h-10 w-20 object-cover object-center cursor-pointer"
            src={Logo}
            alt="logo"
            onClick={() => navigate("/c")}
          />

          {
            showMenu === true && (
              <ul className="hidden md:flex justify-around md:justify-start md:space-x-6">
                {
                  navs.map((nav) => (
                    <Link key={nav._id} to={nav.link} onClick={() => setShowPage(nav._id)}>
                      <li
                        key={nav._id}
                        className={`${showPage === nav._id && "border-b-2 border-blue-500"} 
                  min-w-16 cursor-pointer p-2 rounded hover:bg-slate-200 text-gray-600 
                  hover:text-blue-500 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-blue-200 font-medium md:text-md`}
                      >
                        {nav.name}
                      </li>

                    </Link>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? (
            <FiSun className="w-6 h-6 text-yellow-400" />
          ) : (
            <FiMoon className="w-6 h-6 text-gray-800" />
          )}
        </button>
        {/* <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
        >

        </input> */}
        <GoPlus
          className="p-2 w-10 h-10 text-2xl text-center align-middle rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 cursor-pointer"
          title="create or join class"
          // onClick={() => setShowJoinClass(true)}
          onMouseEnter={() => setIsOptionList(true)}
          onMouseLeave={() => setIsOptionList(false)}
        />
        <div className="relative">
          <button
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            onClick={() => setShowNotifications((prev) => !prev)}
          >
            <IoMdNotificationsOutline className="text-xl text-gray-800 dark:text-gray-100" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationPanel
              notifications={notifications}
              onMarkRead={markNotificationRead}
              onMarkAllRead={markAllNotificationsRead}
            />
          )}
        </div>
        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          A
        </div>
      </div>

      {
        isOptionList && <OptionListPopup isOpen={isOptionList} setIsOptionList={setIsOptionList} />
      }
      {/* {
        showJoinClass && <JoinClassPopup closePopup={() => setShowJoinClass(false)} />
      } */}
    </div>
  );
}

export default Navbar;
