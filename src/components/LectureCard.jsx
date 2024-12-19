// LectureCard Component
const LectureCard = ({ lecture }) => {
    return (
        <div
            className={`bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 ${lecture.status === 'Ongoing' ? 'border-l-4 border-green-500' : 'border-l-4 border-blue-500'
                }`}
        >
            <h2 className="text-lg font-bold text-gray-800">{lecture.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{lecture.time}</p>
            <p
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${lecture.status === 'Ongoing' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}
            >
                {lecture.status}
            </p>
            <a
                href={lecture.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-blue-500 hover:underline text-sm"
            >
                Join Lecture
            </a>
        </div>
    );
};

export default LectureCard;