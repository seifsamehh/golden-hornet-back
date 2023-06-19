const Service = require("../models/Services");

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createService = async (req, res) => {
  const { title, description, link } = req.body;

  try {
    const newService = await Service.create({
      title,
      description,
      link,
    });

    res.status(201).json(newService);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateService = async (req, res) => {
  const { id } = req.params;
  const { title, description, link } = req.body;

  try {
    const updatedService = await Service.findOneAndUpdate(
      { _id: id },
      { title, description, link },
      { new: true }
    );

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await Service.findOneAndDelete({ _id: id });

    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).send(error);
  }
};
