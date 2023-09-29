
const Server = require('./../models/serverModel');
const opcua = require('node-opcua');

exports.createNewServer = async (req, res, next) => {
  try{
  const serverName = req.body.serverName;
  const endpoint = req.body.serverEndPoint;
  const dataName = req.body.dataName;
  const accessId = req.body.accessId;
  const userId = req.body.userId;

  const newServer = await Server.create({
    serverName: serverName,
    serverEndPoint: endpoint,
    userId: userId,
    accessId: accessId,
  });

  const server = new opcua.OPCUAServer({
    port: 4844,
    resourcePath: `/opcua/${serverName}/`,
    buildInfo: {
      productName: `${serverName}`,
      buildNumber: '1',
      buildDate: new Date(),
    },
  });

  server.on('getEndpoints', (request, callback) => {
    const endpoints = [
      {
        endpointUrl: `${endpoint}`,
        securityMode: opcua.MessageSecurityMode.None,
        securityPolicyUri: opcua.SecurityPolicy.None,
        userIdentityTokens: [],
        transportProfileUri: 'http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary',
      },
    ];

    callback(null, endpoints);
  });

  server.initialize(() => {
    const addressSpace = server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();

    const temperatureNode = namespace.addVariable({
      browseName: `${dataName}`,
      dataType: 'Double',
      value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
    });

    const pressureNode = namespace.addVariable({
      browseName: `${dataName2}`,
      dataType: 'Double',
      value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
    });

    let updateCounter = 0;
    const dataToUpdate = [];

    const updateInterval = setInterval(async () => {
      if (updateCounter >= 10) {
        clearInterval(updateInterval);

        // Update the database with all data points
        await Server.findByIdAndUpdate(
          newServer._id,
          { $push: { data: { $each: dataToUpdate } } },
          { new: true, runValidators: true }
        );

        server.shutdown(() => {
          console.log('Server stopped after sending 10 data values.');
          process.exit(0);
        });
        return;
      }

      const temperatureValue = Math.random() * 50 + 20;
      const pressureValue = Math.random() * 50 + 950;

      const obj = {
        dataName: dataName,
        dataValue: temperatureValue,
        timeStamp: new Date(),
      };

      // Store data for bulk update
      dataToUpdate.push(obj);

      temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
      pressureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: pressureValue }));

      updateCounter++;
    }, 5000);

    server.start(() => {
      console.log('OPC-UA server is up and running on port', server.endpoints[0].port);
    });
  });

  process.on('SIGINT', () => {
    server.shutdown(() => {
      console.log('Server shutdown completed.');
      process.exit(0);
    });
  });
  }
  catch(e)
  {
    console.log("error at serverCreation" ,e)
  }
};

exports.registerServer = async (req, res, next) => {
  try{
    const serverName = req.body.serverName;
    const endpoint = req.body.serverEndPoint;
   
    const accessId = req.body.accessId;
    const userId = req.body.userId;
  
    const newServer = await Server.create({
      serverName: serverName,
      serverEndPoint: endpoint,
      userId: userId,
      accessId: accessId,
    });
    res.status(200).json({newServer,message:"successfully created"})
  }catch(e)
  {
    console.log("error at server registration", e)
  }
};
exports.startServer=async(req,res,next)=>
{
  try{


// ---------------------------------------------------------------------------------------------------------------------------------
const serverName = req.body.serverName;
  
const accessId = req.body.accessId;
 

  const ser = await Server.findOne({serverName:serverName})
  const endpoint= ser.serverEndPoint
  const dataName= ser.data[0].dataName



  if(ser.accessId==accessId)
  {
    const server = new opcua.OPCUAServer({
      port: 4844,
      resourcePath: `/opcua/${serverName}/`,
      buildInfo: {
        productName: `${serverName}`,
        buildNumber: '1',
        buildDate: new Date(),
      },
    });
  
    server.on('getEndpoints', (request, callback) => {
      const endpoints = [
        {
          endpointUrl: `${endpoint}`,
          securityMode: opcua.MessageSecurityMode.None,
          securityPolicyUri: opcua.SecurityPolicy.None,
          userIdentityTokens: [],
          transportProfileUri: 'http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary',
        },
      ];
  
      callback(null, endpoints);
    });
  
    server.initialize(() => {
      const addressSpace = server.engine.addressSpace;
      const namespace = addressSpace.getOwnNamespace();
  
      const temperatureNode = namespace.addVariable({
        browseName: `${dataName}`,
        dataType: 'Double',
        value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
      });
  
      // const pressureNode = namespace.addVariable({
      //   browseName: `${dataName2}`,
      //   dataType: 'Double',
      //   value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
      // });
  
      let updateCounter = 0;
      const dataToUpdate = [];
  
      const updateInterval = setInterval(async () => {
        if (updateCounter >= 10) {
          clearInterval(updateInterval);
  
          // Update the database with all data points
          await Server.findByIdAndUpdate(
          ser._id,
            { $push: { data: { $each: dataToUpdate } } },
            { new: true, runValidators: true }
          );
  
          server.shutdown(() => {
            console.log('Server stopped after sending 10 data values.');
            process.exit(0);
          });
          return;
        }
  
        const temperatureValue = Math.random() * 50 + 20;
        // const pressureValue = Math.random() * 50 + 950;
  
        const obj = {
          dataName: dataName,
          dataValue: temperatureValue,
          timeStamp: new Date(),
        };
  
        // Store data for bulk update
        dataToUpdate.push(obj);
  
        temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
        // pressureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: pressureValue }));
  
        updateCounter++;
      }, 5000);
  
      server.start(() => {
        console.log('OPC-UA server is up and running on port', server.endpoints[0].port);
      });
    });
  
    process.on('SIGINT', () => {
      server.shutdown(() => {
        console.log('Server shutdown completed.');
        process.exit(0);
      });
    });
  }
  else{
    res.status(400).json({message:"failed"})
  }
// ----------------------------------------------------------------------------------------------------------------------------------



  }
  catch(e)
  {

  }
}

exports.stopServer=async(req,res,next)=>
{
  try{

  }catch(e)
  {

  }
}