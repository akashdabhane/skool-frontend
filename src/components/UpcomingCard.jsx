import React from "react";

function UpcomingCard({ message }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="font-bold text-lg">Upcoming</h3>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
      <button className="mt-4 text-blue-500 text-sm font-medium hover:underline">
        View all
      </button>
    </div>
  );
}

export default UpcomingCard;
