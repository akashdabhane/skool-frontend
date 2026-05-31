import React, { useState, useEffect } from 'react';
import AssignmentInfo from '../components/classroom/AssignmentInfo';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { baseUrl } from '../utils/helper';
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function AssignmentDetails() {
    const [assignment, setAssignment] = useState(null);
    const [assignmentComments, setAssignmentComments] = useState(null);
    const [submission, setSubmission] = useState(null);
    const [submitFile, setSubmitFile] = useState(null);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assignmentStats, setAssignmentStats] = useState(null);
    const { assignmentid } = useParams();
    const { loggedInUser } = useAuth();

    useEffect(() => {
        axios.get(`${baseUrl}assignments/get-assignment/${assignmentid}`,
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
    }, [assignmentid])

    useEffect(() => {
        axios.get(`${baseUrl}comments/get-all-comments/${assignmentid}`,
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
    }, [assignmentid])

    useEffect(() => {
        if (!assignmentid) return;

        axios.get(`${baseUrl}submissions/status/${assignmentid}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
            .then((response) => {
                setSubmission(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [assignmentid])

    useEffect(() => {
        if (!assignmentid || !loggedInUser?.isTeacher) return;

        axios.get(`${baseUrl}assignments/get-assignment-stats/${assignmentid}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
            .then((response) => {
                setAssignmentStats(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [assignmentid, loggedInUser?.isTeacher])

    const handleSubmission = () => {
        if (!submitFile) {
            setSubmitError("Please select a file to submit");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        const formData = new FormData();
        formData.append("assignmentId", assignmentid);
        formData.append("file", submitFile);

        axios.post(`${baseUrl}submissions/create-submission`, formData,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}`,
                },
            })
            .then((response) => {
                setSubmission(response.data.data.submission);
                setSubmitFile(null);
            })
            .catch((error) => {
                setSubmitError(error?.response?.data?.message || "Failed to submit assignment");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const fileList = [];
    if (assignment?.mediaReference?.documentFile?.length) {
        assignment.mediaReference.documentFile.forEach((fileUrl) => {
            const fileName = fileUrl.split("/").pop();
            fileList.push({ name: fileName, url: fileUrl });
        });
    }
    if (assignment?.mediaReference?.link?.length) {
        assignment.mediaReference.link.forEach((linkUrl) => {
            fileList.push({ name: linkUrl, url: linkUrl });
        });
    }

    const isLate = assignment?.dueDate ? new Date() > new Date(assignment.dueDate) : false;
    const submitStatus = submission ? submission.status : "Not submitted";

    return (
        <div className="bg-white h-screen flex items-center ">
            <Sidebar />
            <div className="h-full w-full">
                <Navbar />
                {/* Assignment info */}
                <AssignmentInfo
                    title={assignment?.title || "Assignment"}
                    dueDate={assignment?.dueDate ? new Date(assignment.dueDate).toDateString() : ""}
                    description={assignment?.description || ""}
                    points={assignment?.points ? `${assignment.points} points` : ""}
                    files={fileList}
                    status={loggedInUser?.isTeacher ? "Assigned" : null}
                    submitStatus={submitStatus}
                    submitError={submitError}
                    isLate={Boolean(submission?.isLate) || isLate}
                    isSubmitting={isSubmitting}
                    onFileChange={(event) => {
                        setSubmitFile(event.target.files?.[0] || null);
                        setSubmitError("");
                    }}
                    onSubmit={handleSubmission}
                />
                {loggedInUser?.isTeacher && assignmentStats && (
                    <div className="px-6">
                        <div className="bg-white p-4 rounded-lg shadow-md max-w-4xl">
                            <h3 className="text-sm font-semibold text-gray-700">Assignment stats</h3>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>Total submissions: {assignmentStats.totalSubmissions}</p>
                                <p>Late submissions: {assignmentStats.lateSubmissions}</p>
                                <p>
                                    Average grade: {assignmentStats.averageGrade !== null
                                        ? assignmentStats.averageGrade.toFixed(2)
                                        : "Not graded"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssignmentDetails;
