import React, { useEffect, useState } from 'react';
import AssignmentInfo from '../components/classroom/AssignmentInfo';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/helper';
import Cookies from 'js-cookie';


function MaterialDetails() {
    const [material, setMaterial] = useState();
    const [materialComments, setMaterialComments] = useState(null);

    useEffect(() => {
        axios.get(`${baseUrl}materials/get-material/${"materialid"}`,
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get("accessToken")}`
                },
            })
            .then(response => {
                console.log(response.data.data);
                setMaterial(response.data.data);
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
                setMaterialComments(response.data.data);
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
