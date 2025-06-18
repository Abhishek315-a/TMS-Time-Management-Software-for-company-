const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRouter = require("./Routes/AuthRouter");
const AppointmentRouter = require("./Routes/AppointmentRouter");
const LeaveRouter = require("./Routes/LeaveRouter");
const NoteRouter = require("./Routes/NoteRouter");
const profileRouter = require('./Routes/profileRouter');
const TaskRouter = require('./Routes/TaskRouter');
const ReportRouter = require("./Routes/ReportRouter");

require('dotenv').config();
require("./Models/db");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello ji kaise ho");
});

app.use('/auth', AuthRouter);
app.use('/schedule', AppointmentRouter);
app.use('/add', LeaveRouter);
app.use('/create', NoteRouter);
app.use('/update', profileRouter);
app.use('/assign', TaskRouter);
app.use('/report', ReportRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
