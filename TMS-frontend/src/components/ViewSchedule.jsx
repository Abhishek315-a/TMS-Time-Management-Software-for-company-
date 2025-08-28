import React, { useEffect, useState } from "react";
import { handleError } from "../pages/utils";
import { CalendarDays, Clock, MapPin, Users, Info } from "lucide-react";
import { REACT_APP_API_URL } from "../utility/constant";

const ViewSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!userEmail) return;

      try {
        const res = await fetch(
          `${REACT_APP_API_URL}/schedule/appointment?email=${userEmail}`
        );
        const data = await res.json();
        if (data.success) {
          setAppointments(data.data);
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
        handleError("Error fetching meetings");
      }
    };

    fetchAppointments();
  }, [userEmail]);

  return (
    <div className="p-4">
  {appointments.length === 0 ? (
    <div className="text-gray-500 text-center p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
      No meetings found.
    </div>
  ) : (
    <div className="grid grid-row-1 md:grid-row-2 xl:grid-row-3 gap-6">
      {appointments.map((appt, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between bg-white rounded-2xl border shadow-md p-5 hover:shadow-lg transition duration-300 space-y-4"
        >
          {/* Title */}
          <h3 className="text-xl font-semibold text-indigo-600">{appt.title}</h3>

          {/* Date and Time */}
          <div className="flex flex-col gap-1 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="font-medium">📆 Date:</span>
              <span>{new Date(appt.date).toLocaleDateString('en-GB')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">⏰ Time:</span>
              <span>{appt.time}</span>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">📍 Venue:</span>
            <span>{appt.venue}</span>
          </div>

          {/* Participants */}
          <div className="flex flex-col text-gray-700 gap-1">
            <span className="font-medium">👥 Participants:</span>
            <div className="flex flex-wrap gap-2">
              {appt.emails.map((email, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {email}
                </span>
              ))}
            </div>
          </div>

          {/* Purpose */}
          <div className="flex flex-col text-gray-700">
            <span className="font-medium">📝 Purpose:</span>
            <span>{appt.purpose}</span>
          </div>
        </div>
      ))}
    </div>
  )}
</div>



  );
};

export default ViewSchedule;
