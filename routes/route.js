const express = require("express");
const router= express.Router();
const {onRequest}= require("../services/service");

router.all("/*", (req, res,next) => {
  if(req.path ==='/favicon.ico'){
    return next()
  }
  return onRequest(req,res);
  });

  module.exports= router;