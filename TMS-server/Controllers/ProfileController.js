const UserModel = require("../Models/User");
const TaskModel = require("../Models/Tasks");
const AppointmentModel = require("../Models/Appointment");
// const ProjectModel = require("../Models/Project");

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🔄 Real-time counters from actual collections
    const tasksCompleted = await TaskModel.countDocuments({
      assignedTo: req.user.email,
      status: "Completed",
    });

    const appointmentsAttended = await AppointmentModel.countDocuments({
      emails: req.user.email,

    });

    // const projects = await ProjectModel.countDocuments({
    //   members: userId, // or use { createdBy: userId } if that's your design
    // });

    // Combine with user profile
    const profile = {
      ...user._doc,
      tasksCompleted,
      appointmentsAttended,
    };

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("Error in getProfile:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
};




// PATCH /profile
const updateProfile = async (req, res) => {
  const { company, timezone, defaultView, profileImage } = req.body;

  try {
    const updatedFields = { company, timezone, defaultView, profileImage };

    // Clean null/undefined values
    Object.keys(updatedFields).forEach(
      (key) => updatedFields[key] === undefined && delete updatedFields[key]
    );

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      { new: true, select: "-password" }
    );

    res.status(200).json({ success: true, message: "Profile updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};


module.exports = { getProfile, updateProfile };
