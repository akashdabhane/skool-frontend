import React, { useEffect, useState } from "react";
import ClassworkCard from "../components/classroom/ClassworkCard";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from 'js-cookie';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


function Classwork() {
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { classid } = useParams();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    axios.get(`${baseUrl}assignments/get-all-assignments/${classid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data)
        setAssignments(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })


    axios.get(`${baseUrl}materials/get-all-materials/${classid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setMaterials(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const handleCreateAssignment = () => {
    if (!title.trim() || !description.trim() || !dueDate) {
      setError("Title, description, and due date are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("dueDate", dueDate);
    formData.append("classroom", classid);

    if (points) {
      formData.append("points", points);
    }

    if (link.trim()) {
      formData.append("link", link.trim());
    }

    if (file) {
      formData.append("file", file);
    }

    axios.post(`${baseUrl}assignments/create-assignment`, formData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setAssignments((prev) => [response.data.data, ...prev]);
        setTitle("");
        setDescription("");
        setDueDate("");
        setPoints("");
        setLink("");
        setFile(null);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to create assignment");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const classworkItems = [
    { title: "Unit Test- 2 Result", description: "Unit Test- 2 Result", date: "27 Jun 2022" },
    { title: "MongoDB Sharding", description: "MongoDB Sharding", date: "9 Jun 2022" },
    { title: "Unit 5-Distributed Databases", description: "Unit 5-Distributed Databases", date: "5 Jun 2022" },
  ];

  return (
    <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-800">
      {/* Navbar */}
      <Navbar showMenu={true} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="p-3 md:p-8 pt-6 w-full">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filter */}
            <select className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 rounded-lg shadow-sm px-4 py-2 min-w-44 focus:outline-none focus:ring-2 transition">
              <option>All topics</option>
            </select>

            {/* View Work Button */}
            <button className="text-blue-600 font-medium hover:underline">
              View your work →
            </button>
          </div>

          {/* Assignments */}
          <div className="space-y-6">
            {loggedInUser?.isTeacher && (
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Create assignment</h3>
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
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="number"
                    placeholder="Points"
                    value={points}
                    onChange={(event) => setPoints(event.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Link (optional)"
                    value={link}
                    onChange={(event) => setLink(event.target.value)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                  <input
                    type="file"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                    className="p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleCreateAssignment}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create assignment"}
                </button>
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400 border-b pb-2 mb-4">📚 Assignments</h2>
              <div className="space-y-4">
                {assignments.map((item, index) => {
                  const date = new Date(item.createdAt);
                  return (
                    <ClassworkCard
                      key={index}
                      title={item.title}
                      description={item.description}
                      date={date.toDateString()}
                      to={`/c/a/${item._id}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-400 border-b pb-2 mb-4">📂 Materials</h2>
              <div className="space-y-4">
                {materials.map((item, index) => {
                  const date = new Date(item.createdAt);
                  return (
                    <ClassworkCard
                      key={index}
                      title={item.title}
                      description={item.description}
                      date={date.toDateString()}
                      to={`/c/m/${item._id}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Classwork;
