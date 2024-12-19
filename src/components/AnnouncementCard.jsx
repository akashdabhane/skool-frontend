import React from "react";

function AnnouncementCard({ name, date, title }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="text-sm text-gray-600">
          {name} - {date}
        </p>
      </div>
      <button className="p-1 bg-gray-100 rounded-full hover:bg-gray-200">
        <i className="fas fa-ellipsis-v"></i>
      </button>
    </div>
  );
}

export default AnnouncementCard;
