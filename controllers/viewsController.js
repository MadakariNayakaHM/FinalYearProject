const express = require('express');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const Server= require('./../models/serverModel');



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
    let decoded = jwt.verify( req.cookies.jwt, process.env.JWT_SECRET,function (err, decoded) { return decoded.id; });
    let user= await  User.findById(decoded)
    res.status(200).render('serverCreation',{user})
}
catch(e)
{
    console.log("error in serverCreation viewes controler ",e)
}
}


exports.serverRegistration=async (req,res,next)=>
{
try{
    let decoded = jwt.verify( req.cookies.jwt, process.env.JWT_SECRET,function (err, decoded) { return decoded.id; });
    let user= await  User.findById(decoded)
    res.status(200).render('serverRegistration',{user})
}
catch(e)
{
    console.log("error in server Registration viewes controler ",e)
}
}

exports.clientCreation=async (req,res,next)=>
{


    try{

        const servers= await Server.find();

        let decoded = jwt.verify( req.cookies.jwt, process.env.JWT_SECRET,function (err, decoded) { return decoded.id; });
        let user= await  User.findById(decoded)
        res.status(200).render('clientCreation',{user, servers})
    }
    catch(e)
    {
        console.log("error in client registration viewes controler ",e)
    }
}