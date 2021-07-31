const createHttpError = require("http-errors");
const { createHosital } = require("../data/controllers/hospitalController");
const { validateToken } = require("../Utils/jwt");
const mainRouter = require("express").Router();

mainRouter.use(validateToken);

mainRouter.get("/", (req, res, next) => {
  res.send("Welcome Back " + res.locals.user.fullname);
});

mainRouter.post("/hospitals/register", async (req, res, next) => {
  try {
    const result = await createHosital(req.body);
    res.status.apply(200).json(result);
  } catch (err) {
    next(createHttpError(406, err));
  }
});

module.exports = mainRouter;
