import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-2 gap-10 p-20">
      <div className="h-60 col-span-2 rounded-lg bg-blue-500 flex items-center justify-center">
        <ul className="text-white text-2xl p-4">
          <li># of Active Devices</li>
        </ul>
      </div>
      <div className="col-span-2 col-start-3 rounded-lg bg-green-500 flex items-center justify-center">
        <span className="text-white text-2xl">Threats</span>
      </div>
      <div className="col-span-2 col-start-5 rounded-lg bg-yellow-500 flex items-center justify-center">
        <span className="text-white text-2xl">Unresolved</span>
      </div>
      <div className="col-span-3 row-start-2 rounded-lg bg-red-500 flex items-center justify-center">
        <span className="text-white text-2xl">4</span>
      </div>
      <div className="col-span-3 col-start-4 row-start-2 rounded-lg bg-purple-500 flex items-center justify-center">
        <span className="text-white text-2xl">5</span>
      </div>
    </div>
  );
};

export default Dashboard;
