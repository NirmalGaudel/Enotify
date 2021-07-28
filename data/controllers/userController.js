const userModel = require("../models/userModel");

function createUser(payload) {
  return new Promise((resolve, reject) => {
    userModel
      .create(payload)
      .then((d) => resolve(d))
      .catch((e) => {
        if (e?.errors)
          for (const errorPath in e.errors) {
            delete e.errors[errorPath].properties;
            delete e.errors[errorPath].reason;
          }
        delete e._message;
        reject(e);
      });
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
