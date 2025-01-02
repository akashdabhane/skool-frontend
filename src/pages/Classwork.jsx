import React, { useEffect, useState } from "react";
import ClassworkCard from "../components/ClassworkCard";
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
    <div className="flex-1  ">
      <Navbar showMenu={true} />
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="p-6 pt-4 w-full">

          <div className="h-screen bg-gray-100">
            <div className="p-6">
              <div className="mb-6 flex justify-between items-center ">
                <select className="border-gray-300 rounded-md shadow-sm px-4 py-2 min-w-44">
                  <option>All topics</option>
                </select>
                <button className="text-blue-600 font-medium">View your work</button>
              </div>

              <div className="space-y-4">
                <h2>Assignments</h2>
                {
                  assignments.map((item, index) => {
                    const date = new Date(item.createdAt);

                    return (
                      <ClassworkCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        date={date.toDateString()}
                      />
                    )
                  })
                }

                <h2>Materials</h2>
                {
                  materials.map((item, index) => {
                    const date = new Date(item.createdAt);

                    return (
                      <ClassworkCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        date={date.toDateString()}
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Classwork;
