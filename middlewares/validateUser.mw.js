const yup = require("yup");

const USER_CREATION_SCHEMA = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  // .matches(/^[a-zA-Z0-9@!#$&]{8,32}$/),
});

const vaidateUser = async (req, res, next) => {
  try {
    const user = await USER_CREATION_SCHEMA.validate(req.body);

    req.user = user;
    next();
  } catch (error) {
    res.send("Error invalid data");
  }
};

module.exports.vaidateUser = vaidateUser