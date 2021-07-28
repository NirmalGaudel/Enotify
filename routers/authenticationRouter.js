const createHttpError = require("http-errors");
const {
  createUser,
  verifyUser,
} = require("../data/controllers/userController");
const { createToken } = require("../Utils/jwt");
const authRouter = require("express").Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const userData = await verifyUser(req.body);
    if (!userData)
      next(
        createHttpError(401, {
          type: "Unathorized",
          message: "Invalid username or password",
        })
      );
    let token = createToken(userData);
    res.status(200).json({ token, user: userData });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/user", async (req, res, next) => {
  try {
    let result = await createUser(req.body);
    res.json(result);
  } catch (err) {
    next(createHttpError(406, err));
  }
});

module.exports = authRouter;
