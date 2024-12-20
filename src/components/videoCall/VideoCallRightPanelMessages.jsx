import React from 'react';
import { IoMdClose } from "react-icons/io";


function VideoCallRightPanelMessages({ closePanelNav }) {
    return (
        <div className="w-full h-full md:w-96 p-4 flex flex-col bg-gray-800">
            <nav className="text-white text-xl">
                <div className="flex items-center justify-between my-2 mb-4">
                    <span>In-call messages</span>
                    <IoMdClose
                        className="cursor-pointer p-1 w-8 h-8 rounded-full hover:bg-gray-700 "
                        onClick={closePanelNav}
                    />
                </div>
            </nav>
        </div>
    )
}

export default VideoCallRightPanelMessages