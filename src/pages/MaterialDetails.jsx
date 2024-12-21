import React from 'react';
import AssignmentInfo from '../components/classroom/AssignmentInfo';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

function MaterialDetails() {
    return (
        <div className="bg-white h-screen flex items-center ">
            <Sidebar />
            <div className="h-full w-full">
                <Navbar />
                {/* Assignment info */}
                <AssignmentInfo
                    title="Material for students"
                    dueDate="10 dec 2024"
                    description="Those students who got marks less than 10 must solve and submit the assignments in hard copy on or before Monday."
                    files={[
                        { name: 'OS-test1.docx', type: 'Word' },
                        { name: 'ospaper.docx', type: 'Word' },
                    ]}
                    status="Assigned"
                />
            </div>
        </div>
    );
}

export default MaterialDetails;
