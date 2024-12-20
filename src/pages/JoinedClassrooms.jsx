import React from "react";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import Navbar from "../components/Navbar";

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
            <div className="flex flex-col w-full">
                <Navbar title={"Classroom"} />
                <div className="flex-1 p-6 bg-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            courses.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    title={course.title}
                                    subtitle={course.subtitle}
                                    bgColor={course.bgColor}
                                    avatarText={course.avatarText}
                                    index={index}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Joinedclassrooms;
