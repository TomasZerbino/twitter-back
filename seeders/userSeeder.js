const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  await mongoose.connection.dropDatabase();
  const users = [];

  for (let i = 0; i < 20; i++) {
    const hashedPassword = await bcrypt.hash("1234", 10);
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      username: faker.internet.userName(),
      password: hashedPassword,
      bio: faker.lorem.paragraphs(),
    });
    users.push(user);
  }

  for (let i = 0; i < users.length; i++) {
    let random = faker.datatype.number({ min: 0, max: users.length - 1 });
    while (random === i) {
      random = faker.datatype.number({ min: 0, max: users.length - 1 });
    }
    users[i].following.push(users[random]._id);
    users[random].followers.push(users[i]._id);
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
