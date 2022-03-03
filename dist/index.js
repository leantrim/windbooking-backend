"use strict";
let express = require("express");
const mongoose = require("mongoose");
const app = express();
const windfarms = require("./routes/windfarms");
app.use(express.json());
app.use("/api/windfarms", windfarms);
app.listen(5000, () => {
    console.log("listening on port 5000...");
});
mongoose
    .connect("mongodb://localhost/windbooking-db")
    .then(() => console.log("connected to MongDB..."))
    .catch((error) => console.log("Could not connect...", error));
