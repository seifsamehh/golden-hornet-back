const express = require("express");
const heroRoute = require("./heroRoute");
const aboutRoute = require("./aboutRoute");
const servicesRoutes = require("./servicesRoutes");
const appointmentRoutes = require("./appointment");
const ContactRoutes = require("./contactRoutes");
const router = express.Router();

router.use("/hero", heroRoute);
router.use("/about-us", aboutRoute);
router.use("/services", servicesRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/support", ContactRoutes);

module.exports = router;
