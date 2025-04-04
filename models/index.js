const fs = require("fs").promises;
const path = require("path");

const userDbPath = path.resolve(__dirname, "..", "db", "users.json");

class User {
  constructor(userData) {
    const { name, email, imagePath = null } = userData;

    this.name = name;
    this.email = email;
    this.imagePath = imagePath;

    return Promise.resolve(this);
  }

  static async create(userData) {
    // const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDBString = await fs.readFile(userDbPath, {
      encoding: "utf-8",
      flag: "a+",
    });

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

  static async findById(id) {
    const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDB = userDBString ? JSON.parse(userDBString) : [];

    const foundUser = userDB.find((user, index, arr) => user.id === id);

    // if (foundUser) {
    //   return foundUser;
    // } else {
    //   throw new Error("user not found");
    // }
  }

  static async deleteUserById(id) {
    const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDB = userDBString ? JSON.parse(userDBString) : [];

    const foundUser = userDB.find((user, index, arr) => user.id === id);

    const newUserDB = userDB.filter((user) => user.id !== id);

    await fs.writeFile(userDbPath, JSON.stringify(newUserDB, null, 4));

    return foundUser;
  }

  static async updateById(id, newValues) {
    const userDBString = await fs.readFile(userDbPath, "utf-8");

    const userDB = userDBString ? JSON.parse(userDBString) : [];

    const foundUser = userDB.find((user, index, arr) => user.id === id);

    if (foundUser) {
      const userValuesToUpdate = Object.entries(newValues);

      for (const [key, value] of userValuesToUpdate) {
        foundUser[key] = value;
      }

      await fs.writeFile(userDbPath, JSON.stringify(userDB, null, 4));

      return foundUser;
    } else {
      throw new Error("user not found");
    }
  }
}

module.exports = User;
