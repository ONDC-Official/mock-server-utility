const { formatted_error } = require("../utils/utils");
const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);
const logger = require("../utils/logger");
//schema validation

const validateSchema = async (context) => {
  console.log(`inside schema validation service for ${context.req_body}`);
  try {
    const validate = ajv.compile(context.apiConfig.schema);
    const valid = validate(context.req_body);
    if (!valid) {
      let error_list = validate.errors;
      logger.error(JSON.stringify(formatted_error(error_list)));
      console.log("Schema validation : FAIL");
      return false;
    } else {
      console.log("Schema validation : SUCCESS");
      return true;
    }
  } catch (error) {
    logger.error(error);
  }
};
module.exports = { validateSchema };

