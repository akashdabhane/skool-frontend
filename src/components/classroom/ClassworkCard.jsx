import React from "react";
import { Link } from "react-router-dom";

function ClassworkCard({ title, description, date, to }) {
  const content = (
    <div className="bg-white dark:bg-gray-700 p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex justify-between items-center cursor-pointer group">
      {/* Left Section */}
      <div>
        <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-300 text-sm mt-1">{description}</p>
      </div>

      {/* Right Section (Date) */}
      <div className="text-gray-400 dark:text-gray-200 text-sm whitespace-nowrap">
        {date}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

export default ClassworkCard;
