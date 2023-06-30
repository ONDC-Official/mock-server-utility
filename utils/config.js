const fs = require("fs");
// const yaml = require('js-yaml');
// const fs = require('fs');
const yaml = require("yaml");
const $RefParser = require("json-schema-ref-parser");

var config;

async function loadConfig(filePath) {
  // const filePath = "./config.yaml";
  const yamlString = fs.readFileSync(filePath, "utf8");
  const yamlObject = yaml.parse(yamlString);
  // config = yamlObject;
  config = await $RefParser.dereference(yamlObject);
}

function getConfig() {
  if (!config) {
    loadConfig("./config.yaml");
  }
  return config;
}

function getServer() {
  const server = config.server;
  return server;
}

function getPaths() {
  return config.path;
}

function getLog() {
  return config.log;
}

module.exports = {
  getServer,
  getPaths,
  getLog,
  loadConfig,
  getConfig,
};
