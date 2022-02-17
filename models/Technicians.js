const Joi = require("joi");
const mongoose = require("mongoose");


const technicianSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    workPermit: {
        type: Boolean,
    },
    driverLicense: {
        type: Boolean,
    },
    tools: {
        type: [String],
    },
    certifications: {
        type: [String],
    },
    achievements: {
        type: [String],
    },
    transportVehicle: {
        winterTyres: {
            type: Boolean,
        }
    },
});


const Technician = mongoose.model('Technician', technicianSchema);

function validateUser(technician) {
    const schema = Joi.object({
        userID: Joi.string(),
        workPermit: Joi.boolean(),
        driverLicense: Joi.boolean(),
        tools: Joi.array(),
        certifications: Joi.array(),
        achievements: Joi.array(),
        transportVehicle: Joi.object({
            winterTyres: Joi.boolean(),
        })
    })

    return schema.validate(technician);
}

exports.Technician = Technician;
exports.validate = validateUser;