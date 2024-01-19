const express = require("express");
// const cors = require('cors');
// const helmet = require('helmet');

// const authRouter = require('../auth/auth-router');
// const parksRouter = require('../parks/parks-router');
// const ratingsRouter = require('../ratings/ratings-router')
const usersRouter = require("../users/user-router");

const app = express();

// app.use(helmet());
// app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// app.use('/api/auth', authRouter)
// app.use('/api/parks', parksRouter)
// app.use('/api/ratings', ratingsRouter)
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  try {
    res.send({ up: "up and runnin!!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
