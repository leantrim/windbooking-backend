const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET
    );
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(255).required(),
        userType: Joi.string().required(),
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;