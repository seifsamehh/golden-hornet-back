const Hero = require("../models/Hero");
const Joi = require("joi");
const NodeCache = require("node-cache");
const cache = new NodeCache();

exports.getHero = async (req, res) => {
  try {
    const cachedHero = cache.get("hero");

    if (cachedHero) {
      return res.status(200).json(cachedHero);
    }

    const hero = await Hero.findOne();
    await cache.set("hero", hero, 60); // caching for 1 minute
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateHero = async (req, res) => {
  const { error, value } = Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    image: Joi.string().uri().required(),
  }).validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json(error.details);
  }

  const query = {};
  query.title = value.title;
  query.subtitle = value.subtitle;
  query.image = value.image;

  try {
    const hero = await Hero.findOneAndUpdate({}, query, {
      new: true,
      upsert: true,
    });
    // Delete the cached hero data
    cache.del("hero");
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).send(err);
  }
};
