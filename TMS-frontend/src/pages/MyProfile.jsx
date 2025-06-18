import React, { useState, useEffect } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    role: "",
    company: "",
    timezone: "",
    defaultView: "Calendar",
    tasksCompleted: 0,
    appointmentsAttended: 0,
    projects: 0,
    profileImage: "https://i.pravatar.cc/150?img=3",
  });

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://tms-backend-g0yl.onrender.com/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          const {
            name,
            email,
            role,
            company,
            timezone,
            defaultView,
            profileImage,
            tasksCompleted,
            appointmentsAttended,
            projects,
          } = data.data;

          const profile = {
            fullName: name,
            email,
            role,
            company: company || "",
            timezone: timezone || "",
            defaultView: defaultView || "Calendar",
            profileImage: profileImage || "https://i.pravatar.cc/150?img=3",
            tasksCompleted: tasksCompleted || 0,
            appointmentsAttended: appointmentsAttended || 0,
            projects: projects || 0,
          };

          setUser(profile);
          setFormData(profile);
        }
      } catch (error) {
        console.error("Failed to load user profile", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result })); // Base64 string
    };
    reader.readAsDataURL(file);
  }
};


  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://tms-backend-g0yl.onrender.com/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: formData.company,
          timezone: formData.timezone,
          defaultView: formData.defaultView,
          profileImage: formData.profileImage,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setUser((prev) => ({
          ...prev,
          company: formData.company,
          timezone: formData.timezone,
          defaultView: formData.defaultView,
          profileImage: formData.profileImage,
        }));
        setEditing(false);
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-3xl p-6 flex items-center gap-6">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-indigo-800">{user.fullName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-indigo-500 mt-1">
              {user.role} {user.company && `@ ${user.company}`}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 shadow"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Section */}
        {editing && (
          <div className="bg-white shadow-xl rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Edit Profile Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-medium mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Default View</label>
                <select
                  name="defaultView"
                  value={formData.defaultView}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                >
                  <option>Calendar</option>
                  <option>Agenda</option>
                  <option>List</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Preferences */}
        <div className="bg-white shadow-lg rounded-3xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-700">Preferences</h3>
          <p><strong>Timezone:</strong> {user.timezone}</p>
          <p><strong>Default View:</strong> {user.defaultView}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-indigo-100 rounded-3xl p-5 text-center shadow">
            <p className="text-3xl font-bold text-indigo-700">{user.tasksCompleted}</p>
            <p className="text-md text-gray-700">Tasks Completed</p>
          </div>
          <div className="bg-green-100 rounded-3xl p-5 text-center shadow">
            <p className="text-3xl font-bold text-green-700">{user.appointmentsAttended}</p>
            <p className="text-md text-gray-700">Appointments Attended</p>
          </div>
          <div className="bg-yellow-100 rounded-3xl p-5 text-center shadow">
            <p className="text-3xl font-bold text-yellow-700">{user.projects}</p>
            <p className="text-md text-gray-700">Active Projects</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
