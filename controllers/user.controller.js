const User = require("../models");
const createHttpError = require('http-errors')

module.exports.createUser = async (req, res, next) => {
 try {
  const { user: userData, body, file } = req;

  const user = await User.create({...userData, imagePath: file.filename});

  res.send({body, file});
 } catch (error) {
  next(error)
 }
};

module.exports.findAll = async (req, res) => {
  const users = await User.findAll();

  res.send(users);
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
  
    const user = await User.findById(+userId);

    if(!user) {
      const error = createHttpError(404, 'user was lost')
      return  next(error)
    }
  
    res.send(user);
  } catch (error) {
    next(error)
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
  
    const deleteUser = await User.deleteUserById(+userId);
  
    res.send(deleteUser);
  } catch (error) {
    next(error )
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  const updateUser = await User.updateById(+userId, body);

  res.send(updateUser);
};
