const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { JWT_SECRET } = require("./config");

function createToken(payload) {
  return jwt.sign(JSON.parse(JSON.stringify(payload)), JWT_SECRET, {
    expiresIn: "10d",
  });
}

function validateToken(req, res, next) {
  try {
    let token = req.headers?.authorization;
    if (!token || !token.includes(" ") || token.split(" ")[0] !== "Bearer")
     throw "No Supported Authorization token"
    token = token.split(" ")[1];
    jwt.verify(`${token}`, JWT_SECRET, (error, result) => {
      if (error) throw error;
      mongoose.models.Users.findById(result._id, "-password")
        .then((d) => {
          if (!d) throw "No such user exists";
          res.locals.user = d;
          next();
        })
        .catch((_)=>next(createHttpError(401,"No such user exists")));
    });
  } catch (err) {
    next(createHttpError(401, err))
  }
}

module.exports = { createToken, validateToken };
