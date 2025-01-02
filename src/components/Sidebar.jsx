import React, { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { useStateContext } from "../contexts/StateContext";

function Sidebar() {
  const { showBar, toggleBar } = useStateContext();

  return (
    <div className={`${showBar ? "w-[22rem]" : "w-20"} bg-gray-800 text-white hidden md:flex flex-col items-center py-4 sticky `} onMouseEnter={toggleBar} onMouseLeave={toggleBar}>
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
