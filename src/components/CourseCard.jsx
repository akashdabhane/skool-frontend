import React from "react";
import { useNavigate } from "react-router-dom";
import { extractFirstLetter } from "../utils/helper";

function CourseCard({ course, bgColor }) {
    const navigate = useNavigate();

    return (
        <div
            className={`p-4 rounded-lg shadow-md bg-${bgColor}-500 text-white relative h-36 cursor-pointer`}
            onClick={() => navigate(`/c/stream/${course._id}`)}
        >
            <div className="absolute top-2 right-2">
                <button className="p-1 rounded text-xl">...</button>
            </div>
            <h2 className="text-lg font-bold">{course.classname}</h2>
            <p className="text-sm">{course.description}</p>
            <div className="absolute bottom-2 right-2 flex space-x-2">
                <button className="p-1 bg-gray-300 rounded hover:bg-gray-400">
                    📷
                </button>
                <button className="p-1 bg-gray-300 rounded hover:bg-gray-400">
                    📁
                </button>
            </div>
            <div className="absolute top-[30%] right-10 w-14 h-14 bg-purple-500 flex items-center justify-center rounded-full text-2xl">
                {course.avatarText ? course.avatarText : extractFirstLetter(course.teacher.firstname)}
            </div>
        </div>
    );
}

export default CourseCard;
