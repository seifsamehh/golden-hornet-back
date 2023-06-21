const express = require("express");
const heroRoute = require("./heroRoute");
const aboutRoute = require("./aboutRoute");
const servicesRoutes = require("./servicesRoutes");
const teamRoutes = require("./teamsRoutes");
const partnerRoute = require("./partnerRoute");
const appointmentRoutes = require("./appointment");
const ContactRoutes = require("./contactRoutes");
const router = express.Router();

router.use("/hero", heroRoute);
router.use("/about-us", aboutRoute);
router.use("/services", servicesRoutes);
router.use("/team", teamRoutes);
router.use("/partners", partnerRoute);
router.use("/appointment", appointmentRoutes);
router.use("/support", ContactRoutes);

module.exports = router;
