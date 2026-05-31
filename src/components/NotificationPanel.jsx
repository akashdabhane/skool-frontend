import React from "react";

const NotificationPanel = ({ notifications, onMarkRead, onMarkAllRead }) => {
  return (
    <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
        <button
          className="text-xs text-blue-500 hover:underline"
          onClick={onMarkAllRead}
        >
          Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 px-4 py-4">No notifications yet.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className={`px-4 py-3 border-b cursor-pointer ${item.isRead ? "bg-white" : "bg-blue-50"}`}
              onClick={() => onMarkRead(item)}
            >
              <p className="text-sm text-gray-800">{item.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
