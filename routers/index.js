const express = require("express");

const { vaidateUser } = require("../middlewares/validateUser.mw");
const UserController = require("../controllers/user.controller");
const { upload } = require("../utils/multer");
const router = express.Router();

router
  .route("/users")
  .post(upload.single("imagePath"), vaidateUser, UserController.createUser)
  .get(UserController.findAll);

router
  .route("/users/:userId")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

module.exports = router;
