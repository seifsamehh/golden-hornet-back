const Partner = require("../models/Partner");
const Joi = require("joi");
const NodeCache = require("node-cache");

const partnersCache = new NodeCache();

exports.getAllPartners = async (req, res, next) => {
  try {
    const cachedPartners = partnersCache.get("partners");
    if (cachedPartners) {
      return res.json(cachedPartners);
    } else {
      const partners = await Partner.find();
      partnersCache.set("partners", partners);
      res.json(partners);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPartnerById = async (req, res, next) => {
  try {
    const cachedPartner = partnersCache.get(req.params.id);
    if (cachedPartner) {
      return res.json(cachedPartner);
    } else {
      const partner = await Partner.findById(req.params.id);
      if (!partner) throw Error("Partner section not found");
      partnersCache.set(req.params.id, partner);
      res.json(partner);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.createPartner = async (req, res, next) => {
  const partnerSchema = Joi.object({
    title: Joi.string().required(),
    paragraph: Joi.string().required(),
    images: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
          alt: Joi.string().required(),
        })
      )
      .required(),
  });

  try {
    const validation = partnerSchema.validate(req.body);
    if (validation.error) throw Error(validation.error.details[0].message);

    const partner = new Partner({
      title: req.body.title,
      paragraph: req.body.paragraph,
      images: req.body.images,
    });

    const newPartner = await partner.save();
    partnersCache.del("partners");
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updatePartner = async (req, res, next) => {
  const partnerSchema = Joi.object({
    title: Joi.string(),
    paragraph: Joi.string(),
    images: Joi.array().items(
      Joi.object({
        url: Joi.string().required(),
        alt: Joi.string().required(),
      })
    ),
  });

  try {
    const validation = partnerSchema.validate(req.body);
    if (validation.error) throw Error(validation.error.details[0].message);

    const partner = await Partner.findById(req.params.id);
    if (!partner) throw Error("Partner section not found");

    if (req.body.title) partner.title = req.body.title;
    if (req.body.paragraph) partner.paragraph = req.body.paragraph;
    if (req.body.images) partner.images = req.body.images;

    const updatedPartner = await partner.save();
    partnersCache.del([req.params.id, "partners"]);
    res.json(updatedPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePartner = async (req, res, next) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) throw Error("Partner section not found");

    await partner.remove();
    partnersCache.del([req.params.id, "partners"]);
    res.json({ message: "Partner section deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
