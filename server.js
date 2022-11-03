require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const { dbInitialSetup } = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT;
const app = express();

app.use(express.json());

routes(app);

/* dbInitialSetup(); */

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
