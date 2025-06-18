import React from "react";

const LeaveSummary = ({ leaves = [] }) => {
  if (!leaves.length) {
    return <div className="alert alert-info">No leave records found.</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Leave Summary</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={index}>
                <td>{leave.type}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.totalDays}</td>
                <td className={getStatusClass(leave.status)}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-success fw-bold";
    case "pending":
      return "text-warning fw-bold";
    case "rejected":
      return "text-danger fw-bold";
    default:
      return "text-secondary";
  }
};

export default LeaveSummary;

