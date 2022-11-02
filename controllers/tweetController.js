const Tweet = require("../models/Tweet");
const User = require("../models/Tweet");
// Display a listing of the resource.

async function deleteTweet(req, res) {
  const tweet = await Tweet.findByIdAndDelete(req.params.id);
  res.redirect("back");
}

// Display the specified resource.
async function show(req, res) {}

// Show the form for creating a new resource
async function create(req, res) {
  await Tweet.create({
    content: req.body.content,
    author: req.user._id,
    likes: [],
  });

  await res.redirect("/");
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
  deleteTweet,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
