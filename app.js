const express = require("express");

const app = express();
const { vaidateUser } = require("./middlewares/validateUser.mw");
const { createUser, fintAll } = require("./controllers/user.controller");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

const bodyParser = express.json();

app.post("/users", bodyParser, vaidateUser, createUser);

app.get("/users", bodyParser, fintAll);
