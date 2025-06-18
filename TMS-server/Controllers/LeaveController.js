const LeaveModel = require("../Models/Leaves");

const leaves = async (req, res) => {
  try {
    // const userId = req.user._id;
    const { startDate, endDate, reason } = req.body;
    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const newLeave = new LeaveModel({
      userId: req.user._id, 
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    res.status(201).json({
      message: "Leave applied successfully",
      success: true,
      data: newLeave,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};

const getLeaves = async (req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not found in request" });
    }

    const leaves = await LeaveModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error in getLeaves:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leave entries",
      error: error.message || error,
    });
  }
};

module.exports = {leaves,getLeaves};
