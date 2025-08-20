import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";
import { useNavigate } from "react-router-dom";
import { REACT_APP_API_URL } from "../utility/constant";
const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = signupInfo;
    if (!name || !email || !password || !role) {
      return handleError("All fields are required");
    }
    try {
      const url = `${REACT_APP_API_URL}/auth/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        setTimeout(() => {
          if (role === "manager") {
            navigate("/dashboard");
          } else if (role === "employee") {
            navigate("/employee-dashboard");
          }
        }, 1000);
      } else if (!success) {
        handleError(message);
      } else if (error) {
        handleError(error);
        const details = error?.details[0].message;
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat">
      <div className="w-[22rem] p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Sign Up
        </h3>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-4 justify-center">
          <Link to="/login" className="flex-1">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition">
              Log In
            </button>
          </Link>

          <Link to="/signup" className="flex-1">
            <button className="w-full bg-gray-400 text-white py-2 rounded ">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Sign Up Form */}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              <FiUser className="inline-block mr-1" /> Name
            </label>
            <input
              onChange={handleChange}
              value={signupInfo.name}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              <FiMail className="inline-block mr-1" /> Email
            </label>
            <input
              type="email"
              value={signupInfo.email}
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              <FiLock className="inline-block mr-1" /> Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={signupInfo.password}
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-1">
              Select Role:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                className="accent-blue-600"
                onClick={handleChange}
              />
              <label htmlFor="manager" className="ml-2 text-gray-700">
                Manager
              </label>
            </div>
            <div className="flex items-center">
              <input
                onClick={handleChange}
                type="radio"
                id="employee"
                name="role"
                value="employee"
                className="accent-blue-600"
              />
              <label htmlFor="employee" className="ml-2 text-gray-700">
                Employee
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-800 transition rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
