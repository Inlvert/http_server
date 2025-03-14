let users = [];

const createUser = async (req, res) => {
  const { user } = req;

  user.id = Date.now();

  users.push(user);

  console.log(users);
  res.send(user);
}

module.exports.createUser = createUser;