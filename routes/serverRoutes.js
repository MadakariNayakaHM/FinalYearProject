const express=require('express');
const authController=require('./../controllers/authController');
const serverController=require('./../controllers/serverController');
const Router = express.Router();

Router.route('/serverCreation').post(serverController.createNewServer);

module.exports=Router;