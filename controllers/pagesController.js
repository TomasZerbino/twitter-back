const Tweet = require("../models/Tweet");

async function showHome(req, res) {
  if (req.isAuthenticated()) {
    const tweets = await Tweet.find({ author: { $in: [req.user.following, req.user._id] } })
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(20);
    res.render("home", { tweets, req });
  } else {
    const tweets = await Tweet.find().populate("author").sort({ createdAt: -1 }).limit(20);
    res.render("home", { tweets, req });
  }
}

async function showProfile(req, res) {
  const tweets = await Tweet.find({ author: { $in: [req.user._id] } }).limit(20);
  res.render("profile", {
    tweets,
  });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

// Otros handlers...
// ...

module.exports = {
  showHome,
  showProfile,
  showContact,
  showAboutUs,
};
