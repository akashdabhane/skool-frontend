import React from "react";

function UpcomingCard({ message }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md dark:shadow-xl hover:shadow-lg transition-shadow duration-300 p-5">
      {/* Heading */}
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
        📅 Upcoming
      </h3>

      {/* Message */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {message}
      </p>

      {/* Button */}
      <button className="mt-5 inline-block px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-600 hover:shadow-md transition-all duration-200">
        View all →
      </button>
    </div>
  );
}

export default UpcomingCard;
