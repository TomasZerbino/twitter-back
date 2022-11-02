const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Tweet = require("../models/Tweet");
const formidable = require("formidable");

// Display a listing of the resource.

async function register(req, res) {
  res.render("register");
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  // const userAutentication = await User.findOne({ email: req.body.email });
  // const passwordAutentication = req.body.password === req.body.confirmPassword;
  // if (!userAutentication & passwordAutentication) {
  //   const hashedPassword = await bcrypt.hash(req.body.password, 10);
  //   const userCreated = await User.create({
  //     firstname: req.body.firstname,
  //     lastname: req.body.lastname,
  //     email: req.body.email,
  //     username: req.body.username,
  //     password: hashedPassword,
  //   });
  //   if (userCreated) {
  //     req.login(userCreated, function () {
  //       res.redirect("/login");
  //     });
  //   }
  // } else {
  //   if (!passwordAutentication) {
  //     req.flash("user", "⚠️  Password confirmation doesn't match Password!");
  //     res.redirect("back");
  //   } else {
  //     req.flash("user", "⚠️  User already exists!");
  //     res.redirect("back");
  //   }
  // }
}
// Update the specified resource in storage.
async function update(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet.likes.includes(req.user._id)) {
    const liked = tweet.likes.indexOf(req.user._id);
    tweet.likes.splice(liked, 1);
  } else {
    tweet.likes.push(req.user._id);
  }
  await tweet.save();
  res.redirect("/");
}
// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const userAutentication = await User.findOne({ email: fields.email });
    const passwordAutentication = fields.password === fields.confirmPassword;
    if (!userAutentication & passwordAutentication) {
      const hashedPassword = await bcrypt.hash(fields.password, 10);

      const userCreated = await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        email: fields.email,
        username: fields.username,
        password: hashedPassword,
        avatar: files.image.newFilename,
      });

      if (userCreated) {
        req.login(userCreated, function () {
          res.redirect("/login");
        });
      }
    } else {
      if (!passwordAutentication) {
        req.flash("user", "⚠️  Password confirmation doesn't match Password!");
        res.redirect("back");
      } else {
        req.flash("user", "⚠️  User already exists!");
        res.redirect("back");
      }
    }
  });
}

async function showFollowers(req, res) {
  const userInfo = await User.findOne({ email: req.user.email }).populate("followers");
  followers = userInfo.followers;

  res.render("follows", followers);
}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  // index,
  register,
  showFollowers,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
