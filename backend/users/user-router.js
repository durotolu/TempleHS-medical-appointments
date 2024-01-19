const bcrypt = require('bcryptjs');
const router = require("express").Router();
const Users = require("./users-model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

router.post("/", (req, res) => {
  console.log("here we are")
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      saved.password = null;
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
