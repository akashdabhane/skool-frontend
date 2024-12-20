import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnnouncementCard from "../components/AnnouncementCard";
import UpcomingCard from "../components/UpcomingCard";
import Classwork from "../components/Classwork";
import Lectures from "../components/Lectures";
import People from "../components/People";
import Chats from "../components/Chats";

function Classroom() {
    const [nav, setNav] = useState(0);

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
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 overflow-y-scroll ">
                <Navbar title="Classroom > SYSS - Next Generation Databases - CO19311" />
                <div className="p-6 pt-4">
                    <SubNavbar nav={nav} setNav={setNav} />

                    {
                        nav === 0 && (
                            <>
                                {/* Banner */}
                                <div className="bg-blue-500 text-white rounded-lg p-6 mb-6">
                                    <h1 className="text-2xl font-bold">SYSS - Next Generation Databases</h1>
                                    <p className="mt-2 text-sm">CO19311</p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-4">
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
                                    <div>
                                        <UpcomingCard message="Woohoo, no work due in soon!" />
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        nav === 1 && (
                            <Classwork />
                        )
                    }
                    {
                        nav === 2 && (
                            <Lectures />
                        )
                    }
                    {
                        nav === 3 && (
                            <Chats />
                        )
                    }
                    {
                        nav === 4 && (
                            <People />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Classroom;



// sub navbar Navbar Component
const SubNavbar = ({ nav, setNav }) => {
    const tabs = [
        { name: 'Stream' },
        { name: 'Classwork' },
        { name: 'Lectures' },
        { name: 'Chats' },
        { name: 'People' },
    ];

    return (
        <div className="bg-white shadow sticky top-20 z-10 ">
            <ul className="flex justify-around md:justify-start md:space-x-6 px-4 py-3">
                {
                    tabs.map((tab, index) => (
                        <li
                            key={index}
                            className={`${nav === index && "border-b-2 border-blue-500"} min-w-16 cursor-pointer p-2 rounded hover:bg-slate-200 text-gray-600 hover:text-blue-500 font-medium md:text-md`}
                            onClick={() => setNav(index)}
                        >
                            {tab.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
