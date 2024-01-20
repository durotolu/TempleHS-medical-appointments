const router = require("express").Router();
const Doctors = require("./doctors-model");

router.get("/", (req, res) => {
  Doctors.findAvailable()
    .then((doctors) => {
      res.status(200).json(doctors);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
