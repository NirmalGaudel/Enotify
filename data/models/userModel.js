const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      lowercase: true,
      required: "{PATH} is required",
      minLength: [3, "{PATH} must have more than {MINLENGTH} characters"],
      maxLength: [20, "{PATH} must have less than {MAXLENGTH} characters"],
      match: [/^[\w]*$/, "{PATH} cannot contain special characters"],
      validate: {
        validator: (username) =>
          mongoose.models.Users.findOne({ username })
            .then((d) => !d)
            .catch((_) => false),
        message: "{PATH} is already registered",
        type: "unique",
      },
      unique: true,
    },
    password: {
      type: String,
      required: "{PATH} is required",
      trim: true,
      minLength: [6, "{PATH} must have minimum length of {MINLENGTH}"],
      validate: {
        validator: (password) => {
          let errorMessage;
          const containsAlphabet = !!password.match(/[a-zA-Z]/);
          const containsNumber = !!password.match(/[0-9]/);
          const containsSpace = !!password.match(/ /);
          if (!containsAlphabet) errorMessage = "must contain an alphabet";
          else if (!containsNumber) errorMessage = "must contain a number";
          else if (containsSpace) errorMessage = "must not have a space";
          if (errorMessage) throw new Error("{PATH} " + errorMessage);
          else return true;
        },
        type: "invalid",
      },
    },
    fullname: {
      type: String,
      trim: true,
      required: "{PATH} is required",
      validate: {
        validator: (fullname) =>
          /^[A-z]* [A-z]*$/.test(fullname) ||
          /^[A-z]* [A-z]* [A-z]*$/.test(fullname),
        message: "{PATH} is not valid",
      },
    },
    contact: {
      type: String,
      trim: true,
      required: "{PATH} number is required",
      validate: {
        validator: async (contact) => {
          const isValidPhone = /^0\d{8}$/.test(contact);
          const isValidMobile = /^\d{10}$/.test(contact);
          const isValidMobileWithCode = /^[\+](\d{13})$/.test(contact);
          if (!(isValidMobile || isValidPhone || isValidMobileWithCode))
            throw new Error("{PATH} Number is invalid");
          const isUniqueEntry = await mongoose.models.Users.findOne({ contact })
            .then((d) => !d)
            .catch((_) => false);
          if (isUniqueEntry) return true;
          else throw new Error("{PATH} is already registered");
        },
        type: "invalid",
      },

      unique: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "{PATH} is required",
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "{PATH} is not valid"],
      validate: {
        validator: (email) =>
          mongoose.models.Users.findOne({ email })
            .then((d) => !d)
            .catch((_) => false),
        message: "{PATH} is already registered",
        type: "unique",
      },
      unique: true,
    },
    age: {
      type: Number,
      required: "{PATH} is required",
      min: [10, "{PATH} must be greater than {MIN}"],
      max: [100, "{PATH} must be less than {MAX}"],
      validate: [Number.isInteger, "{PATH} must be an integer"],
    },
    gender: {
      type: String,
      required: "{PATH} is required",
      uppercase: true,
      enum: {
        values: ["M", "F", "O"],
        message: "{PATH} is not valid",
      },
    },

    bloodGroup: {
      type: String,
      uppercase: true,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{PATH} is not valid",
      },
    },

    emergencyContact: {
      type: String,
      trim: true,
      validate: {
        validator: async (contact) => {
          const isValidPhone = /^0\d{8}$/.test(contact);
          const isValidMobile = /^\d{10}$/.test(contact);
          const isValidMobileWithCode = /^[\+](\d{13})$/.test(contact);
          return isValidMobile || isValidPhone || isValidMobileWithCode;
        },
        type: "invalid",
        message: "Emergency contact number is not valid",
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
