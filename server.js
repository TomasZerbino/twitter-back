require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const { dbInitialSetup } = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT;
const methodOverride = require("method-override");
const app = express();
const flash = require("express-flash");
const passport = require("./config/passport-local");
const session = require("express-session");

passport(app);

app.use(flash());
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

routes(app);

/* dbInitialSetup(); */

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
