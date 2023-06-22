const logger = require("../utils/logger");
const fs = require('fs');
const yaml = require('js-yaml');
const config = require("../utils/config");
const operator = require("../operator/util.js")

//we are getting the schemas from a url but we can get it from a local file as well

const resolveTemplate = (context, template, values) => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    var value = values[key]
    if(value && value["operation"]){
        value = operator.evaluateOperation(context, value["operation"]);
    }
    return value !== undefined ? value : match;
  });
}

const buildTemplate = (context, templateConfig) => {
  const template = yaml.dump(templateConfig.data);
  const template_dict = templateConfig.dict;
  let response = resolveTemplate(context, template, template_dict);
  response = yaml.load(response)
  return response;
};

const formatted_error = (errors) => {
  error_list = [];
  let status = "";
  errors.forEach((error) => {
    if (
      !["not", "oneOf", "anyOf", "allOf", "if", "then", "else"].includes(
        error.keyword
      )
    ) {
      error_dict = {
        message: `${error.message}${error.params.allowedValues ? ` (${error.params.allowedValues})` : ""
          }${error.params.allowedValue ? ` (${error.params.allowedValue})` : ""}${error.params.additionalProperty
            ? ` (${error.params.additionalProperty})`
            : ""
          }`,
        details: error.instancePath,
      };
      error_list.push(error_dict);
    }
  });
  if (error_list.length === 0) status = "pass";
  else status = "fail";
  error_json = { errors: error_list, status: status };
  return error_json;
};

module.exports = {
  resolveTemplate,
  buildTemplate,
  formatted_error
};