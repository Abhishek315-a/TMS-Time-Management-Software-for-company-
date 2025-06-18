import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to TMS - Time Management Software</h1>
          <p>
            Efficiently manage your appointments, meetings, and tasks all in one
            place. Our software helps executives and secretaries streamline their
            schedules, coordinate meetings seamlessly, and boost productivity.
          </p>
          <p>
            Find common available slots, get daily reminders via email, track
            project meeting times, and optimize your workday with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
