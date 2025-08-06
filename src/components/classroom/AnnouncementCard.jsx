import React from "react";

function AnnouncementCard({ name, date, title }) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-md dark:shadow-xl hover:shadow-lg transition-shadow duration-300 rounded-xl p-5 flex justify-between items-center">
      {/* Left Content */}
      <div>
        <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {name} • {date}
        </p>
      </div>

      {/* Options Button */}
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
        <i className="fas fa-ellipsis-v text-gray-500"></i>
      </button>
    </div>
  );
}

export default AnnouncementCard;
