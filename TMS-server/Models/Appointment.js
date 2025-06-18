const { required } = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AppointmentSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  emails: [{ type: String, required: true }],
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
});

const AppointmentModel = mongoose.model("appointments", AppointmentSchema);
module.exports = AppointmentModel;
