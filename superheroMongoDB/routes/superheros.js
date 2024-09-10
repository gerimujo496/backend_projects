const express = require("express");
const { Superhero, validateInput } = require("../models/superhero");
var mongoose = require("mongoose");

const router = express.Router();

router.post("/", async (req, res) => {
  try{
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const newSuperHero = new Superhero({
      name: req.body.name,
      power: req.body.power,
    });
  
    const result = await newSuperHero.save();
    res.status(201).send(result);
  }catch (error) {
    res.status(500).send(error.message);
  }
 
});

router.get("/", async (req, res) => {
  try {
    const superheros = await Superhero.find({});
    await res.status(200).send(superheros.map((r) => r.toObject()));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }

    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }

    res.status(200).send(superhero);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateInput(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }

    const deletedsuperhero = await Superhero.findById(req.params.id);
    if (!deletedsuperhero) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }

    const superhero = await Superhero.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name, power: req.body.power } }
    );

    superhero.power = req.body.power;
    superhero.name = req.body.name;

    res.status(200).send(superhero);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero) {
      return res.status(404).send(`"The hero with the given id: ${req.params.id} does not exists"`);
    }
    await Superhero.deleteOne({ _id: req.params.id });
    res.status(200).send(superhero);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
