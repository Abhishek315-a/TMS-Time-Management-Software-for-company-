import React from "react";
import{FaRegStickyNote} from "react-icons/fa";
import {
  FiCalendar,
  FiList,
  FiUserX,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Dashboard</h2>
      <div className="row">
        {/* My Schedule */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/schedulepage")}
            style={{ cursor: "pointer" }}
          >
            <FiCalendar className="mb-2 text-primary" size={32} />
            <h5>My Schedule</h5>
            <p>See your upcoming meetings and availability</p>
          </div>
        </div>

        {/* My Tasks */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/tasks")}
            style={{ cursor: "pointer" }}
          >
            <FiList className="mb-2 text-success" size={32} />
            <h5>My Tasks</h5>
            <p>Track and update your assigned tasks</p>
          </div>
        </div>

        {/* Save a Note Card */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/savenote")}
            style={{ cursor: "pointer" }}
          >
            <div className="flex justify-center mb-3 text-indigo-600">
              <FaRegStickyNote size={36} />
            </div>
            <h5>Save a Note</h5>
            <p>Create, edit, and manage your personal notes easily</p>
          </div>
        </div>

        {/* Apply Leave */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/leave")}
            style={{ cursor: "pointer" }}
          >
            <FiUserX className="mb-2 text-warning" size={32} />
            <h5>Apply Leave</h5>
            <p>Submit your leave request with just a few clicks</p>
          </div>
        </div>

        {/* My Reports */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/employee-report")}
            style={{ cursor: "pointer" }}
          >
            <FiBarChart2 className="mb-2 text-info" size={32} />
            <h5>My Reports</h5>
            <p>Check your performance and attendance stats</p>
          </div>
        </div>

        {/* My Profile */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <FiUser className="mb-2 text-secondary" size={32} />
            <h5>My Profile</h5>
            <p>View and update your profile details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
