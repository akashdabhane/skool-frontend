import React from 'react';
import { FaChalkboardTeacher, FaVideo, FaComments, FaRobot } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../images/logo.png";

const Home = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: FaChalkboardTeacher,
            title: 'Google Classroom',
            description: 'Access and manage classroom materials with ease.',
        },
        {
            icon: FaVideo,
            title: 'Google Meet',
            description: 'Join and conduct virtual meetings effortlessly.',
        },
        {
            icon: FaComments,
            title: 'Chat Support',
            description: 'Collaborate with teachers and peers in real-time.',
        },
        {
            icon: FaRobot,
            title: 'AI Learning Analytics',
            description: 'Track your progress with AI-driven insights.',
        },
    ];

    const handleGetStartedClick = () => {
        // if logged in then navigate to the classrooms page otherwise navigate to login page
        navigate('/login');
        navigate('/c');
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
                <img
                    src={Logo}
                    alt='skool logo'
                    className="w-16" />
                <ul className="flex gap-6">
                    <li><Link to="#" className="text-gray-700 hover:text-blue-500">Home</Link></li>
                    <li><Link to="#" className="text-gray-700 hover:text-blue-500">About</Link></li>
                    <li><Link to="#" className="text-gray-700 hover:text-blue-500">Contact</Link></li>
                </ul>
                <Link to="/login">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="bg-blue-500 text-white py-16 px-8 text-center">
                <h2 className="text-4xl font-bold mb-4">Welcome to EduConnect</h2>
                <p className="text-lg mb-6">A seamless platform for learning, collaboration, and growth.</p>
                <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded hover:bg-gray-100"
                    onClick={handleGetStartedClick}>Get Started</button>
            </header>

            {/* Features Section */}
            <section className="py-16 px-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Our Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-6 text-center">
                <p>&copy; 2024 EduConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;


const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
        <div className="text-blue-500 text-4xl mb-4">
            <Icon />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);