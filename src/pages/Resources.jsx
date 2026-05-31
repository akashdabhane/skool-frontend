import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ClassworkCard from "../components/classroom/ClassworkCard";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../contexts/AuthContext";

function Resources() {
  const { classid } = useParams();
  const { loggedInUser } = useAuth();
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}resources/classroom/${classid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setResources(response.data.data || []);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [classid]);

  const handleCreateResource = () => {
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required");
      return;
    }

    if (!file && !linkUrl.trim()) {
      setError("Add a file or a link");
      return;
    }

    const formData = new FormData();
    formData.append("classroom", classid);
    formData.append("title", title.trim());
    formData.append("description", description.trim());

    if (file) {
      formData.append("file", file);
    }

    if (linkUrl.trim()) {
      formData.append("linkUrl", linkUrl.trim());
    }

    axios.post(`${baseUrl}resources/create`, formData,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      })
      .then((response) => {
        setResources((prev) => [response.data.data, ...prev]);
        setTitle("");
        setDescription("");
        setLinkUrl("");
        setFile(null);
        setError("");
      })
      .catch((error) => {
        setError(error?.response?.data?.message || "Failed to create resource");
      });
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 dark:bg-gray-800">
      <Navbar showMenu={true} />
      <div className="flex">
        <Sidebar />
        <div className="p-3 md:p-8 pt-6 w-full">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Resources</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Classroom resources shared by your teacher.</p>
          </div>

          {loggedInUser?.isTeacher && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-6">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Add Resource</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  type="text"
                  placeholder="Link (optional)"
                  value={linkUrl}
                  onChange={(event) => setLinkUrl(event.target.value)}
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
                onClick={handleCreateResource}
              >
                Add Resource
              </button>
            </div>
          )}

          <div className="space-y-4">
            {resources.length === 0 ? (
              <div className="text-sm text-gray-500">No resources added yet.</div>
            ) : (
              resources.map((resource) => (
                <ClassworkCard
                  key={resource._id}
                  title={resource.title}
                  description={resource.description}
                  date={new Date(resource.createdAt).toDateString()}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
