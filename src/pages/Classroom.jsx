import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnnouncementCard from "../components/classroom/AnnouncementCard";
import UpcomingCard from "../components/classroom/UpcomingCard";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";


function Classroom() {
    const [nav, setNav] = useState(0);
    const [classroom, setClassroom] = useState([]);
    const { classid } = useParams(); // classroom id

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

    const announcements = [
        {
            name: "Vrushali Patil",
            date: "27 Jun 2022",
            title: "Unit Test - 2 Result",
        },
        {
            name: "Vrushali Patil",
            date: "9 Jun 2022",
            title: "MongoDB Sharding",
        },
    ];

    return (
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-800">
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
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-5">
                                {announcements.map((announcement, index) => (
                                    <AnnouncementCard
                                        key={index}
                                        name={announcement.name}
                                        date={announcement.date}
                                        title={announcement.title}
                                    />
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
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


