const express = require("express");
const Router = express.Router();
const predictionControoller = require('../controllers/predictionController')


Router.get("/prediction", predictionControoller.predictions);


module.exports = Router;