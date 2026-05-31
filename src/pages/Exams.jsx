import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../utils/helper";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Exams() {
    const { classid } = useParams();
    const { loggedInUser } = useAuth();
    const [exams, setExams] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [durationMinutes, setDurationMinutes] = useState("");
    const [scheduleStart, setScheduleStart] = useState("");
    const [scheduleEnd, setScheduleEnd] = useState("");
    const [questions, setQuestions] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("mcq");
    const [optionsText, setOptionsText] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [marks, setMarks] = useState("1");
    const [proctoringEnabled, setProctoringEnabled] = useState(false);
    const [autoTerminate, setAutoTerminate] = useState(false);
    const [maxViolations, setMaxViolations] = useState("5");
    const [maxTabSwitches, setMaxTabSwitches] = useState("3");
    const [maxCopyPaste, setMaxCopyPaste] = useState("2");
    const [riskScoreThreshold, setRiskScoreThreshold] = useState("10");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [publishLoading, setPublishLoading] = useState("");
    const [leaderboardByExam, setLeaderboardByExam] = useState({});

    useEffect(() => {
        if (!classid) return;

        axios.get(`${baseUrl}exams/classroom/${classid}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setExams(response.data.data || []);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [classid]);

    useEffect(() => {
        if (!exams.length || loggedInUser?.isTeacher) return;

        const examIds = exams.map((exam) => exam._id);
        examIds.forEach((examId) => {
            axios.get(`${baseUrl}exams/${examId}/leaderboard?limit=3`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                })
                .then((response) => {
                    setLeaderboardByExam((prev) => ({
                        ...prev,
                        [examId]: response.data.data || [],
                    }));
                })
                .catch(() => {});
        });
    }, [exams, loggedInUser?.isTeacher]);

    const handleAddQuestion = () => {
        if (!questionText.trim()) {
            setError("Question text is required");
            return;
        }

        if (questionType === "mcq") {
            const options = optionsText
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            if (options.length < 2) {
                setError("Add at least two options for MCQ");
                return;
            }

            setQuestions((prev) => [
                ...prev,
                {
                    question: questionText.trim(),
                    questionType,
                    options,
                    correctAnswer: correctAnswer.trim(),
                    marks: Number(marks) || 1,
                }
            ]);
        } else {
            setQuestions((prev) => [
                ...prev,
                {
                    question: questionText.trim(),
                    questionType,
                    options: [],
                    correctAnswer: "",
                    marks: Number(marks) || 1,
                }
            ]);
        }

        setQuestionText("");
        setOptionsText("");
        setCorrectAnswer("");
        setMarks("1");
        setError("");
    };

    const handleRemoveQuestion = (index) => {
        setQuestions((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleCreateExam = () => {
        if (!title.trim() || !durationMinutes || !scheduleStart || !scheduleEnd) {
            setError("Title, duration, start, and end are required");
            return;
        }

        const startDate = new Date(scheduleStart);
        const endDate = new Date(scheduleEnd);
        if (startDate >= endDate) {
            setError("End time must be after start time");
            return;
        }

        setIsSubmitting(true);
        setError("");

        axios.post(`${baseUrl}exams/create`,
            {
                classroom: classid,
                title: title.trim(),
                description: description.trim(),
                durationMinutes: Number(durationMinutes),
                scheduleStart,
                scheduleEnd,
                questions,
                proctoringEnabled,
                autoTerminate,
                maxViolations: Number(maxViolations),
                maxTabSwitches: Number(maxTabSwitches),
                maxCopyPaste: Number(maxCopyPaste),
                riskScoreThreshold: Number(riskScoreThreshold),
            },
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setExams((prev) => [response.data.data.exam, ...prev]);
                setTitle("");
                setDescription("");
                setDurationMinutes("");
                setScheduleStart("");
                setScheduleEnd("");
                setQuestions([]);
                setProctoringEnabled(false);
                setAutoTerminate(false);
                setMaxViolations("5");
                setMaxTabSwitches("3");
                setMaxCopyPaste("2");
                setRiskScoreThreshold("10");
            })
            .catch((error) => {
                setError(error?.response?.data?.message || "Failed to create exam");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handlePublishExam = (examId) => {
        setPublishLoading(examId);
        axios.patch(`${baseUrl}exams/publish/${examId}`,
            {},
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${Cookies.get("accessToken")}`,
                },
            })
            .then((response) => {
                setExams((prev) => prev.map((item) => item._id === examId ? response.data.data : item));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setPublishLoading("");
            });
    };

    return (
        <div className="flex-1">
            <Navbar showMenu={true} />
            <div className="flex bg-gray-100 dark:bg-gray-800">
                <Sidebar />
                <div className="p-3 md:p-8 pt-4 w-full">
                    {loggedInUser?.isTeacher && (
                        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Create exam</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    placeholder="Duration (minutes)"
                                    value={durationMinutes}
                                    onChange={(event) => setDurationMinutes(event.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="datetime-local"
                                    value={scheduleStart}
                                    onChange={(event) => setScheduleStart(event.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="datetime-local"
                                    value={scheduleEnd}
                                    onChange={(event) => setScheduleEnd(event.target.value)}
                                    className="p-2 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="text"
                                    placeholder="Description (optional)"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    className="p-2 border border-gray-300 rounded-md md:col-span-2"
                                />
                            </div>

                            <div className="mt-4 border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-200">Add questions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Question"
                                        value={questionText}
                                        onChange={(event) => setQuestionText(event.target.value)}
                                        className="p-2 border border-gray-300 rounded-md md:col-span-2"
                                    />
                                    <select
                                        value={questionType}
                                        onChange={(event) => setQuestionType(event.target.value)}
                                        className="p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="mcq">MCQ</option>
                                        <option value="subjective">Subjective</option>
                                    </select>
                                    <input
                                        type="number"
                                        placeholder="Marks"
                                        value={marks}
                                        onChange={(event) => setMarks(event.target.value)}
                                        className="p-2 border border-gray-300 rounded-md"
                                    />
                                    {questionType === "mcq" && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Options (comma separated)"
                                                value={optionsText}
                                                onChange={(event) => setOptionsText(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md md:col-span-2"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Correct answer"
                                                value={correctAnswer}
                                                onChange={(event) => setCorrectAnswer(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md md:col-span-2"
                                            />
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <button
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                        onClick={handleAddQuestion}
                                    >
                                        Add question
                                    </button>
                                    <span className="text-sm text-gray-500">{questions.length} added</span>
                                </div>
                                {questions.length > 0 && (
                                    <ul className="mt-4 space-y-2">
                                        {questions.map((question, index) => (
                                            <li key={`${question.question}-${index}`} className="flex items-center justify-between text-sm text-gray-600">
                                                <span>{question.question}</span>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleRemoveQuestion(index)}
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mt-4 border-t pt-4">
                                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-200">Proctoring policy</h4>
                                <div className="mt-2 space-y-3">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
                                        <input
                                            type="checkbox"
                                            checked={proctoringEnabled}
                                            onChange={(event) => setProctoringEnabled(event.target.checked)}
                                        />
                                        Enable proctoring
                                    </label>
                                    {proctoringEnabled && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-200">
                                                <input
                                                    type="checkbox"
                                                    checked={autoTerminate}
                                                    onChange={(event) => setAutoTerminate(event.target.checked)}
                                                />
                                                Auto terminate on violations
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Max violations"
                                                value={maxViolations}
                                                onChange={(event) => setMaxViolations(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Max tab switches"
                                                value={maxTabSwitches}
                                                onChange={(event) => setMaxTabSwitches(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Max copy/paste"
                                                value={maxCopyPaste}
                                                onChange={(event) => setMaxCopyPaste(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Risk score threshold"
                                                value={riskScoreThreshold}
                                                onChange={(event) => setRiskScoreThreshold(event.target.value)}
                                                className="p-2 border border-gray-300 rounded-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                            <button
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                onClick={handleCreateExam}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating..." : "Create exam"}
                            </button>
                        </div>
                    )}

                    {exams.length > 0 ? (
                        <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
                            <div className="">
                                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Exams</h1>
                                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {exams.map((exam) => (
                                        <ExamCard
                                            key={exam._id}
                                            exam={exam}
                                            isTeacher={loggedInUser?.isTeacher}
                                            onPublish={handlePublishExam}
                                            publishLoading={publishLoading}
                                            leaderboard={leaderboardByExam[exam._id] || []}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NoExamAvailable />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Exams;

function NoExamAvailable() {
    return (
        <div className="flex items-center justify-center h-80 bg-gray-100 dark:bg-gray-800">
            <div className="text-center">
                <h1 className="text-xl font-semibold text-gray-500">No Exams Available</h1>
            </div>
        </div>
    );
}

const getStatusLabel = (exam) => {
    if (exam.status === "draft") return "Draft";
    const now = new Date();
    const start = new Date(exam.scheduleStart);
    const end = new Date(exam.scheduleEnd);
    if (now >= start && now <= end) return "Ongoing";
    if (now < start) return "Scheduled";
    return "Completed";
};

const getTimeLabel = (exam) => {
    const start = exam.scheduleStart ? new Date(exam.scheduleStart) : null;
    const end = exam.scheduleEnd ? new Date(exam.scheduleEnd) : null;
    if (!start || !end) return "";
    return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
};

const ExamCard = ({ exam, isTeacher, onPublish, publishLoading, leaderboard }) => {
    const statusLabel = getStatusLabel(exam);

    return (
        <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{exam.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{getTimeLabel(exam)}</p>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                ${statusLabel === "Ongoing" && "bg-green-100 text-green-700"} 
                ${statusLabel === "Scheduled" && "bg-blue-100 text-blue-700"} 
                ${statusLabel === "Completed" && "bg-gray-100 text-gray-700"}
                ${statusLabel === "Draft" && "bg-yellow-100 text-yellow-700"}`
            }>
                {statusLabel}
            </span>
            <div className="mt-4 flex flex-wrap gap-2">
                <Link
                    to={`/c/exam/details/${exam._id}`}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    View
                </Link>
                {isTeacher && exam.status === "draft" && (
                    <button
                        className="text-sm font-semibold text-green-600 hover:underline"
                        onClick={() => onPublish(exam._id)}
                        disabled={publishLoading === exam._id}
                    >
                        {publishLoading === exam._id ? "Publishing..." : "Publish"}
                    </button>
                )}
            </div>
            {!isTeacher && leaderboard.length > 0 && (
                <div className="mt-4 text-xs text-gray-500">
                    <div className="font-semibold text-gray-600">Top scores</div>
                    {leaderboard.map((item) => (
                        <div key={`${exam._id}-${item.rank}`} className="flex items-center justify-between">
                            <span>#{item.rank} {item.student?.firstname}</span>
                            <span>{item.score ?? 0}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};