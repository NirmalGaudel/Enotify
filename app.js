const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const createHttpError = require("http-errors");
const { NODE_ENV, HOST, PORT, DB_URI } = require("./Utils/config");
const mainRouter = require("./routers/mainRouter");
const authRouter = require("./routers/authenticationRouter");

const app = express();

// logging for dev environment
if (NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// middlewares for the application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/auth", authRouter);
app.use("/", mainRouter);

// create not found error
app.use((req, res, next) => next(createHttpError(404)));

// handle errors in the application
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status;
  delete err.status;
  delete err.statusCode;
  delete err.expose;
  res.status(status || 500).json(err);
});

// make connection to mongoDB server
console.log("Connecting to mongoDB server ...");
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// exit application on database connection errors
mongoose.connection.on("error", (e) => {
  console.log(`Exitting Server Due to Database Error : ${e.message}`);
  process.exit();
});

// start server after successful database connection
mongoose.connection.once("open", function () {
  app.listen(PORT, () => console.log(`App Listioning at ${HOST + ":" + PORT}`));
});
