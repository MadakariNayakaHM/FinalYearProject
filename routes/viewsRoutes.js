const express = require('express');
const Router = express.Router();
const viewsController = require('./../controllers/viewsController');
const authController = require('./../controllers/authController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

Router.use(authController.isLoggedIn);

Router.route('/home').get(viewsController.homePage);
Router.get("/signup", viewsController.signupPage);
Router.route('/login').get(viewsController.loginPage);
Router.route('/userProfile').get(authController.protect, viewsController.userProfile);
Router.post('/submit-user-data', upload.single('photo'), authController.protect, viewsController.updateUserData);



Router.route('/serverCreation').get(viewsController.serverCreation);
Router.route('/serverRegistration').get(viewsController.serverRegistration);
Router.route('/clientCreation').get(viewsController.clientCreation);
Router.route('/startServer').get(viewsController.startServer);
Router.route('/serverDynamicData').get(viewsController.serverDynamicData);
Router.route('/serverDynamicDataFE').get(viewsController.serverDynamicDataFE);
module.exports = Router;