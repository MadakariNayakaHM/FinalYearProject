const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');


Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/serverCreation').get(viewsController.serverCreation);
Router.route('/clientCreation').get(viewsController.clientCreation);
module.exports = Router;