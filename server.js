const express = require("express");
const helmet = require("helmet");

const apiRouter = require("./index.js");

const server = express();

server.use(helmet());

server.use("/", apiRouter);

module.exports = server;
