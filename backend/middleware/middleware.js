const jwt = require("jsonwebtoken");

module.exports = {
  checkRegisterInput,
  checkLoginInput,
  verifyToken,
};

function checkLoginInput(req, res, next) {
  let user = req.body;
  if (user.email && user.password) {
    next();
  } else {
    res.status(403).json({ message: "missing required field" });
  }
}

function checkRegisterInput(req, res, next) {
  let user = req.body;
  if (user.email && user.password && user.date_of_birth) {
    next();
  } else {
    res.status(403).json({ message: "missing required field" });
  }
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(
      token,
      process.env.NODE_ENV === "development"
        ? "this is supposed to be secret"
        : process.env.SECRET,
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ "credentials not valid": err });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
}
