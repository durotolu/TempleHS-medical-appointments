const router = require("express").Router();

const Appointment = require("./appointments-model");
const Users = require("../users/users-model");
const midware = require('../../middleware/middleware');

router.get("/:user_id", midware.verifyToken, (req, res) => {
  Users.findById(req.params.user_id)
    .then((appointments) => {
      res.status(200).json(appointments);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

router.put("/:id", midware.verifyToken, (req, res) => {
  Appointment.update(req.params.id, req.body)
    .then((appointment) => {
      res.status(201).json(appointment);
    })
    .catch((error) => {
      res.status(500).json({
        "error updating appointment": error.message,
      });
    });
});

module.exports = router;
