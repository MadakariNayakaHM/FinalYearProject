
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
  // opc.tcp://26.107.113.149:4840/freeopcua/server1/
  const server = new opcua.OPCUAServer({
    port:4840,
    resourcePath: `/freeopcua/${serverName}/`,
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
      componentOf: server.engine.addressSpace.rootFolder,
      browseName: `${dataName}`,
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
          // process.exit(0);
        });
        return;
      }

      const temperatureValue = Math.random() * 50 + 20;
      

      const obj = {
        dataName: dataName,
        dataValue: temperatureValue,
        timeStamp: new Date(),
      };

      // Store data for bulk update
      dataToUpdate.push(obj);

      temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
      

      updateCounter++;
    }, 5000);

    server.start((err) => {
      if(err)
      {
        console.log("error while starting server", err)
      }
      else{
      console.log('OPC-UA server is up and running on port', server.endpoints[0].port);}
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
    const endpointUrl = endpoint;

    (async () => {
      try {
        const options = {
          endpointMustExist: false,
        };
    
        const client = opcua.OPCUAClient.create(options);
    
        // Step 1: Connect to the server
        try {
            console.log('Before connecting to server...');
            await client.connect(endpointUrl);
            console.log('After connecting to server...');
          } catch (error) {
            console.error('Error connecting to server:', error.message);
          }
        
    
        // Step 2: Create a session
        console.log('Creating a session...');
        const session = await client.createSession();
        console.log('Session created');
    
        // Step 3: Browse the server's address space (here we start from the RootFolder)
        console.log('Browsing the address space...');
        const browseResult = await session.browse('RootFolder');
        console.log('Browsing completed. Results:');
          




        const dataToUpdate = [];
        // Step 4: Iterate through the references and read data from variables
        for (const reference of browseResult.references) {
            const nodeId = reference.nodeId.toString();
            const browseName = reference.browseName.toString();
          
            console.log(`Node BrowseName: ${browseName}, NodeId: ${nodeId}`);
          
            const dataValue = await session.readVariableValue(nodeId);
            console.log(`  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`);

            obj={
              dataName:dataName,
              dataValue:dataValue.value.value,
              timeStamp: new Date()
            }
            dataToUpdate.push(obj);
            await Server.findByIdAndUpdate(
              ser._id,
              { $push: { data: { $each: dataToUpdate } } },
              { new: true, runValidators: true }
            );
    


          }
          
    
        // Step 5: Close the session and disconnect from the server
        console.log('Closing the session...');
        await session.close();
        console.log('Session closed');
    
        console.log('Disconnecting from the server...');
        await client.disconnect();
        console.log('Client disconnected from server');
      } catch (error) {
        console.error('Error:', error.message);
      }
    })();
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