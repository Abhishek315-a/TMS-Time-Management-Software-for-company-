import React from "react";
import AppointmentForm from "../components/AppointmentForm";
import ViewSchedule from "../components/ViewSchedule";

const AppointmentPage = () => {
  return (
    <div className="container mt-6">
  <div className="row d-flex align-items-stretch" style={{ minHeight: "85vh" }}>
    {/* Left Side: Appointment Form */}
    <div className="col-md-6 mb-4 d-flex">
      <div className="w-100 bg-white border rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">📝 Schedule new Meeting</h2>
        <AppointmentForm />
      </div>
    </div>

    {/* Right Side: View Schedule */}
    <div className="col-md-6 mb-4 d-flex">
      <div className="w-100 bg-white border rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">📅 Your Schedule</h2>
        <div className="max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100">
          <ViewSchedule />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default AppointmentPage;
