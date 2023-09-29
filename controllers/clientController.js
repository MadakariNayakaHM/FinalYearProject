const Client = require('./../models/clientModel')
const Server = require('./../models/serverModel');

exports.createClient=async(req,res,next)=>
{
  try{

    const clientName = req.body.clientName
    const serverEndPoint=req.body.serverEndPoint
    const userId = req.body.userId
    const accessId = req.body.accessId
    console.log(clientName,serverEndPoint)
    const server = await Server.findOne({serverEndPoint:serverEndPoint})
    console.log(server)
    if(server.accessId == accessId)
    {
    const newClient=  await Client.create({
        clientName:clientName,
        serverEndPoint:serverEndPoint,
        userId:userId,
        accessId:accessId
      })

      res.status(200).json({message:"success",newClient})
    }

    else
    {
      res.status(400).json({message:"failed"})
    }
  }
  catch(e)
  {
console.log("error in client creation ",e)
  }
}

exports.startClient=async(req,res,next)=>
{
  try{

  }
  catch(e)
  {

  }
}

exports.stopClient=async(req,res,stop)=>
{
  try{

  }
  catch(e)
  {

  }
}