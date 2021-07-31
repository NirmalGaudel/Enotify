// const { Schema } = require("mongoose");

const pointSchema = {
  type: [Number],
  required: "{PATH} is required",
  index: "2dsphere",
  validate: {
    validator: (location) =>
      location
        .map((v, i) => {
          const range = i ? 90 : 180;
          const nrange = 0 - range;
          const isValid = v <= range && v >= nrange;
          return isValid;
        })
        .reduce((v, r) => r && v, location.length === 2),
    message: "{PATH} coordinates are invalid",
    type: "invalid",
  },
};

module.exports = { pointSchema };
