const express = require("express");
const _ = require("lodash");
const router = express.Router();
const { validate, Windpark } = require("../models/Windpark");

router.get("/", async (req, res) => {
  const windparks = await Windpark.find();
  return res.send(windparks);
});

router.get("/:id", async (req, res) => {
  const windpark = await Windpark.findById(req.params.id);
  if (!windpark) return res.status("404").send("Not Found");
  return res.send(windpark);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("400").send(error.message);

  const windpark = new Windpark(
    _.pick(req.body, ["adress", "troubleshootingManual", "contactInformation"])
  );

  await windpark.save();

  return res.send(windpark);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("400").send(error.message);

  const windpark = await Windpark.findById(req.params.id);
  if (!windpark) return res.status("404").send("Not Found");

  const { adress, troubleshootingManual, contactInformation } = req.body;

  windpark.adress = adress;
  windpark.troubleshootingManual = troubleshootingManual;
  windpark.contactInformation = contactInformation;

  await windpark.save();

  return res.send(windpark);
});

router.delete("/:id", async (req, res) => {
  const windpark = await Windpark.findByIdAndDelete(req.params.id);
  if (!windpark) return res.status("404").send("Not Found");

  return res.send(windpark);
});

module.exports = router;
