import React from 'react';
import { IoMdClose } from "react-icons/io";

function VideoCallRightPanelInfo({ closePanelNav, attendanceRecords, attendanceSummary, isTeacher }) {
    return (
        <div className="w-full h-full md:w-96 p-4 flex flex-col bg-gray-800">
            <nav className="text-white text-xl">
                <div className="flex items-center justify-between my-2 mb-4">
                    <span>Meeting details</span>
                    <IoMdClose
                        className="cursor-pointer p-1 w-8 h-8 rounded-full hover:bg-gray-700 "
                        onClick={closePanelNav}
                    />
                </div>
            </nav>
            {isTeacher && (
                <div className="text-sm text-gray-300 space-y-3">
                    <div>
                        <div className="text-xs text-gray-400">Attendance summary</div>
                        <div>Total records: {attendanceSummary?.totalRecords || 0}</div>
                        <div>Students enrolled: {attendanceSummary?.totalStudents || 0}</div>
                        <div>Avg duration: {attendanceSummary?.averageDuration || 0}s</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400">Attendance list</div>
                        <div className="max-h-64 overflow-y-auto space-y-2 mt-2">
                            {(attendanceRecords || []).map((record) => (
                                <div key={record._id} className="flex items-center justify-between text-xs">
                                    <span>{record.student?.firstname} {record.student?.lastname}</span>
                                    <span>{record.durationSeconds || 0}s</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoCallRightPanelInfo