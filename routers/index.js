const express = require("express");
const multer = require("multer");
const { vaidateUser } = require("../middlewares/validateUser.mw");
const UserController = require("../controllers/user.controller");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

router
  .route("/users")
  .post(upload.single('imagePath'), vaidateUser, UserController.createUser)
  .get(UserController.findAll);

router
  .route("/users/:userId")
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);


module.exports = router;
