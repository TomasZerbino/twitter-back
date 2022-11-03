const express = require("express");
const apiRouter = express.Router();
const apiController = require("../controllers/apiController");
const { expressjwt: checkJwt } = require("express-jwt");

apiRouter.post("/register", apiController.storeUser);

apiRouter.post("/token", apiController.token);

apiRouter.post(
  "/tweet",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.createTweet,
);

apiRouter.delete("/destroy/:id", apiController.destroyTweet);

apiRouter.get(
  "/tweets",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.showTweets,
);

apiRouter.patch(
  "/likes/:id",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  apiController.updateLikes,
);

module.exports = apiRouter;
