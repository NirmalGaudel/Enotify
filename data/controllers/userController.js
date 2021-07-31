const userModel = require("../models/userModel");
const errorSanitizer = require("./errorSanitizer");

function createUser(payload) {
  return new Promise((resolve, reject) => {
    userModel
      .create(payload)
      .then((d) => resolve(d))
      .catch((e) => reject(errorSanitizer(e)));
  });
}

function verifyUser({ username, password }) {
  return new Promise((resolve, reject) =>
    userModel
      .findOne({ username, password }, "_id username fullname email gender")
      .then((d) => resolve(d))
      .catch((e) => reject(e))
  );
}

module.exports = { createUser, verifyUser };
