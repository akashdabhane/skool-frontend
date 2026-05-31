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
