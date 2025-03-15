const fs = require("fs").promises;
const path = require("path");

const userDbPath = path.resolve(__dirname, "..", "db", "users.json");

class User {
  constructor(userData) {
    const { name, email } = userData;

    this.name = name;
    this.email = email;

    return Promise.resolve(this);
  }

  static async create(userData) {
    const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDB = userDBString ? JSON.parse(userDBString) : [];

    const newUser = await new User(userData);

    newUser.id = Date.now();

    userDB.push(newUser);

    await fs.writeFile(userDbPath, JSON.stringify(userDB, null, 4));

    return newUser;
  }

  static async findAll() {
    const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDB = userDBString ? JSON.parse(userDBString) : [];

    return userDB;
  }
}

module.exports = User