import React, { useEffect, useState } from "react";
import { REACT_APP_API_URL } from "../utility/constant";


const ManagerReportPage = () => {
  const [report, setReport] = useState(null);
  const managerEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchManagerReport = async () => {
      try {
        const res = await fetch(
          `${REACT_APP_API_URL}/report/manager-report?email=${managerEmail}`
        );
        const data = await res.json();
        if (data.success) setReport(data.data);
      } catch (error) {
        console.error("Failed to fetch manager report:", error);
      }
    };
    fetchManagerReport();
  }, [managerEmail]);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="container py-4">
      <h3 className="text-center fw-bold text-primary mb-4">
        <i className="bi bi-graph-up-arrow me-2"></i>Manager Report Overview
      </h3>

      <div className="row g-4 mb-4">
        {/* Summary Cards */}
        <SummaryCard icon="bi-people" label="Total Employees" value={report.totalEmployees} color="primary" />
        <SummaryCard icon="bi-list-task" label="Total Tasks" value={report.totalTasksAssigned} color="info" />
        <SummaryCard icon="bi-check-circle" label="Completed Tasks" value={report.completedTasks} color="success" />
        <SummaryCard icon="bi-hourglass-split" label="Pending Tasks" value={report.pendingTasks} color="warning" />
        <SummaryCard icon="bi-calendar-event" label="Meetings" value={report.meetingsScheduled} color="dark" />
        <SummaryCard icon="bi-stickies" label="Notes Created" value={report.notesCreated} color="secondary" />
        <SummaryCard icon="bi-calendar2-x" label="Leaves Requested" value={report.leavesApplied} color="danger" />
      </div>

{/* Performance Table */}
<div className="bg-white shadow-sm rounded-4 p-4">
  <h5 className="mb-3 fw-semibold text-dark">Team Task Performance</h5>
  <div className="table-responsive">
    {Array.isArray(report.teamStats) && report.teamStats.length > 0 ? (
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>Email</th>
            <th>Assigned</th>
            <th>Completed</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {report.teamStats.map((emp, index) => (
            <tr key={index}>
              <td>{emp.email}</td>
              <td>{emp.assigned}</td>
              <td>{emp.completed}</td>
              <td>{emp.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-muted">No team task data available.</p>
    )}
  </div>
</div>

    </div>
  );
};

const SummaryCard = ({ icon, label, value, color }) => (
  <div className="col-md-4 col-lg-3">
    <div className={`card shadow-sm border-start border-4 border-${color}`}>      
      <div className="card-body text-center">
        <i className={`bi ${icon} fs-3 text-${color} mb-2`}></i>
        <h6 className="text-muted fw-semibold mb-1">{label}</h6>
        <h4 className={`fw-bold text-${color}`}>{value}</h4>
      </div>
    </div>
  </div>
);

export default ManagerReportPage;
