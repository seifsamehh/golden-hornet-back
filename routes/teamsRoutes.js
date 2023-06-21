const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamControllers");

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.post("/", teamController.createTeam);
router.patch("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
