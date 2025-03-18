const express = require("express");
const router = require("./routers");
const { errorHendler } = require("./errors");
const app = express();

app.use(express.json());
app.use(errorHendler)
app.use(router);



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
