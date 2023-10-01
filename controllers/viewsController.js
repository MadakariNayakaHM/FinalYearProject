const express = require('express');
const User = require('./../models/userModel');




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


