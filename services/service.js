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
} = require("../on_demand/payloads/acknowledgement");
const log = require("../utils/logger");
const config = require("../utils/config");
const { validateSchema } = require("./validation");
const { trigger } = require("./triggerService");
const operator = require("../operator/util.js");

//getting path object from config file

var paths;
var props;
var security;
var logger;
var server

const onRequest = async (req, res) => {
  if(paths==undefined){
    logger = log.init()
    props = config.getConfig()
    security = props.security
    server = props.server
    paths = props.path
    logger.debug("security", security)
  }
  try {
    const { api } = req.params;
    if(security.verify_sign){
      const headers = req.headers;
      const public_key = await getPublicKey(security.lookup_uri, headers);
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

    //validating schema for the request received
    
    console.log(`Validating ${api} request`);
    if (await validateSchema(context)) {
      
      //triggering the subsequent request
      payloadConfig = callbackConfig.payload;
      if (payloadConfig != null) {
        let data = "";
        if (payloadConfig["template"]) {
          data = buildTemplate(context, callbackConfig.payload?.template);
        }
        if(security.generate_sign){
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
          console.log(`callback for this request: ${callbackConfig.callback}`);
          trigger(context, callbackConfig, data);
        }
      }
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
