import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <div className="w-full">
                <Navbar title={"Skool > Settings"} />
                <div className="max-w-4xl mx-auto py-4">
                    <h1 className="text-3xl font-bold mb-6">Settings</h1>
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-lg">
                    A
                </div>
                <button className="ml-4 text-blue-500 hover:underline">Change</button>
            </div>
            <p className="text-gray-700 mb-2">Account settings</p>
            <Link
                to="#"
                className="text-blue-500 hover:underline mb-2 block"
            >
                Manage
            </Link>
            <p className="text-gray-700">Change name</p>
            <Link
                to="#"
                className="text-blue-500 hover:underline"
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
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
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
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Class Notifications</h2>
            <p className="text-gray-700">
                These settings apply to both your email and device notifications for
                each class.
            </p>
            <button className="mt-4 text-blue-500 hover:underline">
                Expand settings
            </button>
        </div>
    );
};
