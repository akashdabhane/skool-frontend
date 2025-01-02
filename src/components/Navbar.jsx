import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../images/logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import JoinClassPopup from "../popups/JoinClassPopup";
import { useAuth } from "../contexts/AuthContext";
import { useStateContext } from "../contexts/StateContext";

function Navbar({ showMenu }) {
  const [showJoinClass, setShowJoinClass] = useState(false);
  const navigate = useNavigate();
  const { classid } = useParams();
  const { showPage, setShowPage } = useAuth();
  const { toggleBar } = useStateContext();

  const navs = [
    { _id: 1, name: 'Stream', link: `/c/stream/${classid}` },
    { _id: 2, name: 'Classwork', link: `/c/work/${classid}` },
    { _id: 3, name: 'Lectures', link: `/c/lec/${classid}` },
    { _id: 4, name: 'Exams', link: `/c/exam/${classid}` },
    { _id: 5, name: 'Chats', link: `/c/chat/${classid}` },
    { _id: 6, name: 'People', link: `/c/people/${classid}` },
  ];

  return (
    <div className="flex items-center justify-between bg-white shadow p-4 sticky top-0 right-0 z-10 w-full">
      <div className="flex ">
        <button className="mx-2 mr-4 md:mr-10" onClick={toggleBar}>
          <RxHamburgerMenu className="text-2xl" />
        </button>
        <div className="flex items-center space-x-12">
          <img
            className="h-10 w-20 object-cover object-center cursor-pointer"
            src={Logo}
            alt="logo"
            onClick={() => navigate("/")}
          />

          {
            showMenu === true && (
              <ul className="flex justify-around md:justify-start md:space-x-6">
                {
                  navs.map((nav) => (
                    <Link key={nav._id} to={nav.link} onClick={() => setShowPage(nav._id)}>
                      <li
                        key={nav._id}
                        className={`${showPage === nav._id && "border-b-2 border-blue-500"} 
                  min-w-16 cursor-pointer p-2 rounded hover:bg-slate-200 text-gray-600 
                  hover:text-blue-500 font-medium md:text-md`}
                      >
                        {nav.name}
                      </li>

                    </Link>
                  ))
                }
              </ul>
            )
          }
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <GoPlus
          className="p-2 w-10 h-10 text-2xl text-center align-middle rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          title="create or join class"
          onClick={() => setShowJoinClass(true)}
        />
        <div className="w-10 h-10 bg-purple-500 text-white flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => navigate("/settings")}
        >
          A
        </div>
      </div>

      {
        showJoinClass && <JoinClassPopup closePopup={() => setShowJoinClass(false)} />
      }
    </div>
  );
}

export default Navbar;
