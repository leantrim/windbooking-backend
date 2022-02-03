const express = require("express");
const _ = require("lodash")
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/User');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    return res.send(user);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registerd');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    return res.send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;