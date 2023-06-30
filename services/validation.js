const { formatted_error } = require("../utils/utils");
const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
const { createAuthorizationHeader } = require("ondc-crypto-sdk-nodejs");
const { buildTemplate } = require("../utils/utils");
const { trigger } = require("./triggerService");
const { ack, schemaNack } = require("../utils/acknowledgement");
const operator = require("../operator/util.js");
const addFormats = require("ajv-formats");
addFormats(ajv);
require("ajv-errors")(ajv);
const log = require("../utils/logger");
//schema validation

var logger;

const validateSchema = async (context) => {
  logger = log.init();
  logger.info(
    `Inside schema validation service for ${context?.req_body?.context?.action} api`
  );
  try {
    const validate = ajv.compile(context.apiConfig.schema);
    const valid = validate(context.req_body);
    if (!valid) {
      let error_list = validate.errors;
      logger.error(JSON.stringify(formatted_error(error_list)));
      logger.error("Schema validation : FAIL");
      return false;
    } else {
      logger.info("Schema validation : SUCCESS");
      return true;
    }
  } catch (error) {
    logger.error(error);
  }
};

const validateRequest = async (
  context,
  callbackConfig,
  res,
  security,
  server
) => {
  if (await validateSchema(context)) {
    //triggering the subsequent request
    payloadConfig = callbackConfig?.payload;
    if (payloadConfig != null) {
      let data = "";
      if (payloadConfig["template"]) {
        data = buildTemplate(context, callbackConfig?.payload?.template);
      }
      if (security.generate_sign) {
        //create response header
        const header = await createAuthorizationHeader({
          message: data,
          privateKey: security.privatekey,
          bapId: security.subscriber_id, // Subscriber ID that you get after registering to ONDC Network
          bapUniqueKeyId: security.ukId, // Unique Key Id or uKid that you get after registering to ONDC Network
        });

        res.setHeader("Authorization", header);
      }
      if (server.sync_mode) {
        return res.json(data);
      } else {
        context.response_uri = resolveObject(context, callbackConfig.uri);
        logger.info(`callback for this request: ${callbackConfig.callback}`);
        trigger(context, callbackConfig, data);
      }
      return res.json(ack);
    } else {
      return res.json(schemaNack);
    }
  }
};

function resolveObject(context, obj) {
  if (obj["operation"]) {
    return operator.evaluateOperation(context, obj["operation"]);
  } else if (obj["value"]) {
    return obj["value"];
  }
  return obj;
}

module.exports = { validateSchema, validateRequest };
