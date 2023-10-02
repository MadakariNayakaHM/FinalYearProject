const express = require('express');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const Server = require('./../models/serverModel');



exports.homePage = async (req, res, next) => {
    res.status(200).render('home');
}



exports.signupPage = async (req, res, next) => {
    res.status(200).render('signup');
}

exports.loginPage = async (req, res, next) => {
    res.status(200).render('login');
}

exports.userProfile = async (req, res) => {
    res.status(200).render("userProfile");
}

exports.updateUserData = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        }, {
            new: true,
            runValidators: true
        });
        res.status(200).render('userProfile', {
            user: updatedUser
        });

    } catch (err) {
        res.status(404).json({
            status: "Failed",
            data: {
                error: err
            }
        })
    }


}


exports.serverCreation = async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function (err, decoded) { return decoded.id; });
        let user = await User.findById(decoded)
        res.status(200).render('serverCreation', { user })
    }
    catch (e) {
        console.log("error in serverCreation viewes controler ", e)
    }
}


exports.serverRegistration = async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function (err, decoded) { return decoded.id; });
        let user = await User.findById(decoded)
        res.status(200).render('serverRegistration', { user })
    }
    catch (e) {
        console.log("error in server Registration viewes controler ", e)
    }
}

exports.clientCreation = async (req, res, next) => {


    try {

        const servers = await Server.find();

        let decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function (err, decoded) { return decoded.id; });
        let user = await User.findById(decoded)
        res.status(200).render('clientCreation', { user, servers })
    }
    catch (e) {
        console.log("error in client registration viewes controler ", e)
    }
}

exports.startServer = async (req, res, next) => {


    try {

        const servers = await Server.find();


        res.status(200).render('startServer', { servers })
    }
    catch (e) {
        console.log("error in start server viewes controler ", e)
    }
}
