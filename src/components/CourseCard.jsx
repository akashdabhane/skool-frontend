// components/CourseCard.jsx
import React from "react";

function CourseCard({ title, subtitle, bgColor, avatarText }) {
    return (
        <div
            className={`p-4 rounded-lg shadow-md ${bgColor} text-white relative h-32`}
        >
            <div className="absolute top-2 right-2">
                <button className="p-1 rounded hover:bg-gray-300">...</button>
            </div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm">{subtitle}</p>
            <div className="absolute bottom-2 right-2 flex space-x-2">
                <button className="p-1 bg-gray-300 rounded hover:bg-gray-400">
                    📷
                </button>
                <button className="p-1 bg-gray-300 rounded hover:bg-gray-400">
                    📁
                </button>
            </div>
            <div className="absolute top-2 left-2 w-10 h-10 bg-purple-500 flex items-center justify-center rounded-full">
                {avatarText}
            </div>
        </div>
    );
}

export default CourseCard;
