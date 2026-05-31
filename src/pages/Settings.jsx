import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../utils/helper';
import Cookies from 'js-cookie';
import { useAuth } from "../contexts/AuthContext";


const Settings = () => {
    const navigate = useNavigate();
    const { setLoggedInUser } = useAuth();

    const handleLogoutClick = () => {
        axios.post(`${baseUrl}users/logout`, {},
            {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                }
            })
            .then((response) => {
                console.log(response);
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                setLoggedInUser(null);

                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="flex-1 app-surface">
            <Navbar showMenu={false} />
            <div className="flex h-full app-surface">
                <Sidebar />
                <div className="w-full max-w-4xl mx-auto py-4 px-2 md:px-0 ">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
                    <div className="app-panel p-4 md:p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Account security</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Manage your password and sessions.</p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => navigate('/change-password')}
                                className="px-4 py-2 app-button-primary"
                            >
                                Change password
                            </button>
                            <button
                                onClick={handleLogoutClick}
                                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <ProfileCard />
                    <NotificationCard />
                    <ClassNotifications />
                </div>
            </div>
        </div>
    );
};

export default Settings;


// ProfileCard Component
const ProfileCard = () => {
    return (
        <div className="app-panel p-4 md:p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg">
                    A
                </div>
                <button className="ml-4 app-link">Change</button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Account settings</p>
            <Link
                to="#"
                className="app-link mb-2 block"
            >
                Manage
            </Link>
            <p className="text-gray-700 dark:text-gray-300">Change name</p>
            <Link
                to="#"
                className="app-link"
            >
                To change your name, go to your account settings.
            </Link>
        </div>
    );
};

// NotificationCard Component
const NotificationCard = () => {
    const toggleSwitch = (label) => (
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">{label}</p>
            <input
                type="checkbox"
                className="toggle-checkbox h-5 w-5 text-blue-500"
                defaultChecked
            />
        </div>
    );

    return (
        <div className="app-panel p-4 md:p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <h3 className="text-lg font-medium mb-2">Email</h3>
            {toggleSwitch('Allow email notifications')}

            <h3 className="text-lg font-medium mb-2">Comments</h3>
            {toggleSwitch('Comments on your posts')}
            {toggleSwitch('Comments that mention you')}
            {toggleSwitch('Private comments on work')}

            <h3 className="text-lg font-medium mb-2">Classes that you are enrolled in</h3>
            {toggleSwitch('Work and other posts from teachers')}
            {toggleSwitch('Returned work and marks from your teachers')}
            {toggleSwitch('Invitations to join classes as a student')}
            {toggleSwitch('Due-date reminders for your work')}
        </div>
    );
};

// ClassNotifications Component
const ClassNotifications = () => {
    return (
        <div className="app-panel p-4 md:p-6">
            <h2 className="text-xl font-semibold mb-4">Class Notifications</h2>
            <p className="text-gray-700 dark:text-gray-300">
                These settings apply to both your email and device notifications for
                each class.
            </p>
            <button className="mt-4 app-link">
                Expand settings
            </button>
        </div>
    );
};
