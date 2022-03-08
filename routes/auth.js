const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const router = express.Router();
const { User } = require("../models/User");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken(user);
  return res.header("x-auth-token", token).send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
}

module.exports = router;
