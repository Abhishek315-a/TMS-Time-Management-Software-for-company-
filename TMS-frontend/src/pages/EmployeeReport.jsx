import React, { useEffect, useState } from "react";
import { API_ENDPOINT } from "../utility/constant";

const EmployeeReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(
          `${API_ENDPOINT}/report/employee-report?email=${email}`
        );
        const data = await res.json();
        if (data.success) {
          setReport(data.data);
        }
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [email]);

  if (loading) return <p>Loading report...</p>;

  return (
    <div className="row g-4 mt-3">
      {/* Tasks Card */}
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 rounded-4 shadow-lg h-100">
          <div
            className="card-header bg-gradient text-black fw-semibold rounded-top-4"
            style={{ background: "linear-gradient(135deg, #007bff, #00c6ff)" }}
          >
            <i className="bi bi-list-task me-2"></i>Tasks Overview
          </div>
          <div className="card-body">
            <ul className="list-unstyled small mb-3 mt-2">
              <li>
                <strong>Total:</strong> {report.totalTasks}
              </li>
              <li>
                <strong>Completed:</strong> {report.completedTasks}
              </li>
              <li>
                <strong>Pending:</strong> {report.pendingTasks}
              </li>
            </ul>
            <label className="form-label small">Completion Rate</label>
            <div className="progress" style={{ height: "10px" }}>
              <div
                className="progress-bar bg-success"
                style={{
                  width: `${
                    (report.completedTasks / report.totalTasks) * 100 || 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaves Card */}
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 rounded-4 shadow-lg h-100">
          <div
            className="card-header bg-gradient text-black fw-semibold rounded-top-4"
            style={{ background: "linear-gradient(135deg, #ff416c, #ff4b2b)" }}
          >
            <i className="bi bi-calendar2-x me-2"></i>Leaves Taken
          </div>
          <div className="card-body text-center">
            <h2 className="fw-bold text-danger">{report.leavesTaken}</h2>
            <p className="text-muted small mb-0">
              Total approved leave requests
            </p>
          </div>
        </div>
      </div>

      {/* Meetings Card */}
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 rounded-4 shadow-lg h-100">
          <div
            className="card-header bg-gradient text-black fw-semibold rounded-top-4"
            style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}
          >
            <i className="bi bi-people-fill me-2"></i>Meetings Attended
          </div>
          <div className="card-body text-center">
            <h2 className="fw-bold text-primary">{report.meetingsAttended}</h2>
            <p className="text-muted small mb-0">Total meetings attended</p>
          </div>
        </div>
      </div>

      {/* Notes Card */}
      <div className="col-md-6 col-lg-4">
        <div className="card border-0 rounded-4 shadow-lg h-100">
          <div
            className="card-header bg-gradient text-black fw-semibold rounded-top-4"
            style={{ background: "linear-gradient(135deg, #232526, #414345)" }}
          >
            <i className="bi bi-stickies-fill me-2"></i>Notes Created
          </div>
          <div className="card-body text-center">
            <h2 className="fw-bold text-dark">{report.notesCreated}</h2>
            <p className="text-muted small mb-0">Personal notes written</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
