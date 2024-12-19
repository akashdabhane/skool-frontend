import React from "react";
import Navbar from "../components/Navbar";
import ClassworkCard from "../components/ClassworkCard";

function Classwork() {
  const classworkItems = [
    { title: "Unit Test- 2 Result", description: "Unit Test- 2 Result", date: "27 Jun 2022" },
    { title: "MongoDB Sharding", description: "MongoDB Sharding", date: "9 Jun 2022" },
    { title: "Unit 5-Distributed Databases", description: "Unit 5-Distributed Databases", date: "5 Jun 2022" },
  ];

  return (
    <div className="h-screen bg-gray-100">
      {/* <Navbar title="Classroom > SYSS-Next Generation Databases-CO19311" /> */}

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Classwork</h1>
          <button className="text-blue-600 font-medium">View your work</button>
        </div>

        <div className="mb-6">
          <select className="border-gray-300 rounded-md shadow-sm px-4 py-2">
            <option>All topics</option>
          </select>
        </div>

        <div className="space-y-4">
          {classworkItems.map((item, index) => (
            <ClassworkCard
              key={index}
              title={item.title}
              description={item.description}
              date={item.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classwork;
