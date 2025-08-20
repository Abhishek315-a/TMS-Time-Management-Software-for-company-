import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../utility/constant";


const ManagerTaskList = ({ onDelete }) => {
  const [tasks, setTasks] = useState([]);
  const userEmail = localStorage.getItem("email"); 

  useEffect(() => {
    const fetchTasks = async () => {
      if (!userEmail) return;

      try {
        const res = await fetch(
          `${API_ENDPOINT}/assign/manager-tasks?assignedBy=${userEmail}`
        );
        const data = await res.json();
        if (data.success) {
          setTasks(data.data);
        }
      } catch (error) {
        console.error("Error fetching manager tasks:", error);
      }
    };

    fetchTasks();
  }, [userEmail]);

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="bg-white shadow p-4 rounded">
        <h5 className="fw-bold mb-3">Assigned Tasks</h5>
        <p className="text-muted">No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-4 rounded-4 h-100">
  <h4 className="fw-bold mb-4 text-primary">📋 Assigned Tasks</h4>
  <ul className="list-unstyled overflow-auto pe-2" style={{ maxHeight: "480px" }}>
    {tasks.map((task) => (
      <li
        key={task._id}
        className="border rounded-4 p-4 mb-4 bg-white shadow-sm position-relative"
        style={{ borderLeft: "6px solid #4B8DF8" }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h5 className={`fw-semibold mb-2 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
              {task.title}
            </h5>

            <div className="d-flex flex-wrap gap-2 mb-2">
              <span className={`badge ${task.status === "Completed" ? "bg-success" : task.status === "In Progress" ? "bg-warning text-dark" : "bg-secondary"}`}>
                {task.status}
              </span>
              <span className={`badge ${task.priority === "High" ? "bg-danger" : task.priority === "Low" ? "bg-info text-dark" : "bg-primary"}`}>
                Priority: {task.priority}
              </span>
              {Array.isArray(task.tags) && task.tags.length > 0 && task.tags.map((tag, index) => (
                <span key={index} className="badge bg-light text-dark border">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-1"><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p className="mb-1"><strong>Description:</strong> {task.description}</p>

            <div className="text-muted small mt-2">
              <span className="me-3"><i className="bi bi-calendar-event"></i> Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              <span><i className="bi bi-clock-history"></i> Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {onDelete && (
            <button
              onClick={() => onDelete(task._id)}
              className="btn btn-outline-danger btn-sm ms-3"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default ManagerTaskList;
