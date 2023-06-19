const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");

router.get("/", heroController.getHero);
router.put("/", heroController.updateHero);

module.exports = router;
