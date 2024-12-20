import React from "react";

const Lecture = () => {
  const Participants = [
    {
      name: "Akash Dabhane",
      profileImage: "",
      color: "purple",
    },
    {
      name: "Lakhan",
      profileImage: "",
      color: "green",
    },
  ]


  return (
    <div className="bg-gray-900 h-screen flex flex-col">
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
          {
            Participants.map((participant, index) => (
              <ParticipantCard participant={participant} index={index} />
            ))
          }
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800">
        {/* bottom Bar */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
          <p className="text-sm">{new Date().getHours() + ":" + new Date().getMinutes()} | abg-jivj-bpg</p>
        </div>

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



const ParticipantCard = ({ participant, index }) => {
  const extractFirstLetter = (word) => {
    return word.charAt(0).toUpperCase();
  }

  return (
    <div className="flex items-center justify-between" key={index}>
      <div className="flex items-center">
        <div className={`bg-${participant.color}-500 rounded-full w-10 h-10 flex justify-center items-center`}>
          <p className="text-white text-lg">{participant.profileImage === "" ? extractFirstLetter(participant.name) : participant.profileImage}</p>
        </div>
        <p className="ml-2 text-white">{participant.name}</p>
      </div>
      <button className="text-gray-400 hover:text-white">
        <i className="fas fa-ellipsis-v"></i>
      </button>
    </div>
  )
}

