const Joi = require("joi");
const mongoose = require("mongoose");

const Superhero = mongoose.model(
  "Superhero",
  new mongoose.Schema({
    name: { type: String, required: true },
    power: { type: String, required: true },
  })
);

function validateInput(superheroInput) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    power: Joi.string().min(3).required().valid("mmmmmmmmmm", "dcdds"),
  });
  return schema.validate(superheroInput);
}

exports.validateInput = validateInput;
exports.Superhero = Superhero;
