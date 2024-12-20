
const People = () => {
    const teachers = [{ name: "Pallavi Mangrulkar" }];
    const students = [
        { name: "Coding Desk" },
        { name: "Sarang Sawant" },
        { name: "Shruti" },
        { name: "Shubham Gavali" },
        { name: "Siddhi Amare" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-4 py-6">
                {/* Teachers Section */}
                <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
                <div className="bg-white shadow-sm rounded-lg">
                    {teachers.map((teacher, index) => (
                        <TeacherCard key={index} teacher={teacher} />
                    ))}
                </div>

                {/* Classmates Section */}
                <div className="mt-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold mb-4">Classmates</h2>
                        <span className="text-gray-500">{students.length} students</span>
                    </div>
                    <div className="bg-white shadow-sm rounded-lg">
                        {students.map((student, index) => (
                            <StudentCard key={index} student={student} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default People;



// TeacherCard Component
const TeacherCard = ({ teacher }) => {
    return (
        <div className="flex items-center space-x-3 p-2 border-b">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-500 text-white font-bold">
                {teacher.name[0]}
            </div>
            <span className="text-gray-700">{teacher.name}</span>
        </div>
    );
};

// StudentCard Component
const StudentCard = ({ student }) => {
    return (
        <div className="flex items-center space-x-3 p-2 border-b">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold">
                {student.name[0]}
            </div>
            <span className="text-gray-700">{student.name}</span>
        </div>
    );
};
