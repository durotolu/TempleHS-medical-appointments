const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/user-router");
const doctorsRouter = require("./doctors/doctors-router");
const appointmentsRouter = require("./appointments/appointments-router");

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/doctors", doctorsRouter);
app.use("/api/appointments", appointmentsRouter);

app.get("/", (req, res) => {
  try {
    res.send({ templeHS: "Welcome to TempleHS!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
