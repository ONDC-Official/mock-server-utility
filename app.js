const express = require("express");
const log = require("./utils/logger");
const app = express();
const config = require("./utils/config.js");
const router = require("./routes/route");



const args = process.argv.slice(2);
var configFile = args[0]
if (!configFile || configFile == "") {
  configFile = "./config.yaml"
}

async function startUp() {
  await config.loadConfig(configFile);
  const server = config.getServer();
  app.use(express.json());
  const logger = log.init();
  app.listen(server.port, () => {
    logger.info(`This app is running on port number : ${server.port}`);
  });
  
  app.use(router);
}

startUp()

