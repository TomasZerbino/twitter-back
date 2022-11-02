const express = require("express");
const publicRouter = express.Router();
const userController = require("../controllers/userController");
const pagesController = require("../controllers/pagesController");
const loginController = require("../controllers/loginController");
const tweetController = require("../controllers/tweetController");
const unLoggedUserRedirect = require("../middlewares/redirectUnLoggedUser");
const passport = require("passport");

// Rutas Públicas:
// ...
publicRouter.get("/", pagesController.showHome);

publicRouter.post("/", unLoggedUserRedirect, tweetController.create);

publicRouter.get("/profile", pagesController.showProfile);

publicRouter.get("/profile", unLoggedUserRedirect, pagesController.showProfile);

publicRouter.delete("/profile/:id", tweetController.deleteTweet);

publicRouter.get("/register", userController.register);

publicRouter.post("/register", userController.store);

publicRouter.get("/user/create", userController.create);

publicRouter.get("/login", loginController.show);

publicRouter.get("/follows", unLoggedUserRedirect, userController.showFollowers);

publicRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  // loginController.login
);

publicRouter.get("/logout", loginController.logout);

publicRouter.patch("/likes/:id", unLoggedUserRedirect, userController.update);

module.exports = publicRouter;
