const User = require("../models");

const createUser = async (req, res) => {
  const { user: userData } = req;

  const user = await User.create(userData);

  res.send(user);
};

const fintAll = async (req, res) => {
  const users = await User.findAll();

  res.send(users);
};

module.exports.createUser = createUser;

module.exports.fintAll = fintAll;
