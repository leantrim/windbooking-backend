const express = require("express");
const auth = require('../middleware/auth');
const { Technician, validate } = require('../models/Technicians');
const router = express.Router();

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    if (!req.params.id) return res.status(400).send('userID is required');
    const technician = await Technician.findOne({ userID: req.params.id });
    return res.send(technician);
})

router.get("/", async (req, res) => {
    const technicians = await Technician.find();
    return res.send(technicians);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let technician = await Technician.findOne({ userID: req.body.userID });
    if (technician) return res.status(400).send('Technician already exists');

    technician = new Technician(req.body);


    await technician.save();

    return res.send(technician);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const technician = await Technician.findOne({ userID: req.params.id });
    if (!technician) return res.status(400).send('Invalid technician userID');

    const tech = await Technician.findOneAndUpdate(
        { userID: req.params.id },
        {
            workPermit: req.body.workPermit,
            driverLicense: req.body.driverLicense,
            tools: req.body.tools,
            certifications: req.body.certifications,
            achievements: req.body.achievements,
            transportVehicle: {
                winterTyres: req.body.winterTyres,
            }
        },
    );


    return res.send(tech);
})

module.exports = router;