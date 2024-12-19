import React from "react";
import { GoPlus } from "react-icons/go";

function Navbar({ title }) {
  return (
    <div className="flex items-center justify-between bg-white shadow p-4">
      <h1 className="text-lg font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <GoPlus className="p-2 w-10 h-10 text-2xl text-center align-middle rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer" />
        {/* <button className="p-2 w-10 h-10 text-2xl text-center align-middle rounded-full bg-gray-200 hover:bg-gray-300">+</button> */}
        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full">
          A
        </div>
      </div>
    </div>
  );
}

export default Navbar;
