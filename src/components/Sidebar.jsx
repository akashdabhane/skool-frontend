import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";

function Sidebar() {
  const [showBar, setShowBar] = useState(false);
  const toggleBar = () => setShowBar(!showBar);


  return (
    <div className={`${showBar ? "w-72" : "w-16"} h-full bg-gray-800 text-white flex flex-col items-center py-4 skicky`} onMouseEnter={toggleBar} onMouseLeave={toggleBar}>
      <button className="mb-8 my-2" onClick={toggleBar}>
        <RxHamburgerMenu className="text-2xl" />
      </button>
      <nav className="flex-1 flex flex-col space-y-4 text-xl text-white" >
        <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center">
          <GoHomeFill />
          <span className={`sr-only ${showBar && "md:static"} `}>Home</span>
        </button>
        <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center">
          <LuGraduationCap />
          <span className={`sr-only ${showBar && "md:static"} `}>Courses</span>
        </button>
        <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center">
          <IoSettingsOutline />
          <span className={`sr-only ${showBar && "md:static"} `}>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
