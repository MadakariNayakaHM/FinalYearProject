const express = require('express');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');



exports.homePage = async (req, res, next) => {
    res.status(200).render('home');
}



exports.signupPage = async (req, res, next) => {
    res.status(200).render('signup');
}

exports.loginPage = async (req, res, next) => {
    res.status(200).render('login');
}

exports.serverCreation=async (req,res,next)=>
{
try{

}
catch(e)
{
    console.log("error in serverCreation viewes controler ",e)
}
}

exports.clientCreation=async (req,res,next)=>
{
    res.status(200).render('clientCreation')
}