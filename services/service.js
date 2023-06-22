const { buildTemplate } = require("../utils/utils");
const ack = require("../callbacks/payloads/ack.json");
const nack = require("../callbacks/payloads/nack.json");
const logger = require("../utils/logger");
const config = require("../utils/config");
const { validateSchema } = require("./validation");
const { trigger } = require("./triggerService");
const operator = require("../operator/util.js");

//getting path object from config file
const paths = config.getPaths();

const onRequest = async (req, res) => {
  try {
    const { api } = req.params;
    const server = config.getServer();
    //getting the callback url from config file
    let callbackConfig;
    let context;
    if (paths[api]) {
      // TODO add senario selection
      context = {
        req_body: req.body,
        apiConfig: paths[api],
      };
      callbackConfig = paths[api].callbacks?.default;
    } else {
      logger.error("Invalid Request");
      return res.json(nack);
    }
    logger.info(`received a request from ${req.url} at ${new Date()}`);

    context.response_uri = resolveObject(context, callbackConfig.uri);
    //validating schema for the request received

    console.log(`Validating ${api} request`);
    if (await validateSchema(context)) {
      console.log(`callback for this request: ${callbackConfig.callback}`);

      //triggering the subsequent request
      payloadConfig = callbackConfig.payload;
      if (payloadConfig != null) {
        let data = "";
        if (payloadConfig["template"]) {
          data = buildTemplate(context, callbackConfig.payload?.template);
        } else {
          data = yaml.dump(payloadConfig);
        }
        if (server.sync_mode) {
          return res.json(data);
        } else {
          trigger(context, callbackConfig, data);
        }
      }
      return res.json(ack);
    } else {
      return res.json(nack);
    }
  } catch (error) {
    logger.error("ERROR!!", error);
    console.trace(error)
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

module.exports = { onRequest };
