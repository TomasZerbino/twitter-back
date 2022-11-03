const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");

// async function storeUser(req, res) {
//   console.log(req.body);
//   const userAutentication = await User.findOne({ email: req.body.email });
//   const passwordAutentication = req.body.password === req.body.confirmPassword;
//   if (!userAutentication && passwordAutentication) {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const userCreated = await User.create({
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     if (userCreated) {
//       //   req.login(userCreated, function () {
//       //     res.redirect("/login");
//       //   });
//       return res.json(userCreated);
//     }
//   } else {
//     if (!passwordAutentication) {
//       res.json("Password confirmation doesn't match Password");
//       //   req.flash("user", "⚠️  Password confirmation doesn't match Password!");
//       //   res.redirect("back");
//     } else {
//       res.json("User already exists");
//       //   req.flash("user", "⚠️  User already exists!");
//       //   res.redirect("back");
//     }
//   }
// }

function storeUser(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
    uploadDir: __dirname + "/../public/img",
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
        const user = await User.findOne({ email: fields.email });
        const payload = {
          id: user._id,
          email: user.email,
          following: user.following,
          // firstname: user.firstname,
          // lastname: user.lastname,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(token);
        return res.json({ token });
      }
    } else {
      if (!passwordAutentication) {
        res.json("Password confirmation doesn't match Password");
        //   req.flash("user", "⚠️  Password confirmation doesn't match Password!");
        //   res.redirect("back");
      } else {
        res.json("User already exists");
        //   req.flash("user", "⚠️  User already exists!");
        res.redirect("back");
      }
    }
  });
}

async function token(req, res) {
  const user = await User.findOne({ email: req.body.email });
  const storedHash = user.password;
  const checkPassword = await bcrypt.compare(req.body.password, storedHash);

  if (!user) {
    return res.json("credenciales inválidas user");
  }

  if (!checkPassword) {
    return res.json("credenciales inválidas password");
  }

  const payload = {
    id: user._id,
    email: user.email,
    following: user.following,
    // firstname: user.firstname,
    // lastname: user.lastname,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  console.log(token);
  res.json({ token });
}

async function createTweet(req, res) {
  const tweet = await Tweet.create({
    content: req.body.content,
    author: req.auth.id,
    likes: [],
  });

  res.json(tweet);
}

async function destroyTweet(req, res) {
  const tweet = await Tweet.findByIdAndDelete(req.params.id);
  res.json(tweet);
}

async function showTweets(req, res) {
  if (req.auth.id) {
    const tweets = await Tweet.find({ author: { $in: [req.auth.following, req.auth.id] } })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(tweets);
  } else {
    const tweets = await Tweet.find().populate("author").sort({ createdAt: -1 }).limit(20);
    res.json(tweets);
  }
}

async function updateLikes(req, res) {
  const tweet = await Tweet.findById(req.params.id);
  if (tweet.likes.includes(req.auth.id)) {
    const liked = tweet.likes.indexOf(req.auth.id);
    tweet.likes.splice(liked, 1);
  } else {
    tweet.likes.push(req.auth.id);
  }
  await tweet.save();
  // res.redirect("/");
  res.json(tweet.likes);
}

module.exports = {
  createTweet,
  updateLikes,
  storeUser,
  token,
  destroyTweet,
  showTweets,
};
