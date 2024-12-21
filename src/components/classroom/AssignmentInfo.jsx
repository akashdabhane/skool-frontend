import React from 'react';
import { GoPlus } from "react-icons/go";
import ClassComment from './ClassComment';

const AssignmentInfo = ({ title, dueDate, description, points, files, status }) => {
    return (
        <div className='flex justify-center my-4 space-x-16'>
            <div className="flex flex-col bg-white p-6 w-full min-w-2xl max-w-4xl">
                <div className="border-b space-y-2 pb-2">
                    <h2 className="text-lg font-semibold text-gray-800 ">{title}</h2>
                    <p className="text-sm text-gray-500">Due by: {dueDate}</p>
                    <p className="text-sm font-medium text-gray-600">{points ? points : ""}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-2">Files:</h3>
                    <ul>
                        {
                            files.map((file, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-blue-600 underline cursor-pointer mb-1"
                                >
                                    {file.name} ({file.type})
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <ClassComment />
            </div>
            {
                !status && (
                    <AssignmentSubmitCard status={status} />
                )
            }
        </div>
    );
};

export default AssignmentInfo;


const AssignmentSubmitCard = ({ status }) => {
    return (
        <div className="py-10 p-4 rounded-lg bg-white shadow-lg max-h-60 space-y-2 w-80">
            <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Your Work</h4>
                <p className="text-sm text-gray-500 mb-2">{status}</p>
            </div>
            <button className='hover:bg-blue-50 flex justify-center items-center p-2 border rounded w-full space-x-1'>
                <GoPlus />
                <span>Add or create</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg w-full">
                Mark as Done
            </button>
        </div>
    )
}
