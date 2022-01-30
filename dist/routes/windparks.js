"use strict";
const router = express.Router();
router.get("/", (req, res) => {
    return res.send("Funkar");
});
module.exports = router;
