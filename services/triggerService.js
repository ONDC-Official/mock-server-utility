const config = require("../utils/config");
const log = require("../utils/logger");
const axios= require('axios')

//getting path object from config file

var logger;

const trigger = (context, config ,data) => {
  logger = log.init()
  let uri = context.response_uri
  let api = config.callback;
  let delay = config.delay
    try {
      console.log("inside trigger service");
      setTimeout(() => {
        axios
          .post(`${uri + api}`, data)
          .then((response) => {
           
            logger.info(
              `triggered ${uri}${api} at ${new Date()} and received ${response.data}`
            );
          })
          .catch(function (error) {
            logger.error(error);
          });
      }, delay);
    } catch (error) {
      logger.error(`!!Error while triggering the request,`, error);
    }
  };

  module.exports={trigger}