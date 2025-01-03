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
        <div className="flex-1 ">
            <Navbar showMenu={true} />
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <div className="p-2 md:p-6 pt-4 w-full">
                    <>
                        {/* Banner */}
                        <div className="bg-blue-500 text-white rounded-lg p-6 mb-6">
                            <h1 className="text-2xl font-bold">{classroom.classname}</h1>
                            <p className="mt-2 text-sm">{classroom.description}</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-4">
                                {
                                    announcements.map((announcement, index) => (
                                        <AnnouncementCard
                                            key={index}
                                            name={announcement.name}
                                            date={announcement.date}
                                            title={announcement.title}
                                        />
                                    ))
                                }
                            </div>

                            {/* Right Column */}
                            <div>
                                <UpcomingCard message="Woohoo, no work due in soon!" />
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}

export default Classroom;


