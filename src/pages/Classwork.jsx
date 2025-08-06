import React, { useEffect, useState } from "react";
import ClassworkCard from "../components/classroom/ClassworkCard";
import axios from "axios";
import { baseUrl } from "../utils/helper";
import Cookies from 'js-cookie';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";


function Classwork() {
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const { classid } = useParams();

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
