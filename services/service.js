const { getPublicKey } = require("../utils/utils");
const { isSignatureValid } = require("ondc-crypto-sdk-nodejs");
const { signNack, invalidNack } = require("../utils/acknowledgement");
const log = require("../utils/logger");
const config = require("../utils/config");
const { validateRequest } = require("./validation");

//getting path object from config file

var paths;
var props;
var security;
var logger;
var server;

const onRequest = async (req, res) => {
  if (paths == undefined) {
    logger = log.init();
    props = config.getConfig();
    security = props.security;
    server = props.server;
    paths = props.path;
  }
  try {
    const { api } = req.params;
    if (security.verify_sign) {
      const headers = req.headers;
      // const public_key = await getPublicKey(security.lookup_uri, headers);
      // logger.info(`Public key retrieved from registry : ${public_key}`);
      const public_key = security.publickey;
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
      logger.info("Signature verified");
    }

    //getting the callback url from config file
    let callbackConfig;
    let context;
    if (paths[api]) {
      // TODO add senario selection
      context = {
        req_body: req.body,
        apiConfig: paths[api],
      };
      callbackConfig = paths[api]?.callbacks?.default;
    } else {
      logger.error("Invalid Request");
      return res.json(invalidNack);
    }
    logger.info(`Received a request from ${req.url} at ${new Date()}`);
    logger.info(`Validating ${api} request`);
    await validateRequest(context, callbackConfig, res, security, server);
  } catch (error) {
    logger.error("ERROR!!", error);
    console.trace(error);
  }
};

module.exports = { onRequest };
