import React from "react";

const Lecture = () => {
  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
        <p className="text-sm">14:49 | abg-jivj-bpg</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Video Section */}
        <div className="flex-1 flex justify-center items-center bg-gray-900">
          <div className="rounded-full bg-blue-500 w-24 h-24 flex justify-center items-center">
            <p className="text-white text-4xl">A</p>
          </div>
        </div>

        {/* Participant List */}
        <div className="w-1/4 bg-gray-800 p-4 space-y-4">
          {/* Participant 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-purple-500 rounded-full w-10 h-10 flex justify-center items-center">
                <p className="text-white text-lg">A</p>
              </div>
              <p className="ml-2 text-white">Akash Dabhane</p>
            </div>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>

          {/* Participant 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full w-10 h-10 flex justify-center items-center">
                <p className="text-white text-lg">L</p>
              </div>
              <p className="ml-2 text-white">Lakhan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800">
        {/* Left Buttons */}
        <div className="flex space-x-4">
          <button className="bg-red-600 p-2 rounded-full text-white">
            <i className="fas fa-microphone-slash"></i>
          </button>
          <button className="bg-red-600 p-2 rounded-full text-white">
            <i className="fas fa-video-slash"></i>
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-cog"></i>
          </button>
          <button className="bg-red-600 p-2 rounded-full text-white">
            <i className="fas fa-phone"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
