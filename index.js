const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const app = express();
const windparks = require("./routes/windparks");
const users = require("./routes/users");
const auth = require("./routes/auth");

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT Secret not set');
  process.exit(1);
}

app.use(express.json());
app.use("/api/windparks", windparks);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(5000, () => {
  console.log("listening on port 5000...");
});

mongoose
  .connect("mongodb://localhost/windbooking-db")
  .then(() => console.log("connected to MongDB..."))
  .catch((error) => console.log("Could not connect...", error));
