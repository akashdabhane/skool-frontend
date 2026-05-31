import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { baseUrl } from "../utils/helper";
import { useAuth } from "../contexts/AuthContext";

const Analytics = () => {
    const { classid } = useParams();
    const { loggedInUser } = useAuth();
    const [metrics, setMetrics] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!classid) return;

        const token = Cookies.get("accessToken");
        if (!token) return;

        const endpoint = loggedInUser?.isTeacher
            ? `${baseUrl}analytics/teacher/${classid}`
            : `${baseUrl}analytics/student/${classid}`;

        axios.get(endpoint, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setMetrics(response.data.data);
            })
            .catch((error) => {
                setError(error?.response?.data?.message || "Failed to load analytics");
            });
    }, [classid, loggedInUser?.isTeacher]);

    return (
        <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-800">
            <Navbar showMenu={true} />
            <div className="flex h-screen">
                <Sidebar />
                <div className="p-3 md:p-8 w-full">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Analytics</h1>
                        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                        {!metrics && !error && (
                            <p className="text-sm text-gray-500 mt-3">Loading analytics...</p>
                        )}
                    </div>

                    {metrics && (
                        <div className="mt-6 space-y-6">
                            {loggedInUser?.isTeacher ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <MetricCard label="Students" value={metrics.totalStudents ?? "-"} />
                                        <MetricCard label="Assignments" value={metrics.totalAssignments ?? "-"} />
                                        <MetricCard label="Submissions" value={metrics.totalSubmissions ?? "-"} />
                                        <MetricCard
                                            label="Average grade"
                                            value={metrics.averageGrade !== null && metrics.averageGrade !== undefined
                                                ? metrics.averageGrade.toFixed(2)
                                                : "-"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <MetricCard label="Lectures" value={metrics.totalLectures ?? "-"} />
                                        <MetricCard
                                            label="Avg attendance (sec)"
                                            value={metrics.averageAttendanceDuration ?? "-"}
                                        />
                                        <MetricCard label="Exams" value={metrics.totalExams ?? "-"} />
                                        <MetricCard label="Exam attempts" value={metrics.totalExamAttempts ?? "-"} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <MetricCard label="Assignments" value={metrics.totalAssignments ?? "-"} />
                                        <MetricCard label="Submissions" value={metrics.totalSubmissions ?? "-"} />
                                        <MetricCard
                                            label="Average grade"
                                            value={metrics.averageGrade !== null && metrics.averageGrade !== undefined
                                                ? metrics.averageGrade.toFixed(2)
                                                : "-"}
                                        />
                                        <MetricCard
                                            label="Attendance sessions"
                                            value={metrics.totalAttendanceSessions ?? "-"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <MetricCard label="Lectures" value={metrics.totalLectures ?? "-"} />
                                        <MetricCard
                                            label="Avg attendance (sec)"
                                            value={metrics.averageAttendanceDuration ?? "-"}
                                        />
                                        <MetricCard label="Exams" value={metrics.totalExams ?? "-"} />
                                        <MetricCard label="Exam attempts" value={metrics.totalExamAttempts ?? "-"} />
                                    </div>
                                </>
                            )}

                            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
                                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Exam performance</h2>
                                <p className="text-sm text-gray-500 mt-2">
                                    Average score: {metrics.averageExamScore !== null && metrics.averageExamScore !== undefined
                                        ? metrics.averageExamScore.toFixed(2)
                                        : "-"}
                                </p>
                                <ProgressBar
                                    value={metrics.averageExamScore || 0}
                                    maxValue={100}
                                    label="Average exam score"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ label, value }) => (
    <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
        <p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-2">{value}</p>
    </div>
);

const ProgressBar = ({ value, maxValue, label }) => {
    const percent = maxValue ? Math.min(100, Math.round((value / maxValue) * 100)) : 0;
    return (
        <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-300">
                <span>{label}</span>
                <span>{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    );
};

export default Analytics;
