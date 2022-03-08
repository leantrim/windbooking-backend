const express = require("express");
const _ = require("lodash");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();
const { validate, Windfarm } = require("../models/WindFarms");

router.get("/", async (req, res) => {
  const windfarms = await Windfarm.find();
  return res.send(windfarms);
});

router.get("/:id", async (req, res) => {
  const windfarm = await Windfarm.findById(req.params.id);
  if (!windfarm) return res.status("404").send("Not Found");
  return res.send(windfarm);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("400").send(error.message);

  const windfarm = new Windfarm(
    _.pick(req.body, [
      "address",
      "troubleshootingManual",
      "owner",
      "windFarmDetails",
    ])
  );

  await windfarm.save();

  return res.send(windfarm);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status("400").send(error.message);

  const windfarm = await Windfarm.findById(req.params.id);
  if (!windfarm) return res.status("404").send("Not Found");

  const { address, troubleshootingManual, owner, windFarmDetails } = req.body;

  windfarm.address = address;
  windfarm.troubleshootingManual = troubleshootingManual;
  windfarm.owner = owner;
  windfarm.windFarmDetails = windFarmDetails;

  await windfarm.save();

  return res.send(windfarm);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const windfarm = await Windfarm.findByIdAndDelete(req.params.id);
  if (!windfarm) return res.status("404").send("Not Found");

  return res.send(windfarm);
});

module.exports = router;
