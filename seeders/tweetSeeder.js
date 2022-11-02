const { faker } = require("@faker-js/faker");
const Tweet = require("../models/Tweet");
const { mongoose } = require("mongoose");
const User = require("../models/User");

module.exports = async () => {
  /*  await mongoose.connection.dropDatabase(); */
  const tweets = [];

  const users = await User.find();

  for (let i = 0; i < 300; i++) {
    const randomUser = users[faker.datatype.number({ min: 0, max: users.length - 1 })];

    let qtyLikes = faker.datatype.number({ min: 0, max: users.length - 1 });
    const tweet = new Tweet({
      content: faker.lorem.sentence(5),
      author: randomUser,
      createdAt: faker.date.recent(10)
    });

    for (let i = 0; i < qtyLikes; i++) {
      let random = users[faker.datatype.number({ min: 0, max: users.length - 1 })];

      while (tweet.likes.find((element) => element._id === random._id)) {
        random = users[faker.datatype.number({ min: 0, max: users.length - 1 })];
      }
      
      tweet.likes.push(random._id);
    }

    tweets.push(tweet);
    randomUser.tweets.push(tweet);
    await randomUser.save();
  }

  await Tweet.insertMany(tweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
};
