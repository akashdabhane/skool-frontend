import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/classroom/CourseCard";
import Navbar from "../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";

function Joinedclassrooms() {
    const [classes, setClasses] = useState([]);
    const bgColor = "blue";

    useEffect(() => {
        axios.get(`${baseUrl}class/get-all-classrooms`,
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            })
            .then((response) => {
                console.log(response.data.data);
                setClasses(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const courses = [
        {
            classname: "TE comp",
            description: "pallavi.mangrulkar16 pp",
            bgColor: "blue",
            avatarText: "P",
            _id: 1
        },
        {
            classname: "In Plant Training 2022",
            description: "ss20 gpmco",
            bgColor: "green",
            avatarText: "S",
            _id: 2
        },
        {
            classname: "GPM Course Code: IT",
            description: "Sagar Mohite",
            bgColor: "gray",
            avatarText: "S",
            _id: 3
        },
        {
            classname: "Network Management",
            description: "TYSS Nilesh Kitke",
            bgColor: "red",
            avatarText: "N",
            _id: 4
        },
        {
            classname: "CS 2022_23",
            description: "Both shifts Rupali Molawade",
            bgColor: "gray",
            avatarText: "R",
            _id: 5
        },
        {
            classname: "TYSS-Data Analytics",
            description: "Vrushali Patil",
            bgColor: "blue",
            avatarText: "V",
            _id: 6
        },
        {
            classname: "OS 2ndShift",
            description: "2nd sy fs",
            bgColor: "blue",
            avatarText: "SY",
            _id: 7
        },
        {
            classname: "SYSS",
            description: "II Megha Kapse",
            bgColor: "gray",
            avatarText: "M",
            _id: 8
        },
    ];

    return (
        <div className="flex-1">
            <Navbar showMenu={false} />
            <div className="flex h-screen dark:bg-gray-800">
                <Sidebar />
                <div className="p-6 pt-4 w-full ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                        {
                            classes.map((course) => (
                                <CourseCard
                                    course={course}
                                    bgColor={bgColor}
                                    key={course._id}
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
