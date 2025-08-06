import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";


const People = () => {
    const [connectedPeople, setConnectedPeople] = useState({});
    const { classid } = useParams();

    useEffect(() => {
        axios.get(`${baseUrl}class/get-connected-users/${classid}`,
            {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${Cookies.get("accessToken")}`,
                }
            })
            .then((response) => {
                console.log(response.data.data[0]);
                setConnectedPeople(response.data.data[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    const teachers = [{ name: "Pallavi Mangrulkar" }];
    const students = [
        { name: "Coding Desk" },
        { name: "Sarang Sawant" },
        { name: "Shruti" },
        { name: "Shubham Gavali" },
        { name: "Siddhi Amare" },
    ];

    return (
        <div className="flex-1">
            <Navbar showMenu={true} />
            <div className="flex bg-gray-50 dark:bg-gray-800">
                <Sidebar />
                <div className="p-2 md:p-6 pt-4 w-full">
                    <div className="min-h-screen">
                        <div className="p-2 md:px-6 md:py-8">

                            {/* Teachers Section */}
                            <div className="mb-10">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                                    👩‍🏫 Teachers
                                </h2>
                                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
                                    {connectedPeople?.connectedTeachers?.map((teacher, index) => (
                                        <TeacherCard key={index} teacher={teacher} />
                                    ))}
                                </div>
                            </div>

                            {/* Classmates Section */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                                        🧑‍🤝‍🧑 Classmates
                                    </h2>
                                    <span className="text-gray-500 dark:text-gray-300 text-sm">
                                        {connectedPeople?.connectedStudents?.length}{" "}
                                        {connectedPeople?.connectedStudents?.length > 1 ? "students" : "student"}
                                    </span>
                                </div>
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
                                    {connectedPeople?.connectedStudents?.map((student, index) => (
                                        <StudentCard key={index} student={student} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default People;



// TeacherCard Component
const TeacherCard = ({ teacher }) => {
    return (
        <div className="flex items-center space-x-3 p-3 border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
            {/* Avatar */}
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-500 text-white dark:text-gray-100 font-bold shadow-sm">
                {teacher.firstname[0]}
            </div>

            {/* Name */}
            <span className="text-gray-800 dark:text-gray-100 font-medium">
                {teacher.firstname + " " + teacher.lastname}
            </span>
        </div>
    );
};

// StudentCard Component
const StudentCard = ({ student }) => {
    return (
        <div className="flex items-center space-x-3 p-3 border-b border-gray-200 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 transition cursor-pointer">
            {/* Avatar */}
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold shadow-sm">
                {student.firstname[0]}
            </div>

            {/* Name */}
            <span className="text-gray-800 dark:text-gray-100 font-medium">
                {student.firstname + " " + student.lastname}
            </span>
        </div>
    );
};
