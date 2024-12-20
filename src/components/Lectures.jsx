// Main Lectures Page
import React from 'react';
import LectureCard from './LectureCard'; // Component for individual lecture cards

const Lectures = () => {
  const lectures = [
    {
      title: 'Data Structures and Algorithms',
      time: '10:00 AM - 11:30 AM',
      status: 'Ongoing', // Status can be "Scheduled" or "Ongoing"
      link: 'https://example.com/lecture1',
    },
    {
      title: 'Operating Systems',
      time: '1:00 PM - 2:30 PM',
      status: 'Scheduled',
      link: 'https://example.com/lecture2',
    },
    {
      title: 'Database Systems',
      time: '3:00 PM - 4:30 PM',
      status: 'Scheduled',
      link: 'https://example.com/lecture3',
    },
    {
      title: 'Machine Learning',
      time: '4:00 PM - 5:30 PM',
      status: 'Completed',
      attendded: true,
      link: 'https://example.com/lecture4',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Page Content */}
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Lectures</h1>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lectures.map((lecture, index) => (
            <LectureCard key={index} lecture={lecture} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lectures;