// Dashboard.jsx
import { FaRegStickyNote } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import {
  FiPlusCircle,
  FiCalendar,
  FiUserCheck,
  FiClipboard,
  FiBarChart2,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const dummyStats = [
    { label: "Meetings This Week", value: 8 },
    { label: "Projects Active", value: 3 },
    { label: "Total Meeting Hours", value: "12h" },
    { label: "Team Man-hours", value: "48h" },
  ];
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Manager's Dashboard</h2>
      <div className="row">
        {/* Merged Appointment Card */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/appointments")}
            style={{ cursor: "pointer" }}
          >
            <div className="flex justify-center gap-4 mb-3 text-blue-600">
              <FiPlusCircle size={32} />
              <FiCalendar size={32} />
            </div>
            <h5>Meetings</h5>
            <p>Add/View new meetings schedule in one place</p>
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

        {/* Mark Leave */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => {
              navigate("/leave");
            }}
            style={{ cursor: "pointer" }}
          >
            <FiUserCheck size={40} className="mb-2 text-warning" />
            <h5>Mark Leave</h5>
            <p>Indicate periods when you’ll be unavailable</p>
          </div>
        </div>

        {/* Manage Tasks */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/manager-tasks")}
            style={{ cursor: "pointer" }}
          >
            <FiClipboard size={40} className="mb-2 text-info" />
            <h5>Manage Tasks</h5>
            <p>Track, create, and complete your task list</p>
          </div>
        </div>

        {/* View Reports */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/reports")}
            style={{ cursor: "pointer" }}
          >
            <FiBarChart2 size={40} className="mb-2 text-danger" />
            <h5>Reports</h5>
            <p>Analyze time spent on meetings & projects</p>
          </div>
        </div>

        {/* My Profile (optional) */}
        <div className="col-md-4 mb-3">
          <div
            className="card text-center p-4 shadow-sm"
            onClick={() => navigate("/profile")}
            style={{ cursor: "pointer" }}
          >
            <FiUser size={40} className="mb-2 text-secondary" />
            <h5>My Profile</h5>
            <p>View and update your account details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
