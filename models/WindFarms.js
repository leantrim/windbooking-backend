const mongoose = require("mongoose");
const Joi = require("joi");
const { number } = require("joi");

const Windfarm = mongoose.model(
  "Windfarm",
  new mongoose.Schema({
    address: {
      name: { type: String, minlength: 2, maxlength: 100, required: true },
      street: { type: String, minlength: 2, maxlength: 50, required: true },
      zipcode: { type: String, minlength: 5, maxlength: 5, required: true },
      city: { type: String, minlength: 2, maxlength: 100, required: true },
      county: { type: String, minlength: 2, maxlength: 100, required: true },
      country: { type: String, minlength: 2, maxlength: 50, required: true },
    },
    troubleshootingManual: { type: String, required: true },
    owner: {
      company: { type: String, required: true },
    },
    windFarmDetails: {
      hubHeight: { type: String, required: true },
      elevatorType: { type: String, required: true },
      commissioningDate: { type: Date, required: true },
      safetyEquipment: { type: String, required: true },
      numberOfWindTurbines: { type: String, requrired: true },
    },
  })
);

function validateWindfarm(windfarm) {
  const schema = Joi.object({
    address: Joi.object({
      name: Joi.string().required().min(2).max(100),
      street: Joi.string().required().min(2).max(50),
      zipcode: Joi.string().required().min(5).max(5),
      city: Joi.string().required().min(2).max(100),
      county: Joi.string().required().min(2).max(100),
      country: Joi.string().required().min(2).max(50),
    }),
    troubleshootingManual: Joi.string().required(),
    owner: Joi.object({
      company: Joi.string().required(),
    }),
    windFarmDetails: Joi.object({
      hubHeight: Joi.string().required(),
      elevatorType: Joi.string().required(),
      commissioningDate: Joi.date().required(),
      safetyEquipment: Joi.string().required(),
      numberOfWindTurbines: Joi.string().required(),
    }),
  });

  return schema.validate(windfarm);
}

exports.Windfarm = Windfarm;
exports.validate = validateWindfarm;
