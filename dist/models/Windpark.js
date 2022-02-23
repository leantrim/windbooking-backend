"use strict";
const Windfarm = mongoose.model("Windfarm", new mongoose.Schema({
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
exports.Windfarm = Windfarm;
