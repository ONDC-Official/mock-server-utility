const { buildTemplate, getPublicKey } = require("../utils/utils");
const {
  createAuthorizationHeader,
  isSignatureValid,
} = require("ondc-crypto-sdk-nodejs");
const {
  ack,
  signNack,
  schemaNack,
  invalidNack,
} = require("../callbacks/payloads/acknowledgement");
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

    const headers = req.headers;
    const public_key = await getPublicKey(headers, server.type);
    logger.info(`Public key retrieved from registry : ${public_key}`);
    //Validate the request source against the registry
    const isValidSource = await isSignatureValid({
      header: headers.authorization, // The Authorisation header sent by other network participants
      body: req.body,
      publicKey: public_key,
    });
    if (!isValidSource) {
      logger.error("Signature not verified");
      return res.json(signNack);
    }
    logger.error("Signature verified");
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
      return res.json(invalidNack);
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

      const reqObj = context.req_body;
      //create response header
      const header = await createAuthorizationHeader({
        message: { context: reqObj.context, message: reqObj.message },
        privateKey: server.privatekey,
        bapId: server.subscriber_id, // Subscriber ID that you get after registering to ONDC Network
        bapUniqueKeyId: server.ukId, // Unique Key Id or uKid that you get after registering to ONDC Network
      });

      res.setHeader("Authorization", header);

      return res.json(ack);
    } else {
      return res.json(schemaNack);
    }
  } catch (error) {
    logger.error("ERROR!!", error);
    console.trace(error);
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
