import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../contexts/AuthContext";

const ExamDetails = () => {
    const { examid } = useParams();
    const { loggedInUser } = useAuth();
    const [exam, setExam] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [attempt, setAttempt] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [selectedAttempt, setSelectedAttempt] = useState(null);
    const [gradeScores, setGradeScores] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    const [proctorSession, setProctorSession] = useState(null);
    const [proctorFlags, setProctorFlags] = useState([]);
    const [terminationNotice, setTerminationNotice] = useState("");
    const lastFlagAtRef = useRef(0);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGrading, setIsGrading] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState("");
    const [remainingSeconds, setRemainingSeconds] = useState(null);

    useEffect(() => {
        if (!examid) return;

        setIsLoading(true);
        axios.get(`${baseUrl}exams/${examid}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setExam(response.data.data.exam);
                setQuestions(response.data.data.questions || []);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load exam");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [examid]);

    useEffect(() => {
        if (!examid || !loggedInUser?.isTeacher) return;

        axios.get(`${baseUrl}exams/${examid}/proctor/flags`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setProctorFlags(response.data.data || []);
            })
            .catch(() => {});
    }, [examid, loggedInUser?.isTeacher]);

    useEffect(() => {
        if (!examid) return;

        axios.get(`${baseUrl}exams/${examid}/my-attempt`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                if (response.data.data) {
                    setAttempt(response.data.data);
                    setAnswers(response.data.data.answers || {});
                }
            })
            .catch(() => {});
    }, [examid]);

    useEffect(() => {
        if (!exam?.proctoringEnabled || !attempt || attempt.status !== "in-progress") return;

        axios.post(`${baseUrl}exams/${examid}/proctor/start`,
            {},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setProctorSession(response.data.data);
            })
            .catch(() => {});
    }, [exam, attempt, examid]);

    useEffect(() => {
        if (!examid || !loggedInUser?.isTeacher) return;

        axios.get(`${baseUrl}exams/${examid}/attempts`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setAttempts(response.data.data || []);
            })
            .catch(() => {});
    }, [examid, loggedInUser?.isTeacher]);

    useEffect(() => {
        if (!examid) return;

        axios.get(`${baseUrl}exams/${examid}/leaderboard`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setLeaderboard(response.data.data || []);
            })
            .catch(() => {});
    }, [examid, attempt?.status, loggedInUser?.isTeacher]);

    useEffect(() => {
        if (!attempt || attempt.status !== "in-progress") return;

        const timer = setTimeout(() => {
            axios.patch(`${baseUrl}exams/${examid}/autosave`,
                { answers },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                })
                .then((response) => {
                    setAttempt(response.data.data);
                    setAutoSaveStatus("Saved");
                })
                .catch(() => {
                    setAutoSaveStatus("Save failed");
                });
        }, 800);

        return () => clearTimeout(timer);
    }, [answers, attempt, examid]);

    useEffect(() => {
        if (!attempt || attempt.status !== "in-progress" || !attempt.endsAt) return;

        const updateRemaining = () => {
            const secondsLeft = Math.max(0, Math.floor((new Date(attempt.endsAt).getTime() - Date.now()) / 1000));
            setRemainingSeconds(secondsLeft);
            if (secondsLeft <= 0 && !isSubmitting) {
                handleSubmitExam(true);
            }
        };

        updateRemaining();
        const timer = setInterval(updateRemaining, 1000);
        return () => clearInterval(timer);
    }, [attempt, isSubmitting]);

    const handleStartExam = () => {
        setError("");
        axios.post(`${baseUrl}exams/${examid}/start`,
            {},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setAttempt(response.data.data);
                if (response.data.data?.answers) {
                    setAnswers(response.data.data.answers);
                }
            })
            .catch((error) => {
                setError(error?.response?.data?.message || "Failed to start exam");
            });
    };

    const sendProctorFlag = (type, severity, metadata) => {
        if (!exam?.proctoringEnabled || !attempt || attempt.status !== "in-progress") return;

        const now = Date.now();
        if (now - lastFlagAtRef.current < 1500) return;
        lastFlagAtRef.current = now;

        axios.post(`${baseUrl}exams/${examid}/proctor/flag`,
            { type, severity, metadata },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                const data = response.data.data;
                if (data?.attempt) {
                    setAttempt(data.attempt);
                    if (data.attempt.terminationReason) {
                        setTerminationNotice(`Exam ended: ${data.attempt.terminationReason}`);
                    }
                }
            })
            .catch(() => {});
    };

    useEffect(() => {
        if (!exam?.proctoringEnabled || !attempt || attempt.status !== "in-progress") return;

        const handleVisibility = () => {
            if (document.hidden) {
                sendProctorFlag("visibility-change", "medium", { state: "hidden" });
            }
        };
        const handleBlur = () => {
            sendProctorFlag("tab-switch", "medium", { event: "blur" });
        };
        const handleCopy = () => {
            sendProctorFlag("copy-paste", "medium", { action: "copy" });
        };
        const handlePaste = () => {
            sendProctorFlag("copy-paste", "medium", { action: "paste" });
        };

        document.addEventListener("visibilitychange", handleVisibility);
        window.addEventListener("blur", handleBlur);
        document.addEventListener("copy", handleCopy);
        document.addEventListener("paste", handlePaste);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibility);
            window.removeEventListener("blur", handleBlur);
            document.removeEventListener("copy", handleCopy);
            document.removeEventListener("paste", handlePaste);
        };
    }, [exam, attempt]);

    const handleAnswerChange = (questionId, value) => {
        setAutoSaveStatus("Saving...");
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSubmitExam = (isAutoSubmit = false) => {
        setIsSubmitting(true);
        if (!isAutoSubmit) {
            setError("");
        }

        axios.post(`${baseUrl}exams/${examid}/submit`,
            { answers },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setAttempt(response.data.data);
                setAutoSaveStatus("");
            })
            .catch((error) => {
                if (!isAutoSubmit) {
                    setError(error?.response?.data?.message || "Failed to submit exam");
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleSelectAttempt = (attemptItem) => {
        setSelectedAttempt(attemptItem);
        setGradeScores(attemptItem.subjectiveScores || {});
    };

    const handleGradeAttempt = () => {
        if (!selectedAttempt) return;

        setIsGrading(true);
        axios.patch(`${baseUrl}exams/${examid}/attempts/${selectedAttempt._id}/grade`,
            { scores: gradeScores },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setSelectedAttempt(response.data.data);
                setAttempts((prev) => prev.map((item) => item._id === response.data.data._id ? response.data.data : item));
            })
            .catch((error) => {
                setError(error?.response?.data?.message || "Failed to grade attempt");
            })
            .finally(() => {
                setIsGrading(false);
            });
    };

    if (isLoading) {
        return <div className="text-center font-bold text-white text-4xl p-10">Loading...</div>;
    }

    if (!exam) {
        return (
            <div className="flex-1">
                <Navbar showMenu={true} />
                <div className="flex bg-gray-100 dark:bg-gray-800">
                    <Sidebar />
                    <div className="p-3 md:p-8 pt-4 w-full">
                        <p className="text-red-600">Exam not found</p>
                    </div>
                </div>
            </div>
        );
    }

    const isPublished = exam.status === "published";
    const isTeacher = loggedInUser?.isTeacher;
    const hasSubjective = questions.some((question) => question.questionType === "subjective");
    const showTermination = terminationNotice || attempt?.terminationReason;

    return (
        <div className="flex-1">
            <Navbar showMenu={true} />
            <div className="flex bg-gray-100 dark:bg-gray-800">
                <Sidebar />
                <div className="p-3 md:p-8 pt-4 w-full">
                    <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{exam.title}</h1>
                        <p className="text-sm text-gray-500 mt-2">{exam.description || "No description"}</p>
                        <div className="text-sm text-gray-500 mt-2">
                            Duration: {exam.durationMinutes} minutes
                        </div>
                        {exam.proctoringEnabled && (
                            <div className="text-xs text-gray-500 mt-2">Proctoring enabled</div>
                        )}

                        {!isPublished && !isTeacher && (
                            <p className="text-sm text-yellow-600 mt-4">Exam is not published yet.</p>
                        )}

                        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

                        {!isTeacher && isPublished && !attempt && (
                            <button
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleStartExam}
                            >
                            Start exam
                            </button>
                        )}

                        {attempt && (
                            <div className="mt-4 text-sm text-gray-500">Status: {attempt.status}</div>
                        )}
                        {attempt && attempt.status === "submitted" && (
                            <div className="mt-2 text-sm text-green-600">Score: {attempt.score ?? 0}</div>
                        )}
                        {showTermination && (
                            <div className="mt-2 text-sm text-red-600">{showTermination}</div>
                        )}

                        {attempt && attempt.status === "in-progress" && (
                            <div className="mt-2 text-xs text-gray-400">{autoSaveStatus}</div>
                        )}
                        {attempt && attempt.status === "in-progress" && remainingSeconds !== null && (
                            <div className="mt-2 text-sm text-gray-500">Time left: {Math.floor(remainingSeconds / 60)}m {remainingSeconds % 60}s</div>
                        )}
                    </div>

                    {attempt && attempt.status === "in-progress" && (
                        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Questions</h2>
                            <div className="space-y-6 mt-4">
                                {questions.map((question, index) => (
                                    <div key={question._id} className="border-b pb-4">
                                        <p className="text-sm text-gray-500 mb-2">Question {index + 1} • {question.marks} marks</p>
                                        <p className="text-base text-gray-800 dark:text-gray-100 mb-3">{question.question}</p>
                                        {question.questionType === "mcq" ? (
                                            <div className="space-y-2">
                                                {question.options.map((option, optionIndex) => (
                                                    <label key={`${question._id}-option-${optionIndex}`} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                                                        <input
                                                            type="radio"
                                                            name={question._id}
                                                            value={option}
                                                            checked={answers[question._id] === option}
                                                            onChange={(event) => handleAnswerChange(question._id, event.target.value)}
                                                        />
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        ) : (
                                            <textarea
                                                className="w-full border border-gray-300 rounded-md p-2"
                                                rows={4}
                                                value={answers[question._id] || ""}
                                                onChange={(event) => handleAnswerChange(question._id, event.target.value)}
                                                placeholder="Type your answer..."
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                onClick={handleSubmitExam}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : "Submit exam"}
                            </button>
                        </div>
                    )}

                    {attempt && attempt.status === "submitted" && leaderboard.length > 0 && (
                        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Leaderboard</h2>
                            <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-200">
                                {leaderboard.map((item) => (
                                    <div key={item.rank} className="flex items-center justify-between">
                                        <span>#{item.rank} {item.student?.firstname} {item.student?.lastname}</span>
                                        <span>{item.score ?? 0}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isTeacher && questions.length > 0 && !attempt && (
                        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Questions</h2>
                            <div className="space-y-4 mt-3">
                                {questions.map((question, index) => (
                                    <div key={question._id} className="border-b pb-3">
                                        <p className="text-sm text-gray-500">Question {index + 1}</p>
                                        <p className="text-base text-gray-800 dark:text-gray-100">{question.question}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {isTeacher && attempts.length > 0 && (
                        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Submissions</h2>
                            <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-200">
                                {attempts.map((attemptItem) => (
                                    <button
                                        key={attemptItem._id}
                                        className={`w-full text-left p-3 rounded border ${selectedAttempt?._id === attemptItem._id ? "border-blue-500" : "border-transparent"}`}
                                        onClick={() => handleSelectAttempt(attemptItem)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{attemptItem.student?.firstname} {attemptItem.student?.lastname}</span>
                                            <span className="text-sm">{attemptItem.status}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">Score: {attemptItem.score ?? 0}</div>
                                    </button>
                                ))}
                            </div>

                            {selectedAttempt && hasSubjective && (
                                <div className="mt-4 border-t pt-4">
                                    <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-200">Grade subjective answers</h3>
                                    <div className="space-y-4 mt-3">
                                        {questions
                                            .filter((question) => question.questionType === "subjective")
                                            .map((question, index) => (
                                                <div key={question._id} className="border rounded p-3">
                                                    <p className="text-xs text-gray-500">Question {index + 1} • {question.marks} marks</p>
                                                    <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">{question.question}</p>
                                                    <p className="text-xs text-gray-500 mt-2">Answer: {selectedAttempt.answers?.[question._id] || ""}</p>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max={question.marks}
                                                        value={gradeScores[question._id] ?? ""}
                                                        onChange={(event) => setGradeScores((prev) => ({
                                                            ...prev,
                                                            [question._id]: event.target.value,
                                                        }))}
                                                        className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                                        placeholder="Score"
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                    <button
                                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                        onClick={handleGradeAttempt}
                                        disabled={isGrading}
                                    >
                                        {isGrading ? "Saving..." : "Save grades"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {isTeacher && proctorFlags.length > 0 && (
                        <div className="mt-6 bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Proctoring flags</h2>
                            <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-200">
                                {proctorFlags.map((flag) => (
                                    <div key={flag._id} className="flex items-center justify-between border-b pb-2">
                                        <span>{flag.student?.firstname} {flag.student?.lastname} • {flag.type}</span>
                                        <span className="text-xs text-gray-500">{flag.severity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExamDetails;
