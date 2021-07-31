const mongoose = require("mongoose");
const { pointSchema } = require("./geoJsonSchema");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    location: pointSchema,
  },
  { timestamps: true, collection: "hospitals" }
);

const hospitalModel = new mongoose.model("Hospitals", hospitalSchema);

module.exports = hospitalModel;
