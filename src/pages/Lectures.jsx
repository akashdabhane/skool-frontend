// Main Lectures Page
import React, { useEffect, useState } from 'react';
import LectureCard from '../components/classroom/LectureCard'; // Component for individual lecture cards
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Lectures = () => {
  const { classid } = useParams();
  const { loggedInUser } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [scheduleStart, setScheduleStart] = useState("");
  const [scheduleEnd, setScheduleEnd] = useState("");
  const [duration, setDuration] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceRule, setRecurrenceRule] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!classid) return;

    axios.get(`${baseUrl}lectures/classroom/${classid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setLectures(response.data.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classid]);

  const handleCreateLecture = () => {
    if (!title.trim() || !subject.trim() || !scheduleStart || !scheduleEnd || !duration) {
      setError("Title, subject, start, end, and duration are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    axios.post(`${baseUrl}lectures/create`,
      {
        classroom: classid,
        title: title.trim(),
        subject: subject.trim(),
        topic: topic.trim(),
        scheduleStart,
        scheduleEnd,
        duration,
        isRecurring,
        recurrenceRule: isRecurring ? recurrenceRule.trim() : "",
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setLectures((prev) => [response.data.data, ...prev]);
        setTitle("");
        setSubject("");
        setTopic("");
        setScheduleStart("");
        setScheduleEnd("");
        setDuration("");
        setIsRecurring(false);
        setRecurrenceRule("");
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to schedule lecture");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="flex-1  ">
      <Navbar showMenu={true} />
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        <Sidebar />
        <div className="p-3 md:p-8 pt-4 w-full">

          {loggedInUser?.isTeacher && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Schedule lecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  placeholder="Topic (optional)"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
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
                <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(event) => setIsRecurring(event.target.checked)}
                  />
                  <span>Recurring lecture</span>
                </label>
                {isRecurring && (
                  <input
                    type="text"
                    placeholder="Recurrence rule (e.g., Weekly on Mon)"
                    value={recurrenceRule}
                    onChange={(event) => setRecurrenceRule(event.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                )}
              </div>
              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleCreateLecture}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Scheduling..." : "Schedule lecture"}
              </button>
            </div>
          )}

          {
            lectures.length > 0
              ?
              <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
                {/* Page Content */}
                <div className="">
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Lectures</h1>
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {lectures.map((lecture, index) => (
                      <LectureCard key={index} lecture={lecture} />
                    ))}
                  </div>
                </div>
              </div>
              :
              <NoLectureAvailable />
          }

        </div>
      </div>
    </div>
  );
};

export default Lectures;

function NoLectureAvailable() {

  return (
    <div className="flex items-center justify-center h-80 bg-gray-100 dark:bg-gray-800">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-500">No Lectures Available</h1>
      </div>
    </div>
  )
}