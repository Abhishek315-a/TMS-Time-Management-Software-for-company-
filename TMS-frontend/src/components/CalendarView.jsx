import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarView.css";
import { REACT_APP_API_URL } from "../utility/constant";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView = () => {
  const [appointments, setAppointments] = useState([]);
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
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
        console.error("Error fetching appointments:", error);
        // Optional: toast or alert
      }
    };

    fetchAppointments();
  }, [userEmail]);

  // 🔁 Convert to calendar events
  const mappedEvents = appointments.map((appt) => {
    const [hours, minutes] = appt.time.split(":").map(Number);
    const start = new Date(appt.date);
    start.setHours(hours, minutes);

    const end = new Date(start);
    end.setHours(start.getHours() + 1); // or use appt.duration if available

    return {
      title: appt.title,
      start,
      end,
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-6">


      <div className="bg-white rounded-xl shadow-lg p-4">
        <Calendar
          localizer={localizer}
          events={mappedEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          onView={setView}
          date={date}
          onNavigate={setDate}
          views={["month", "week", "day", "agenda"]}
          style={{ height: "80vh" }}
          popup
        />
      </div>
    </div>
  );
};

export default CalendarView;
