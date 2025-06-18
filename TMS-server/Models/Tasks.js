const mongoose = require("mongoose");

const schema = mongoose.Schema;

const TaskSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  assignedBy: String,
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
