const AppointmentModel = require("../Models/Appointment");

const appointments = async (req, res) => {
  try {
    const { title, emails, date, time, duration, venue, purpose } = req.body;

    if (!title || !emails || !date || !time || !duration || !venue || !purpose) {
      return res.status(400).json({
        message: "All fields are required",
        success: false
      });
    }

    const newAppointment = new AppointmentModel({
      title,
      emails, // should be an array
      date,
      time,
      duration,
      venue,
      purpose,
    });

    await newAppointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      data: newAppointment
    });
  } catch (error) {
    console.error(error); 
    res.status(500).json({
      message: error.message || "Internal Server Error", 
      success: false
    });
  }
};


const showappointments = async (req, res) => {
  const { email } = req.query;

  try {
    const query = {};

    if (email) {
      query.emails = email.trim(); // match email inside emails array
    }

    const appointments = await AppointmentModel.find(query).sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointments",
    });
  }
};

module.exports = { appointments,showappointments };
