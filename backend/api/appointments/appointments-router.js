const router = require("express").Router();

const Appointment = require("./appointments-model");
// const midware = require("../middleware/middleware");

// router.get("/", (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 12);
//   user.password = hash;

//   Appointment.add(user)
//     .then((saved) => {
//       saved.password = null;
//       res.status(201).json(saved);
//     })
//     .catch((error) => {
//       res.status(500).json(error.message);
//     });
// });

// router.get("/", (req, res) => {
//   Parks.findBy()
//     .then((parks) => {
//       res.status(200).json(parks);
//     })
//     .catch((error) => {
//       res.status(500).json(error.message);
//     });
// });

router.put("/:id", (req, res) => {
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
