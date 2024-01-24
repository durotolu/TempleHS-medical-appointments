const router = require("express").Router();
const Doctors = require("./doctors-model");
const midware = require('../../middleware/middleware');

router.get("/", midware.verifyToken, (req, res) => {
  Doctors.findAvailable()
    .then((doctors) => {
      console.log("doctors", doctors)
      res.status(200).json(doctors);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
