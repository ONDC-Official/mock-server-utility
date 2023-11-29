const config = require("../utils/config");
const log = require("../utils/logger");
const axios = require("axios");
const {
  createAuthorizationHeader
} = require("ondc-crypto-sdk-nodejs");
//getting path object from config file

var logger;

const trigger = async(context, config, data,security) => {
  logger = log.init();
  let uri = context.req_body.context.bap_uri
  let api = config.callback;
  let delay = config.delay;
  if(uri[uri.length-1]!="/"){ //"add / if not exists in bap uri"
    uri=uri+"/"
  }
  try {
    logger.info("Inside trigger service");
    let header ={}
    if(security.generate_sign){
       header ={
        headers:{
          Authorization:await createAuthorizationHeader({
            message: data,
            privateKey: security.privatekey,
            bapId: security.subscriber_id, // Subscriber ID that you get after registering to ONDC Network
            bapUniqueKeyId: security.ukId, // Unique Key Id or uKid that you get after registering to ONDC Network
          })
        }
    }
    }

    setTimeout(() => {
      axios
        .post(`${uri+api}`, data,header)
        .then((response) => {
          logger.info(
            `Triggered ${api} response at ${uri}${api}`
          );
        })
        .catch(function (error) {
          logger.error(error);
        });
    }, delay);
  } catch (error) {
    logger.error(`!!Error while triggering the response,`, error);
  }
};

module.exports = { trigger };
