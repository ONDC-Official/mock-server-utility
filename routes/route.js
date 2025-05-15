const express = require("express");
const router= express.Router();
const {onRequest}= require("../services/service");
const { healthController } = require("../services/health");

router.all("/*", (req, res,next) => {
  if (req.path === '/health'){
    healthController(req,res)
  }else if(req.path === '/health-self') {
      res.status(200).send(`STATUS:UP,TIMESTAMP:${new Date().toISOString()}`);
  } else if(req.path ==='/favicon.ico'){
    return next()
  }
  else{
    return onRequest(req,res);
  }
});

module.exports= router;