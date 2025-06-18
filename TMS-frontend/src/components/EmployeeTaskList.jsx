import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../pages/utils"; // Adjust if needed

const EmployeeTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const userEmail = localStorage.getItem("email");

  const fetchTasks = async () => {
    if (!userEmail) return;

    try {
      const res = await fetch(
        `http://localhost:8080/assign/task?email=${userEmail}`
      );
      const data = await res.json();
      if (data.success) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      handleError("Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userEmail]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await fetch("http://localhost:8080/assign/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, status: newStatus }),
      });

      // Make sure it's a valid response
      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        throw new Error("Invalid server response");
      }

      if (res.ok && data.success) {
        handleSuccess("Task status updated");
        fetchTasks(); // Refresh task list
      } else {
        handleError(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
      handleError("Server error");
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;
    try {
      const res = await fetch(`http://localhost:8080/assign/delete/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return handleError(errorData.message || "Failed to delete task");
      }

      const data = await res.json();
      if (data.success) {
        handleSuccess("Task deleted successfully");
        fetchTasks();
      } else {
        handleError(data.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      handleError("Server error");
    }
  };

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="bg-white shadow p-4 rounded">
        <h5 className="fw-bold mb-3">Your Tasks</h5>
        <p className="text-muted">No tasks assigned yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg p-4 rounded-3 h-100 border">
      <h2 className="fw-bold mb-0 text-primary text-center">
        <i className="bi bi-list-task me-2"></i>Your Tasks
      </h2>
      <ul
        className="list-unstyled overflow-auto pe-2"
        style={{ maxHeight: "480px" }}
      >
        {tasks.map((task) => (
          <li key={task._id} className="card mb-4 shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h3
                  className={`card-title mb-1 ${
                    task.status === "Completed"
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }`}
                >
                  <i className="bi bi-check2-square me-2 text-success"></i>
                  {task.title}
                </h3>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(task._id)}
                  title="Delete Task"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>

              <div className="row text-muted small mb-2">
                <div className="col-sm-6">
                  <strong>Status:</strong> {task.status}
                </div>
                <div className="col-sm-6">
                  <strong>Due:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
                <div className="col-sm-6">
                  <strong>Priority:</strong>{" "}
                  <span
                    className={`badge bg-${
                      task.priority === "High"
                        ? "danger"
                        : task.priority === "Medium"
                        ? "warning"
                        : "secondary"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
                <div className="col-sm-6">
                  <strong>Assigned By:</strong> {task.assignedBy}
                </div>
                <div className="col-12">
                  <strong>Tags:</strong>{" "}
                  {Array.isArray(task.tags) ? task.tags.join(", ") : task.tags}
                </div>
                <div className="col-12">
                  <strong>Created:</strong>{" "}
                  {new Date(task.createdAt).toLocaleDateString()}
                </div>
              </div>

              <p className="mb-2 text-dark">
                <strong>Description:</strong> {task.description}
              </p>
              <div className="mt-3 d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-sm ${
                    task.status === "In Progress"
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => handleStatusChange(task._id, "In Progress")}
                  disabled={task.status === "Completed"}
                >
                  <i className="bi bi-hourglass-split me-1"></i>
                  {task.status === "In Progress"
                    ? "In Progress"
                    : "Mark In Progress"}
                </button>

                <button
                  className={`btn btn-sm ${
                    task.status === "Completed"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleStatusChange(task._id, "Completed")}
                  disabled={task.status === "Completed"}
                >
                  <i className="bi bi-check-circle me-1"></i>
                  {task.status === "Completed" ? "Completed" : "Mark Completed"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeTaskList;
