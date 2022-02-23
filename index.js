const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const windfarms = require("./routes/windfarms");
const users = require("./routes/users");
const technicians = require("./routes/technicians");
const auth = require("./routes/auth");
const cors = require("cors");

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT Secret not set");
  process.exit(1);
}

app.use(express.json());
app.use(cors());
app.use("/api/windfarms", windfarms);
app.use("/api/users", users);
app.use("/api/technicians", technicians);
app.use("/api/auth", auth);

app.listen(5000, () => {
  console.log("listening on port 5000...");
});

mongoose
  .connect("mongodb://localhost/windbooking-db")
  .then(() => console.log("connected to MongoDB..."))
  .catch((error) => console.log("Could not connect...", error));
