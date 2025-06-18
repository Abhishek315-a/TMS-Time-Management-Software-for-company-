import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utils";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
    console.log("form submitted");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginInfo;
    if (!email || !password || !role) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://tms-backend-g0yl.onrender.com/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess("Login Successfully");
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
      }
      // else if(error){
      //   handleError(error);
      //   const details = error?.details[0].message;
      // }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat">
      <div className="w-[22rem] p-8 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-4 ">
          Log In
        </h3>

        {/* Toggle Buttons */}
        <div className="flex gap-2 mb-4 justify-center">
          <Link to="/login" className="flex-1">
            <button className="w-full bg-gray-400 text-white py-2 rounded">
              Log In
            </button>
          </Link>

          <Link to="/signup" className="flex-1">
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition">
              Sign Up
            </button>
          </Link>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-600 mb-1">
              <FiMail className="inline-block mr-1" /> Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={loginInfo.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-600 mb-1">
              <FiLock className="inline-block mr-1" /> Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
              value={loginInfo.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-600 mb-1">
              Select Role:
            </label>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="manager"
                name="role"
                value="manager"
                className="accent-blue-600"
                onChange={handleChange}
              />
              <label htmlFor="manager" className="ml-2 text-gray-600">
                Manager
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="employee"
                name="role"
                value="employee"
                className="accent-blue-600"
                onChange={handleChange}
              />
              <label htmlFor="employee" className="ml-2 text-gray-600">
                Employee
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2  rounded-md hover:bg-blue-800 transition rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
