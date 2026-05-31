import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnnouncementCard from "../components/classroom/AnnouncementCard";
import UpcomingCard from "../components/classroom/UpcomingCard";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Classroom() {
    const [nav, setNav] = useState(0);
    const [classroom, setClassroom] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [announcementMessage, setAnnouncementMessage] = useState("");
    const [announcementError, setAnnouncementError] = useState("");
    const { classid } = useParams(); // classroom id
    const { loggedInUser } = useAuth();

    useEffect(() => {
        axios.get(`${baseUrl}class/get-classroom/${classid}`,
            {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            .then((response) => {
                console.log(response.data.data);
                setClassroom(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}announcements/get-all-announcements/${classid}`,
            {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            .then((response) => {
                setAnnouncements(response.data.data || []);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const handleCreateAnnouncement = () => {
        if (!announcementMessage.trim()) {
            setAnnouncementError("Announcement message is required");
            return;
        }

        axios.post(`${baseUrl}announcements/create-announcement`,
            {
                announceMessage: announcementMessage.trim(),
                classroom: classid,
            },
            {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            .then((response) => {
                setAnnouncements((prev) => [response.data.data, ...prev]);
                setAnnouncementMessage("");
                setAnnouncementError("");
            })
            .catch((error) => {
                setAnnouncementError(error?.response?.data?.message || "Failed to post announcement");
            });
    };

    return (
        <div className="flex-1 min-h-screen app-surface">
            {/* Navbar */}
            <Navbar showMenu={true} />

            <div className="flex h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="p-3 md:p-8 w-full">
                    <>
                        {/* Banner */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-8 shadow-lg mb-8">
                            <h1 className="text-3xl font-bold tracking-wide">{classroom.classname}</h1>
                            <p className="mt-3 text-sm text-blue-100 leading-relaxed">
                                {classroom.description}
                            </p>
                            <div className="mt-4">
                                <Link
                                    to={`/c/resources/${classid}`}
                                    className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-50"
                                >
                                    View resources
                                </Link>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-5">
                                {loggedInUser?.isTeacher && (
                                    <div className="app-panel p-4">
                                        <textarea
                                            value={announcementMessage}
                                            onChange={(event) => {
                                                setAnnouncementMessage(event.target.value);
                                                setAnnouncementError("");
                                            }}
                                            placeholder="Announce something to your class..."
                                            className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            rows={3}
                                        />
                                        {announcementError && (
                                            <p className="text-sm text-red-600 mt-2">{announcementError}</p>
                                        )}
                                        <div className="flex justify-end mt-3">
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                                onClick={handleCreateAnnouncement}
                                            >
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {announcements.map((announcement, index) => (
                                    <AnnouncementCard
                                        key={index}
                                        name={`${announcement.createdBy?.firstname || ""} ${announcement.createdBy?.lastname || ""}`.trim()}
                                        date={new Date(announcement.createdAt).toDateString()}
                                        title={announcement.announceMessage}
                                    />
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {loggedInUser?.isTeacher && classroom?.inviteLinkToken && (
                                    <div className="app-panel p-4">
                                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Invite students</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Class code</p>
                                        <div className="mt-1 font-semibold text-gray-800 dark:text-gray-100">
                                            {classroom.classCode}
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Invite link</p>
                                        <div className="mt-1 text-xs break-all text-blue-600">
                                            {`${window.location.origin}/c/join/${classroom.inviteLinkToken}`}
                                        </div>
                                    </div>
                                )}
                                <UpcomingCard message="🎉 Woohoo, no work due soon!" />
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default Classroom;


