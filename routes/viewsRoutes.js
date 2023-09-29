const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');


Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/serverCreation').get(viewsController.serverCreation);
Router.route('/serverRegistration').get(viewsController.serverRegistration);
Router.route('/clientCreation').get(viewsController.clientCreation);
Router.route('/startServer').get(viewsController.startServer);
module.exports = Router;