import './App.css'
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import CalendarView from './components/CalendarView';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Task';
import HomePage from "./pages/HomePage";
import Leave from './pages/Leave';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import RefreshHandler from './pages/RefreshHandler';
import AppointmentPage from "./pages/AppointmentPage";
import MyProfile from './pages/MyProfile';
import SaveNotePage from './pages/SaveNotePage';
import EmployeeDashboard from './pages/EmployeeDashboard';
import SchedulePage from "./pages/SchedulePage";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ManagerTasks from './pages/ManagerTasks';
import EmployeeReport from "./pages/EmployeeReport";
import ManagerReportPage from './pages/ManagerReportPage';


function AppRoutes() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/signup'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const PrivateRouter = ({element})=>{
      return isAuthenticated ? element : <Navigate to={"/login"}/>
  }

  return (
    <>
      <RefreshHandler setIsAuthenticate={setIsAuthenticated}/>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRouter element={<HomePage/>} />} />
        <Route path="/dashboard" element={<PrivateRouter element={<Dashboard/>} />} />
        <Route path="/calendar" element={<PrivateRouter element={<CalendarView/>} />} />
        <Route path="/tasks" element={<PrivateRouter element={<Tasks/>} />} />
        <Route path="/manager-tasks" element={<PrivateRouter element={<ManagerTasks/>} />} />
        <Route path="/leave" element={<PrivateRouter element={<Leave/>} />} />
        <Route path="/reports" element={<PrivateRouter element={<ManagerReportPage/>} />} />
        <Route path="/savenote" element={<PrivateRouter element={<SaveNotePage/>} />} />
        <Route path="/appointments" element={<PrivateRouter element={<AppointmentPage/>} />} />
        <Route path="/profile" element={<PrivateRouter element={<MyProfile/>} />} />
        <Route path="/employee-report" element={<EmployeeReport />} />
        <Route path="/schedulepage" element={<SchedulePage />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
