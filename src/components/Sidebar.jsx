import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

function Sidebar() {
  const [showBar, setShowBar] = useState(false);
  const toggleBar = () => setShowBar(!showBar);


  return (
    <div className={`${showBar ? "w-72" : "w-16"} bg-gray-800 text-white flex flex-col items-center py-4 skicky`} onMouseEnter={toggleBar} onMouseLeave={toggleBar}>
      <button className="mb-4" onClick={toggleBar}>
        <RxHamburgerMenu className="text-2xl" />
      </button>
      <nav className="flex-1 flex flex-col space-y-4 text-xl text-white" >
        <button className="hover:bg-gray-700 p-2 rounded bg-white ">
          <span className="sr-only">Home</span>
          <i className="fas fa-home"></i>
        </button>
        <button className="hover:bg-gray-700 p-2 rounded bg-white">
          <span className="sr-only">Courses</span>
          <i className="fas fa-book"></i>
        </button>
        <button className="hover:bg-gray-700 p-2 rounded bg-white">
          <span className="sr-only">Settings</span>
          <i className="fas fa-cog"></i>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
