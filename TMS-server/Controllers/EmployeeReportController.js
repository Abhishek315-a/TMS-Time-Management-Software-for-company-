const TaskModel = require("../Models/Tasks");
const LeaveModel = require("../Models/Leaves");
const AppointmentModel = require("../Models/Appointment");
const NotesModel = require("../Models/Notes");
const UserModel = require("../Models/User"); 

const employeeReport = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = user._id;

    const totalTasks = await TaskModel.countDocuments({ assignedTo: email });
    const completedTasks = await TaskModel.countDocuments({ assignedTo: email, status: "Completed" });
    const pendingTasks = await TaskModel.countDocuments({ assignedTo: email, status: { $ne: "Completed" } });
    const leavesTaken = await LeaveModel.countDocuments({ userId });
    const meetingsAttended = await AppointmentModel.countDocuments({ emails: email });
    const notesCreated = await NotesModel.countDocuments({ userId });

    res.status(200).json({
      success: true,
      email,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        leavesTaken,
        meetingsAttended,
        notesCreated,
      },
    });
  } catch (error) {
    console.error("Report Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch report" });
  }
};

const managerReport = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userId = user._id;
    
    const totalEmployees = await UserModel.countDocuments({ role: "employee" });
    const totalTasksAssigned = await TaskModel.countDocuments();
    const completedTasks = await TaskModel.countDocuments({ status: "Completed" });
    const pendingTasks = await TaskModel.countDocuments({ status: { $ne: "Completed" } });
    const leavesApplied = await LeaveModel.countDocuments({userId});
    const meetingsScheduled = await AppointmentModel.countDocuments();
    const notesCreated = await NotesModel.countDocuments({userId});


    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalTasksAssigned,
        completedTasks,
        pendingTasks,
        leavesApplied,
        meetingsScheduled,
        notesCreated,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to generate manager report" });
  }
};



module.exports = {employeeReport,managerReport};