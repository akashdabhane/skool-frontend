import React from 'react';
import { GoPeople } from "react-icons/go";
import { BiSend } from "react-icons/bi";


function ClassComment() {
    return (
        <div className="space-y-2 border-t pt-2">
            <p className='flex items-center space-x-1 font-semibold'>
                <GoPeople className='text-xl' />
                <span>Class comments</span>
            </p>
            <div className="flex items-center space-x-2 ">
                <p className='w-8 h-8 text-center rounded-full bg-purple-500'>
                    A
                </p>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    className="border-b border-gray-300 w-full p-1 px-3 rounded-full outline-0"
                    name='comment'
                    id='comment'
                />
                <BiSend className='text-4xl cursor-pointer hover:bg-gray-100 rounded-full p-1' />
            </div>
        </div>
    )
}

export default ClassComment