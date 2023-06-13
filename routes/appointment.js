const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");

router.post("/", appointmentController.submitAppointment);

module.exports = router;
