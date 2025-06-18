import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import ManagerTaskList from "../components/ManagerTaskList"


const ManagerTasks = () => {

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manager Task Dashboard</h2>
      <div className="row g-4">
        {/* Task Form */}
        <div className="col-md-5">
          <TaskForm />
        </div>

        {/* Task List */}
        <div className="col-md-7">
          <ManagerTaskList/>
        </div>
      </div>
    </div>
  );
};

export default ManagerTasks;
