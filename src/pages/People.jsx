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
        <div className="flex-1  ">
            <Navbar showMenu={true} />
            <div className="flex bg-gray-100">
                <Sidebar />
                <div className="p-2 md:p-6 pt-4 w-full">

                    <div className="min-h-screen bg-gray-50">
                        <div className="p-2 md:px-4 md:py-6">
                            {/* Teachers Section */}
                            <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
                            <div className="bg-white shadow-sm rounded-lg">
                                {
                                    connectedPeople?.connectedTeachers?.map((teacher, index) => (
                                        <TeacherCard key={index} teacher={teacher} />
                                    ))
                                }
                            </div>

                            {/* Classmates Section */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold mb-4">Classmates</h2>
                                    <span className="text-gray-500">{connectedPeople?.connectedStudents?.length} {connectedPeople?.connectedStudents?.length > 1 ? "students" : "student"} </span>
                                </div>
                                <div className="bg-white shadow-sm rounded-lg">
                                    {
                                        connectedPeople?.connectedStudents?.map((student, index) => (
                                            <StudentCard key={index} student={student} />
                                        ))
                                    }
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
        <div className="flex items-center space-x-3 p-2 border-b">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold">
                {teacher.firstname[0]}
            </div>
            <span className="text-gray-700">{teacher.firstname + " " + teacher.lastname}</span>
        </div>
    );
};

// StudentCard Component
const StudentCard = ({ student }) => {
    return (
        <div className="flex items-center space-x-3 p-2 border-b">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                {student.firstname[0]}
            </div>
            <span className="text-gray-700">{student.firstname + " " + student.lastname}</span>
        </div>
    );
};
