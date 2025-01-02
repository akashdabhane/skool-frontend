import React, { useState, useEffect } from 'react';
import AssignmentInfo from '../components/classroom/AssignmentInfo';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/helper';
import Cookies from 'js-cookie';


function AssignmentDetails() {
    const [assignment, setAssignment] = useState(null);
    const [assignmentComments, setAssignmentComments] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}assignments/get-assignment/${"assignmentId"}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
            .then(response => {
                console.log(response.data.data);
                setAssignment(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}comments/get-all-comments/${"commentid"}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
            .then(response => {
                console.log(response.data.data);
                setAssignmentComments(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <div className="bg-white h-screen flex items-center ">
            <Sidebar />
            <div className="h-full w-full">
                <Navbar />
                {/* Assignment info */}
                <AssignmentInfo
                    title="Assignment for weak students"
                    dueDate="5 May 2022"
                    description="Those students who got marks less than 10 must solve and submit the assignments in hard copy on or before Monday."
                    points="100 points"
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

export default AssignmentDetails;
