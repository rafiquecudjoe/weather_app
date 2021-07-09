const { response } = require("express");
const express = require("express");

const Router = require("./Router")

const server = express();

const port = 5000;

server.use(express.urlencoded({ extended: true }));
server.use(Router)


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
