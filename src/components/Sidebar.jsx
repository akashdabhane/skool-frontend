import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { useStateContext } from "../contexts/StateContext";

function Sidebar() {
  const { showBar, toggleBar } = useStateContext();

  return (
    <div className={`${showBar ? "w-[22rem]" : "w-20"}`}>
      <div className={`${showBar ? "w-[18rem]" : "w-20"} bg-white text-black dark:bg-gray-900 dark:text-white hidden md:flex flex-col items-center py-4 fixed h-full shadow`} onMouseEnter={toggleBar} onMouseLeave={toggleBar}>
        <nav className="flex-1 flex flex-col space-y-4 text-xl text-black dark:text-white" >
          <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center space-x-2 ">
            <GoHomeFill />
            <span className={`${showBar ? "md:static" : "hidden"} text-lg`}>Home</span>
          </button>
          <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center space-x-2 ">
            <LuGraduationCap />
            <span className={`${showBar ? "md:static" : "hidden"} text-lg`}>Courses</span>
          </button>
          <button className="hover:bg-gray-700 p-2 rounded md:flex md:items-center space-x-2 ">
            <IoSettingsOutline />
            <span className={`${showBar ? "md:static" : "hidden"} text-lg`}>Settings</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
