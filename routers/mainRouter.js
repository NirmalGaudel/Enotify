const { validateToken } = require("../Utils/jwt");
const mainRouter = require("express").Router();

mainRouter.use(validateToken)

mainRouter.get("/", (req, res, next) => {
  res.send("Welcome Back "+res.locals.user.fullname);
});

module.exports = mainRouter;
