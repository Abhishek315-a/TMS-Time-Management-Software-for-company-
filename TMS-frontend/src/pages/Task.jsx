import React, { useState } from "react";
import EmployeeTaskList from "../components/EmployeeTaskList";

const Tasks = () => {
 
  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="text-center mb-4">
      </div>
      <EmployeeTaskList/>
    </div>
  );
};

export default Tasks;
