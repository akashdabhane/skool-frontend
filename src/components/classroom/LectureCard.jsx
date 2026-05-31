import { Link } from "react-router-dom";

// LectureCard Component
const LectureCard = ({ lecture }) => {
    const start = lecture.scheduleStart ? new Date(lecture.scheduleStart) : null;
    const end = lecture.scheduleEnd ? new Date(lecture.scheduleEnd) : null;
    const timeLabel = start && end
        ? `${start.toLocaleDateString()} ${start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
        : lecture.time || "";

    return (
        <div
            className={`bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 
                ${lecture.status === 'ongoing' && 'border-l-4 border-green-500'} 
                ${lecture.status === 'scheduled' && 'border-l-4 border-blue-500'} 
                ${lecture.status === 'completed' && 'border-l-4 border-gray-500'}
                ${lecture.status === 'cancelled' && 'border-l-4 border-red-500'}`
            }
        >
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">{lecture.title || lecture.subject}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{timeLabel}</p>
            <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                ${lecture.status === 'ongoing' && 'bg-green-100 text-green-700'} 
                ${lecture.status === "scheduled" && 'bg-blue-100 text-blue-700'} 
                ${lecture.status === "completed" && 'bg-gray-100 text-gray-700'}
                ${lecture.status === "cancelled" && 'bg-red-100 text-red-700'}`
            }>
                {lecture.status}
            </p>
            <Link
                to={`/lec/join/${lecture._id || lecture.id}`}
                rel="noopener noreferrer"
                className="block"
            >
                <button className={`mt-4 text-white p-2 text-sm rounded font-semibold 
                    ${lecture.status === 'ongoing' && "bg-green-500"} 
                    ${lecture.status === 'scheduled' && "bg-blue-500"} 
                    ${lecture.status === 'completed' && "bg-gray-500"}
                    ${lecture.status === 'cancelled' && "bg-red-500"} `
                }>
                    {
                        lecture.status === "ongoing"
                            ? "Join Lecture"
                            : lecture.status === "scheduled"
                                ? "Notify"
                                : lecture.status === "cancelled"
                                    ? "Cancelled"
                                    : "View Lecture"
                    }
                </button>
            </Link>
        </div>
    );
};

export default LectureCard;