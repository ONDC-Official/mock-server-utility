const express = require("express");
const router= express.Router();
const {onRequest}= require("../services/service");

router.post("/:api", (req, res) => {
  return onRequest(req,res);
  });

  module.exports= router;