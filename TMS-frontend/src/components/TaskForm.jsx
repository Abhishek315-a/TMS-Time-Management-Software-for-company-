import React, { useState } from "react";
import { handleError, handleSuccess } from "../pages/utils"; // ✅ Make sure handleSuccess is imported too
import { REACT_APP_API_URL } from "../utility/constant";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignedTo: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentUserEmail = localStorage.getItem("email") || "";

    const { title, description, dueDate, priority, assignedTo, tags, status } =
      formData;

    console.log("Form Values:");
    console.log({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      tags,
      status,
    });
    console.log("Assigned By:", currentUserEmail);

    if (
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      !assignedTo ||
      !status ||
      !tags
    ) {
      return handleError("All fields are required!");
    }

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // <-- convert string to array
      assignedBy: currentUserEmail,
    };

    try {
      const response = await fetch(`${REACT_APP_API_URL}/assign/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess("Task assigned Successfully");

        // ✅ Reset only formData (exclude assignedBy)
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          status: "Pending",
          assignedTo: "",
          tags: "",
        });
      } else {
        handleError(message || error || "Something went wrong");
      }
    } catch (error) {
      handleError("Server Error. Please try again.");
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded h-100">
      <h5 className="fw-bold mb-3">Add New Task</h5>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Task Title"
          className="form-control mb-2"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          className="form-control mb-2"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
        <select
          name="priority"
          className="form-control mb-2"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          name="status"
          className="form-control mb-2"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="email"
          name="assignedTo"
          placeholder="Assigned To (Email)"
          className="form-control mb-2"
          value={formData.assignedTo}
          onChange={handleChange}
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          className="form-control mb-3"
          value={formData.tags}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary w-100">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
