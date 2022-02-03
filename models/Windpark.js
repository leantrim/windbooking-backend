const mongoose = require("mongoose");
const Joi = require("joi");

const Windpark = mongoose.model(
  "Windpark",
  new mongoose.Schema({
    adress: {
      street: { type: String, minlength: 2, maxlength: 50, required: true },
      zipcode: { type: String, minlength: 5, maxlength: 5, required: true },
    },
    troubleshootingManual: { type: String, required: true },
    contactInformation: {
      name: { type: String, minlength: 2, maxlength: 50, required: true },
      email: { type: String, minlength: 2, maxlength: 150, required: true },
      mobile: { type: String, minlength: 5, maxlength: 50, required: true },
    },
  })
);

function validateWindpark(windpark) {
  const schema = Joi.object({
    adress: Joi.object({
      street: Joi.string().required().min(2).max(50),
      zipcode: Joi.string().required().min(5).max(5),
    }),
    troubleshootingManual: Joi.string().required(),
    contactInformation: Joi.object({
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().required().min(2).max(150).email(),
      mobile: Joi.string().required().min(5).max(50),
    }),
  });

  return schema.validate(windpark);
}

exports.Windpark = Windpark;
exports.validate = validateWindpark;
