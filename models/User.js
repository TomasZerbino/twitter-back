const { mongoose, Schema } = require("../dbInitialSetup");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    avatar: String,
    password: String,
    bio: String,
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
