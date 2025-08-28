import React, { useState } from "react";
import "./AppointmentForm.css";
import { handleError, handleSuccess } from "../pages/utils";
import { REACT_APP_API_URL } from "../utility/constant";

const AppointmentForm = () => {
  const [emailInput, setEmailInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    emails: [],
    date: "",
    time: "",
    duration: "",
    venue: "",
    purpose: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "emails") {
      const emailArray = value
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email.length > 0);

      setFormData((prev) => ({
        ...prev,
        emails: emailArray,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, emails, date, time, duration, venue, purpose } = formData;
    if (
      !title ||
      !emails ||
      !date ||
      !time ||
      !duration ||
      !venue ||
      !purpose
    ) {
      return handleError("All fields are required!");
    }
    try {
      const url = `${REACT_APP_API_URL}/schedule/appointment`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess("Meeting Scheduled Successfully");
        setFormData({
          title: "",
          emails: [],
          date: "",
          time: "",
          duration: "",
          venue: "",
          purpose: "",
        });
        setEmailInput("");
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
    <div className="container mt-4">
      <form className="appointment-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Meeting Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Participants (comma-separated emails)
          </label>
          <input
            type="text"
            name="emails"
            className="form-control"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              const emailArray = e.target.value
                .split(",")
                .map((email) => email.trim())
                .filter((email) => email.length > 0);
              setFormData((prev) => ({
                ...prev,
                emails: emailArray,
              }));
            }}
          />
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              className="form-control"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              className="form-control"
              value={formData.duration}
              onChange={handleChange}
              required
              min="15"
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Venue</label>
          <input
            type="text"
            name="venue"
            className="form-control"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Purpose</label>
          <textarea
            name="purpose"
            className="form-control"
            rows="3"
            value={formData.purpose}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Schedule Meeting
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
