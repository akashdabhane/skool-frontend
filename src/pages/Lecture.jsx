import React, { useState } from "react";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { LuVideo, LuScreenShare, LuVideoOff } from "react-icons/lu";
import { BsBadgeCc } from "react-icons/bs";
import { MdOutlineEmojiEmotions, MdCallEnd, MdOutlineMessage } from "react-icons/md";
import { FaRegHandPaper } from "react-icons/fa";
import { GoInfo, GoPeople } from "react-icons/go";
import { RiShapesLine } from "react-icons/ri";
import VideoCallRightPanel from "../components/videoCall/VideoCallRightPanel";

const Lecture = () => {
  const [panelNav, setPanelNav] = useState(null);
  const [navObject, setNavObject] = useState({
    isAudioMuted: true,
    isVideoMuted: true,
    isScreenSharing: false,
    isCarbanCopyOn: false,
  })
  console.log(navObject.isAudioMuted)

  const styles = {
    videoChatActions: "p-2 bg-gray-400 rounded-full cursor-pointer",
    videoChatPanelActions: "p-1 hover:bg-gray-600 rounded-full cursor-pointer",
  }

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

        <VideoCallRightPanel panelNav={panelNav} setPanelNav={setPanelNav} />
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-800">
        {/* Left Bottom */}
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
          <p className="text-sm">{new Date().getHours() + ":" + new Date().getMinutes()} | abg-jivj-bpg</p>
        </div>

        {/* Center Button */}
        <div className="space-x-3 flex items-center text-5xl p-2 px-4 rounded-xl bg-gray-600">
          <AiOutlineAudio className={styles.videoChatActions} />
          <LuVideo className={styles.videoChatActions} />
          <BsBadgeCc className={styles.videoChatActions} />
          <MdOutlineEmojiEmotions className={styles.videoChatActions} />
          <LuScreenShare className={styles.videoChatActions} />
          <FaRegHandPaper className={styles.videoChatActions} />
          <MdCallEnd className="p-2 bg-red-500 rounded-full cursor-pointer" />
        </div>

        {/* Right Button */}
        <div className="flex space-x-3 items-center text-3xl p-2">
          <GoInfo className={styles.videoChatPanelActions} onClick={() => panelNav !== 0 ? setPanelNav(0) : setPanelNav(null)} />
          <GoPeople className={styles.videoChatPanelActions} onClick={() => panelNav !== 1 ? setPanelNav(1) : setPanelNav(null)} />
          <MdOutlineMessage className={styles.videoChatPanelActions} onClick={() => panelNav !== 2 ? setPanelNav(2) : setPanelNav(null)} />
          <RiShapesLine className={styles.videoChatPanelActions} onClick={() => panelNav !== 3 ? setPanelNav(3) : setPanelNav(null)} />
        </div>
      </div>
    </div>
  );
};

export default Lecture;
