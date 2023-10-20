const config = require("../utils/config");
const log = require("../utils/logger");
const axios = require("axios");

//getting path object from config file

var logger;

const trigger = (context, config, data) => {
  logger = log.init();
  let uri = context.req_body.context.bap_uri
  let api = config.callback;
  let delay = config.delay;
  if(uri[uri.length-1]!="/"){ //"add / if not exists in bap uri"
    uri=uri+"/"
  }
  try {
    logger.info("Inside trigger service");
    setTimeout(() => {
      axios
        .post(`${uri+api}`, data)
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
