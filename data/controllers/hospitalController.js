const hospitalModel = require("../models/hospitalModel");
const errorSanitizer = require("./errorSanitizer");

function createHosital(payload) {
  return new Promise((resolve, reject) => {
    hospitalModel
      .create(payload)
      .then((d) => resolve(d))
      .catch((e) => reject(errorSanitizer(e)));
  });
}

module.exports = { createHosital };
