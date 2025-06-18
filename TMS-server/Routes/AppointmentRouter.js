const {appointments,showappointments} = require("../Controllers/AppointmentController");

const router = require("express").Router();

router.post("/appointment",appointments)

router.get("/appointment",showappointments)

module.exports = router;