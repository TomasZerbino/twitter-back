const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");

apiRouter.post("/", apiController.storeUser);

apiRouter.post("/token", apiController.token);

apiRouter.post(
  "/tweet",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.create,
);

apiRouter.delete("/destroy/:id", apiController.destroyTweet);

apiRouter.get(
  "/home",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.showTweets,
);

module.exports = apiRouter;
