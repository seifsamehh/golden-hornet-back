const express = require("express");
const appointmentRoutes = require("./appointment");
const ContactRoutes = require("./contactRoutes");
const router = express.Router();

router.use("/appointment", appointmentRoutes);
router.use("/support", ContactRoutes);

module.exports = router;
