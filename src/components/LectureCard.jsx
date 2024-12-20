import { Link } from "react-router-dom";

// LectureCard Component
const LectureCard = ({ lecture }) => {
    return (
        <div
            className={`bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 ${lecture.status === 'Ongoing' && 'border-l-4 border-green-500'} ${lecture.status === 'Scheduled' && 'border-l-4 border-blue-500'} ${lecture.status === 'Completed' && 'border-l-4 border-gray-500'}`}
        >
            <h2 className="text-lg font-bold text-gray-800">{lecture.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{lecture.time}</p>
            <p className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${lecture.status === 'Ongoing' && 'bg-green-100 text-green-700'} ${lecture.status === "Scheduled" && 'bg-blue-100 text-blue-700'} ${lecture.status === "Completed" && 'bg-blue-100 text-gray-700'}`}>
                {lecture.status}
            </p>
            <Link
                to={lecture.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <button className={`${lecture.status === 'Ongoing' && "bg-green-500"} ${lecture.status === 'Scheduled' && "bg-blue-500"} ${lecture.status === 'Completed' && "bg-gray-500"} mt-4 text-white p-2 hover:underline text-sm rounded`}>
                    {
                        lecture.status === "Ongoing"
                            ? "Join Lecture"
                            : lecture.status === "Scheduled"
                                ? "Notify"
                                : "View Lecture"
                    }
                </button>
            </Link>
        </div>
    );
};

export default LectureCard;