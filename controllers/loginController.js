const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { use } = require("../routes/publicRoutes");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const userName = req.flash("user");

  res.render("login", { userName });
}

async function login(req, res) {
  console.log(res.locals);
}
// Show the form for creating a new resource
// async function authenticate(req, res) {
//   req.flash("user", "Incorrect Email or Password");
//   res.redirect("back");
// }

async function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  logout,
  index,
  show,
  store,
  edit,
  update,
  destroy,
  login,
  // authenticate,
};
