import React from "react";

function ClassworkCard({ title, description, date }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg flex justify-between items-center cursor-pointer">
      <div>
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="text-gray-500 text-sm">{date}</div>
    </div>
  );
}

export default ClassworkCard;
