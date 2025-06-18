import React, { useState } from "react";
import { handleError, handleSuccess } from "./utils";
import { useEffect } from "react";
const Leave = () => {
  const [leaveEntries, setLeaveEntries] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/add/leave", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        // const text = await response.text();
        // console.log("Raw response:", text);
        if (data.success) {
          setLeaveEntries(data.leaves);
          // console.log("Leaves:", data.leaves);
        } else {
          console.error("Error fetching leaves:", data.message);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
        handleError("Error fetching leaves");
      }
    };

    fetchLeaves();
  }, [leaveEntries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { startDate, endDate, reason } = formData;
    if (!startDate || !endDate || !reason) {
      return handleError("All fields are required");
    }
    if (endDate < startDate) {
      return handleError("End date cannot be before start date");
    }
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8080/add/leave";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setFormData({
          startDate: "",
          endDate: "",
          reason: "",
        });
      } else if (error) {
        handleError(message);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="container mx-auto px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Form Section */}
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[550px] flex flex-col justify-around transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">📝 Apply for Leave</h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="startDate" className="block font-medium mb-1 text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block font-medium mb-1 text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            required
          />
        </div>

        <div>
          <label htmlFor="reason" className="block font-medium mb-1 text-gray-700">
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            rows={3}
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter your reason"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 !rounded-lg transition duration-300"
        >
          Submit Leave Request
        </button>
      </form>
    </div>

    {/* Entries Section */}
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[550px] flex flex-col transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">📋 Your Leave Entries</h3>

      {leaveEntries.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">No leave applied yet.</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
          <ul className="space-y-4">
            {leaveEntries.map((entry, idx) => (
              <li
                key={idx}
                className="border-l-4 border-indigo-500 pl-4 py-3 bg-indigo-50 rounded-md shadow-sm transition hover:bg-indigo-100"
              >
                <p className="text-sm text-gray-700">
                  <strong>From:</strong> {new Date(entry.startDate).toLocaleDateString('en-GB')}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>To:</strong> {new Date(entry.endDate).toLocaleDateString('en-GB')}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Reason:</strong> {entry.reason}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default Leave;
