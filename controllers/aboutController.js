const About = require("../models/About");
const Joi = require("joi");
const NodeCache = require("node-cache");

// Creating a separate cache instance for the about section data
const aboutCache = new NodeCache();

exports.getAbout = async (req, res) => {
  try {
    const cachedAbout = aboutCache.get("about");

    if (cachedAbout) {
      return res.status(200).json(cachedAbout);
    }

    const about = await About.findOne();
    await aboutCache.set("about", about, 60); // caching for 1 minute
    res.status(200).json(about);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateAbout = async (req, res) => {
  const { error, value } = Joi.object({
    paragraph: Joi.string().required(),
    image: Joi.string().uri().required(),
  }).validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json(error.details);
  }

  const query = {};
  query.paragraph = value.paragraph;
  query.image = value.image;

  try {
    const about = await About.findOneAndUpdate({}, query, {
      new: true,
      upsert: true,
    });
    // Delete the cached about section data
    aboutCache.del("about");
    res.status(200).json(about);
  } catch (err) {
    res.status(500).send(err);
  }
};
