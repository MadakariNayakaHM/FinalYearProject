const express = require('express');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const Server = require('./../models/serverModel');
const Client= require('./../models/clientModel');
const opcua=require('node-opcua');
const WebSocket = require('ws');
const sharp = require("sharp")
const path = require('path');
const fs = require("fs");


function deleteImage(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            // console.log("deletedd.....................")
        }
    });
}

async function updatePhoto(req) {
    return new Promise(async (resolve, reject) => {
        try {
            const newImage = "/" + `${Date.now()}` + req.user.id + ".png";
            const outputFilePath = path.resolve(`./public/uploads`) + newImage;
            const img = path.resolve(`./public/uploads`) + "/" + req.file.filename;
            await sharp(img).resize({ width: 400, height: 400 }).toFormat('png').png({ quality: 50 }).toFile(outputFilePath);

            if (req.user.photo != "/uploads/default.png") {
                const oldImage1 = path.resolve(`./public`) + req.user.photo;
                const oldImage2 = path.resolve(`./public/uploads`) + "/" + req.file.filename;
                deleteImage(oldImage1);
                deleteImage(oldImage2);
            } else {
                const oldImage2 = path.resolve(`./public/uploads`) + "/" + req.file.filename;
                deleteImage(oldImage2);
            }
            resolve(newImage);
        } catch (err) {
            console.log(err);
            reject("failed");
        }
    })
}

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
const maxRetries = 5;
const delayBetweenRetries = 1000; // 1 second
let retries = 0;

function deleteFileWithRetry(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file (retry ${retries}): ${err.message}`);
            if (retries < maxRetries) {
                retries++;
                setTimeout(() => deleteFileWithRetry(filePath), delayBetweenRetries);
            } else {
                console.error(`Max retries reached. Unable to delete file: ${err.message}`);
            }
        } else {
            console.log('File deleted successfully');
        }
    });
}

exports.updateUserData = async (req, res) => {
    try {
        if (req.file) {
            const userPhoto = await updatePhoto(req);
            if (userPhoto != "failed")
                req.user.photo = "/uploads" + userPhoto;
            else {
                throw new Error('photo upload failed');
            }
        }
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            photo: req.user.photo,
        }, {
            new: true,
            runValidators: true
        });
        const message = 'Profile updated successfully';
        res.status(200).render('userProfile', {
            user: updatedUser,
            message: message
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).json({
            status: "Failed",
            data: {
                error: err
            }
        });

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

// exports.serverDynamicData=async (req,res,next)=>
// {
//     const serverName = "server1";

//     const accessId = "12345678";

//     const dataToUpdate = [];

//       const ser = await Server.findOne({serverName:serverName})
//       const endpoint= ser.serverEndPoint
//       const dataName= ser.data[0].dataName





//         if(ser.accessId==accessId)
//       {
//         const endpointUrl = endpoint;

//         (async () => {
//           try {
//             const options = {
//               endpointMustExist: false,
//             };

//             const client = opcua.OPCUAClient.create(options);

//             // Step 1: Connect to the server
//             try {
//                 console.log('Before connecting to server...');
//                 await client.connect(endpointUrl);
//                 console.log('After connecting to server...');
//               } catch (error) {
//                 console.error('Error connecting to server:', error.message);
//               }


//             // Step 2: Create a session
//             console.log('Creating a session...');
//             const session = await client.createSession();
//             console.log('Session created');

//             // Step 3: Browse the server's address space (here we start from the RootFolder)
//             console.log('Browsing the address space...');
//             const browseResult = await session.browse('RootFolder');
//             console.log('Browsing completed. Results:');






//             // Step 4: Iterate through the references and read data from variables
//             for (const reference of browseResult.references) {
//                 const nodeId = reference.nodeId.toString();
//                 const browseName = reference.browseName.toString();

//                 console.log(`Node BrowseName: ${browseName}, NodeId: ${nodeId}`);

//                 const dataValue = await session.readVariableValue(nodeId);
//                 console.log(`  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`);

//                 obj={
//                   dataName:dataName,
//                   dataValue:dataValue.value.value,
//                   timeStamp: new Date()
//                 }
//                 dataToUpdate.push(obj);
//                 // await Server.findByIdAndUpdate(
//                 //   ser._id,
//                 //   { $push: { data: { $each: dataToUpdate } } },
//                 //   { new: true, runValidators: true }
//                 // );



//               }
//             //   console.log(dataToUpdate)
//         res.status(200).render('dynamicData',{dataToUpdate:dataToUpdate})
//         // console.log(dataToUpdate)
//             // Step 5: Close the session and disconnect from the server
//             console.log('Closing the session...');
//             await session.close();
//             console.log('Session closed');

//             console.log('Disconnecting from the server...');
//             await client.disconnect();
//             console.log('Client disconnected from server');
//           } catch (error) {
//             console.error('Error:', error.message);
//           }
//         })();


//     }
//     else{res.status(200).json({message:"error in dd"})}
//       }





// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 }); // Use an appropriate port

exports.serverDynamicData = async (req, res, next) => {
  const serverName = "server1";
  const accessId = "8088547443";
  console.log(
   req.url
  )
  const dataToUpdate = [];

    try {
        const ser = await Server.findOne({ serverName: serverName });
        const endpoint = ser.serverEndPoint;
        

        if (ser.accessId == accessId) {
            const endpointUrl = endpoint;

            const options = {
                endpointMustExist: false,
            };

            const client = opcua.OPCUAClient.create(options);

            try {
                // console.log('Before connecting to server...');
                await client.connect(endpointUrl);
                // console.log('After connecting to server...');

                const session = await client.createSession();
                // console.log('Session created');

                const browseResult = await session.browse('RootFolder');
                // console.log('Browsing completed. Results:');

                for (const reference of browseResult.references) {
                    const nodeId = reference.nodeId.toString();
                    const browseName = reference.browseName.toString();

                    // console.log(`Node BrowseName: ${browseName}, NodeId: ${nodeId}`);

                    const dataValue = await session.readVariableValue(nodeId);
                    // console.log(`  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`);

                    const obj = {
                        dataName: browseName,
                        dataValue: dataValue.value.value,
                        timeStamp: new Date()
                    };
                    dataToUpdate.push(obj);
                }

                // Send data updates via WebSocket
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ dataToUpdate: dataToUpdate }));
                        // res.status(200).render('dynamicData', { dataToUpdate: dataToUpdate });
                    }
                });
                console.log(dataToUpdate)
                res.status(200).json({ dataToUpdate: dataToUpdate });
                // res.status(200).render('dynamicData')

                // console.log('Closing the session...');
                await session.close();
                // console.log('Session closed');

                // console.log('Disconnecting from the server...');
                await client.disconnect();
                // console.log('Client disconnected from server');
            } catch (error) {
                console.error('Error:', error.message);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.serverDynamicDataFE = async (req, res, next) => {
    console.log(req.params.serverName)
    res.status(200).render('dynamicData')
}

exports.UserServerClientDashBoardMain= async(req,res,next)=>
{

  let decoded=jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, function (err, decoded) { return decoded.id; });
  console.log(decoded)
  let user = await User.findById(decoded)
  console.log(user)
  let servers= await Server.find()
  console.log(servers)
  let clients= await Client.find()
  res.status(200).render('userServerClientDashboardMain',{user,servers,clients})

}