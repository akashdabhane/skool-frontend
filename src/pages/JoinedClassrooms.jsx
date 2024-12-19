import React from "react";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";


function Joinedclassrooms() {
    const courses = [
        {
            title: "TE comp",
            subtitle: "pallavi.mangrulkar16 pp",
            bgColor: "bg-blue-500",
            avatarText: "P",
        },
        {
            title: "In Plant Training 2022",
            subtitle: "ss20 gpmco",
            bgColor: "bg-green-500",
            avatarText: "S",
        },
        {
            title: "GPM Course Code: IT",
            subtitle: "Sagar Mohite",
            bgColor: "bg-gray-500",
            avatarText: "S",
        },
        {
            title: "Network Management",
            subtitle: "TYSS Nilesh Kitke",
            bgColor: "bg-black text-white",
            avatarText: "N",
        },
        {
            title: "CS 2022_23",
            subtitle: "Both shifts Rupali Molawade",
            bgColor: "bg-gray-800 text-white",
            avatarText: "R",
        },
        {
            title: "TYSS-Data Analytics",
            subtitle: "Vrushali Patil",
            bgColor: "bg-blue-700",
            avatarText: "V",
        },
        {
            title: "OS 2ndShift",
            subtitle: "2nd sy fs",
            bgColor: "bg-blue-500",
            avatarText: "SY",
        },
        {
            title: "SYSS",
            subtitle: "II Megha Kapse",
            bgColor: "bg-gray-500",
            avatarText: "M",
        },
    ];


    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-6 bg-gray-100">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">Classroom</h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                            +
                        </button>
                        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full">
                            A
                        </div>
                    </div>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            subtitle={course.subtitle}
                            bgColor={course.bgColor}
                            avatarText={course.avatarText}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Joinedclassrooms;
