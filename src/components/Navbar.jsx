import React from "react";
import { GoPlus } from "react-icons/go";
import Logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-white shadow p-4 sticky top-0 right-0 z-10">
      <div className="flex items-center space-x-2">
        <img
          className="h-10 w-20 object-cover object-center cursor-pointer"
          src={Logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <GoPlus className="p-2 w-10 h-10 text-2xl text-center align-middle rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer" />
        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full cursor-pointer">
          A
        </div>
      </div>
    </div>
  );
}

export default Navbar;
