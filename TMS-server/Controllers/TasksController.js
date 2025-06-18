const TaskModel = require("../Models/Tasks");

const assignTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo, tags, assignedBy, status } = req.body;

    // ✅ Don't require createdAt
    if (!title || !description || !dueDate || !priority || !assignedTo || !assignedBy || !status || !tags) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // ✅ createdAt will be auto-generated
    const newTask = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      assignedBy,
      tags,
      status,
    });

    await newTask.save();

    res.status(201).json({
      message: "Task assigned successfully",
      success: true,
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
    });
  }
};


const getTasks = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required to fetch tasks",
      });
    }

    const tasks = await TaskModel.find({ assignedTo: email });

    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getManagerTasks = async (req, res) => {
  try {
    const { assignedBy } = req.query;
    if (!assignedBy) {
      return res.status(400).json({
        success: false,
        message: "assignedBy (email) is required",
      });
    }

    const tasks = await TaskModel.find({ assignedBy });
    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error("Error in getManagerTasks:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { taskId, status } = req.body;

    const updated = await TaskModel.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};




const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TaskModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while deleting task",
    });
  }
};


module.exports = {assignTask,getTasks,getManagerTasks,updateTask,deleteTask}
