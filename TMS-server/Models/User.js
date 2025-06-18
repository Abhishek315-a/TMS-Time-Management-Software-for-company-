const mongoose = require("mongoose");

const schema = mongoose.Schema;

const UserSchema = new schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  // 🆕 Optional Profile Fields
  company: {
    type: String,
    default: "",
  },

  timezone: {
    type: String,
    default: "Asia/Kolkata",
  },

  defaultView: {
    type: String,
    enum: ["Calendar", "Agenda", "List"],
    default: "Calendar",
  },

  profileImage: {
    type: String,
    default: "", // e.g., Cloudinary/public URL
  },

  tasksCompleted: {
    type: Number,
    default: 0,
  },

  appointmentsAttended: {
    type: Number,
    default: 0,
  },

  projects: {
    type: Number,
    default: 0,
  }
});

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema);
module.exports = UserModel;
