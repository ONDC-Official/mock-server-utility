const express = require("express");
const logger=require("./utils/logger");
const app = express();
const config = require("./utils/config.js");
const router = require("./routes/route");
app.use(express.json());
const server=config.getServer();

app.listen(server.port, () => {
  logger.info(`This app is running on port number : ${server.port}`);
});

app.use(router);
