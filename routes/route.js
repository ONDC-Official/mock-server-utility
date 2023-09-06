const express = require("express");
const router= express.Router();
const {onRequest}= require("../services/service");

router.all("/*", (req, res) => {
  return onRequest(req,res);
  });

  module.exports= router;