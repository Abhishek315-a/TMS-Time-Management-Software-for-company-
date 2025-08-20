import React from "react";
import {
  Users,
  ClipboardList,
  CalendarDays,
  BarChart3,
  CheckSquare,
  Briefcase,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-12 bg-gradient-to-r from-white to-indigo-50 text-gray-800">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Time Management Made Simple
          </h2>
          <p className="mt-4 text-lg">
            A unified platform to streamline tasks, meetings, and leaves for
            managers and employees — so everyone stays on track and productive.
          </p>
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
          alt="Time management"
          className="w-80 mt-8 md:mt-0"
        />
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-gray-800">
          Two Dashboards, One Goal
        </h3>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Whether you’re managing a team or working as an employee, our platform
          adapts to your role. Managers get powerful tools to assign, schedule,
          and track, while employees get a clear view of their tasks, meetings,
          and leave requests.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto px-6 pb-16">
        {/* Manager Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h4 className="text-2xl font-semibold text-indigo-600 flex items-center gap-2">
            <Briefcase size={28} /> Manager Dashboard
          </h4>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <ClipboardList className="text-indigo-500" size={20} />
              <span>Personalized task assignments to specific employees.</span>
            </li>
            <li className="flex items-start gap-2">
              <CalendarDays className="text-indigo-500" size={20} />
              <span>Schedule and manage team meetings with ease.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="text-indigo-500" size={20} />
              <span>Approve or reject employee leave requests.</span>
            </li>
            <li className="flex items-start gap-2">
              <BarChart3 className="text-indigo-500" size={20} />
              <span>Track employee performance and view detailed reports.</span>
            </li>
          </ul>
        </div>

        {/* Employee Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <h4 className="text-2xl font-semibold text-purple-600 flex items-center gap-2">
            <Users size={28} /> Employee Dashboard
          </h4>
          <ul className="mt-4 space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <CalendarDays className="text-purple-500" size={20} />
              <span>View all scheduled meetings and events.</span>
            </li>
            <li className="flex items-start gap-2">
              <ClipboardList className="text-purple-500" size={20} />
              <span>Check assigned tasks and update progress.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckSquare className="text-purple-500" size={20} />
              <span>Apply for leave directly from the dashboard.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600 mt-auto">
        © {new Date().getFullYear()} Time Management System. All rights
        reserved.
      </footer>
    </div>
  );
}
