const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');


Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
module.exports = Router;