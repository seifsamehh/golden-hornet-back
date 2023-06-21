const Team = require("../models/Team");
const Service = require("../models/Services");
const Joi = require("joi");
const NodeCache = require("node-cache");

const teamsCache = new NodeCache();

exports.getAllTeams = async (req, res, next) => {
  try {
    const cachedTeams = teamsCache.get("teams");
    if (cachedTeams) {
      return res.json(cachedTeams);
    } else {
      const teams = await Team.find().populate("service");
      teamsCache.set("teams", teams);
      res.json(teams);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTeamById = async (req, res, next) => {
  try {
    const cachedTeam = teamsCache.get(req.params.id);
    if (cachedTeam) {
      return res.json(cachedTeam);
    } else {
      const team = await Team.findById(req.params.id).populate("service");
      if (!team) throw Error("Team section not found");
      teamsCache.set(req.params.id, team);
      res.json(team);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createTeam = async (req, res, next) => {
  const teamSchema = Joi.object({
    image: Joi.string().required(),
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    link: Joi.string().required(),
    service: Joi.string().required(),
  });

  try {
    const validation = teamSchema.validate(req.body);
    if (validation.error) throw Error(validation.error.details[0].message);

    const service = await Service.findById(req.body.service);
    if (!service) throw Error("Service not found");

    const team = new Team({
      image: req.body.image,
      title: req.body.title,
      subtitle: req.body.subtitle,
      link: req.body.link,
      service: service._id,
    });

    const newTeam = await team.save();
    teamsCache.del("teams");
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTeam = async (req, res, next) => {
  const teamSchema = Joi.object({
    image: Joi.string(),
    title: Joi.string(),
    subtitle: Joi.string(),
    link: Joi.string(),
    service: Joi.string(),
  });

  try {
    const validation = teamSchema.validate(req.body);
    if (validation.error) throw Error(validation.error.details[0].message);

    const team = await Team.findById(req.params.id);
    if (!team) throw Error("Team section not found");

    if (req.body.image) team.image = req.body.image;
    if (req.body.title) team.title = req.body.title;
    if (req.body.subtitle) team.subtitle = req.body.subtitle;
    if (req.body.link) team.link = req.body.link;

    if (req.body.service) {
      const service = await Service.findById(req.body.service);
      if (!service) throw Error("Service not found");
      team.service = service._id;
    }

    const updatedTeam = await team.save();
    teamsCache.del([req.params.id, "teams"]);
    res.json(updatedTeam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) throw Error("Team section not found");

    await team.remove();
    teamsCache.del([req.params.id, "teams"]);
    res.json({ message: "Team section deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
