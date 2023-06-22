const fs = require('fs');
// const yaml = require('js-yaml');
// const fs = require('fs');
const yaml = require('yaml');
const $RefParser = require('json-schema-ref-parser');

const filePath = "./config.yaml";
const yamlString = fs.readFileSync(filePath, 'utf8');
const yamlObject = yaml.parse(yamlString);
let config= yamlObject;
$RefParser.dereference(yamlObject)
  .then((schema) => {
    config = schema;
    const resolvedYamlString = yaml.stringify(schema);
    // console.log("Config Read: \n", resolvedYamlString);
  })
  .catch((error) => {
    console.error('Error parsing schema:', error);
  });
function getServer(){
    const server=config.server;
    return server;
}

function getPaths(){
   return config.path;
}

function getLog (){
  return config.log;
}

module.exports={
 getServer ,getPaths,getLog}