"use strict";
const Windpark = mongoose.model("Windpark", new mongoose.Schema({
    adress: {
        street: { type: String, minlength: 2, maxlength: 50, required: true },
        zipcode: { type: Number, min: 5, max: 5, required: true },
    },
    TroubleshootingManual: { type: String, required: true },
    ContactInformation: {
        name: { type: String, minlength: 2, maxlength: 50, required: true },
        email: { type: String, minlength: 2, maxlength: 50, required: true },
        mobile: { type: String, minlength: 2, maxlength: 50, required: true },
    },
}));
exports.Windpark = Windpark;
