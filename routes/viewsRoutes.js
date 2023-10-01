const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
Router.use(authController.isLoggedIn);
Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/userProfile').get(authController.protect, viewsController.userProfile);
Router.post('/submit-user-data', authController.protect, viewsController.updateUserData);
Router.route('/logout').get(authController.logout, viewsController.homePage);

module.exports = Router;