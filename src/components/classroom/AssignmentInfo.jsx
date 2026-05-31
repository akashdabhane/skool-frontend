import React from 'react';
import { GoPlus } from "react-icons/go";
import ClassComment from './ClassComment';

const AssignmentInfo = ({
    title,
    dueDate,
    description,
    points,
    files,
    status,
    submitStatus,
    submitError,
    isLate,
    isSubmitting,
    onFileChange,
    onSubmit,
}) => {
    return (
        <div className='flex justify-center my-4 space-x-16'>
            <div className="flex flex-col bg-white p-6 w-full min-w-2xl max-w-4xl">
                <div className="border-b space-y-2 pb-2">
                    <h2 className="text-lg font-semibold text-gray-800 ">{title}</h2>
                    <p className="text-sm text-gray-500">Due by: {dueDate}</p>
                    <p className="text-sm font-medium text-gray-600">{points ? points : ""}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">{description}</p>
                {files?.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-800 mb-2">Files:</h3>
                        <ul>
                            {files.map((file, index) => (
                                <li key={index} className="text-sm text-blue-600 underline cursor-pointer mb-1">
                                    {file.url ? (
                                        <a href={file.url} target="_blank" rel="noreferrer">
                                            {file.name}
                                        </a>
                                    ) : (
                                        file.name
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <ClassComment />
            </div>
            {
                !status && (
                    <AssignmentSubmitCard
                        status={submitStatus}
                        submitError={submitError}
                        isLate={isLate}
                        isSubmitting={isSubmitting}
                        onFileChange={onFileChange}
                        onSubmit={onSubmit}
                    />
                )
            }
        </div>
    );
};

export default AssignmentInfo;


const AssignmentSubmitCard = ({ status, submitError, isLate, isSubmitting, onFileChange, onSubmit }) => {
    return (
        <div className="py-10 p-4 rounded-lg bg-white shadow-lg max-h-60 space-y-2 w-80">
            <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-800 mb-2">Your Work</h4>
                <p className="text-sm text-gray-500 mb-2">{status}</p>
            </div>
            <label className='hover:bg-blue-50 flex justify-center items-center p-2 border rounded w-full space-x-1 cursor-pointer'>
                <GoPlus />
                <span>Add file</span>
                <input
                    type="file"
                    className="hidden"
                    onChange={onFileChange}
                />
            </label>
            {isLate && (
                <p className="text-xs text-orange-600">Late submission</p>
            )}
            {submitError && (
                <p className="text-xs text-red-600">{submitError}</p>
            )}
            <button
                className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg w-full"
                onClick={onSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </div>
    )
}
