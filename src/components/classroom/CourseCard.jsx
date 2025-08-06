import React from "react";
import { useNavigate } from "react-router-dom";
import { extractFirstLetter } from "../../utils/helper";

function CourseCard({ course, bgColor }) {
    const navigate = useNavigate();

    return (
        <div
            className={`relative p-5 rounded-xl shadow-lg bg-gradient-to-br from-${bgColor}-500 to-${bgColor}-600 text-white h-44 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl`}
            onClick={() => navigate(`/c/stream/${course._id}`)}
        >
            {/* Options Button */}
            <div className="absolute top-3 right-3">
                <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                    ⋮
                </button>
            </div>

            {/* Title & Description */}
            <h2 className="text-xl font-extrabold tracking-wide">{course.classname}</h2>
            <p className="text-sm text-white/80 mt-1 line-clamp-2">
                {course.description}
            </p>

            {/* Action Buttons */}
            <div className="absolute bottom-3 left-5 flex space-x-2">
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                    📷
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                    📁
                </button>
            </div>

            {/* Avatar Circle */}
            <div className="absolute top-[35%] right-6 w-16 h-16 bg-purple-600 flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                {course.avatarText ? course.avatarText : extractFirstLetter(course.teacher.firstname)}
            </div>
        </div>

    );
}

export default CourseCard;
