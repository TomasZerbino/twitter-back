const apiRouter = require("./apiRoutes");

module.exports = (app) => {
  app.use("/api", apiRouter);
};
