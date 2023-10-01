// const opcua = require('node-opcua');

// const server = new opcua.OPCUAServer({
//   port: 4844,
//   resourcePath: "/freeopcua/server/",
//   buildInfo: {
//     productName: "myServer",
//     buildNumber: "1",
//     buildDate: new Date()
//   }
// });

// server.on("getEndpoints", (request, callback) => {
//   const endpoints = [
//     {
//       endpointUrl: "opc.tcp://127.0.0.1:4844/freeopcua/server/",
//       securityMode: opcua.MessageSecurityMode.None,
//       securityPolicyUri: opcua.SecurityPolicy.None,
//       userIdentityTokens: [],
//       transportProfileUri: "http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary"
//     }
//   ];

//   callback(null, endpoints);
// });

// server.initialize(() => {
//   const addressSpace = server.engine.addressSpace;
//   const namespace = addressSpace.getOwnNamespace();

//   const temperatureNode = namespace.addVariable({
//     browseName: "Temperature",
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   const pressureNode = namespace.addVariable({
//     browseName: "Pressure",
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   let updateCounter = 0;

//   const updateInterval = setInterval(() => {
//     if (updateCounter >= 10) {
//       clearInterval(updateInterval);
//       server.shutdown(() => {
//         console.log('Server stopped after sending 10 data values.');
//         process.exit(0);
//       });
//       return;
//     }

//     const temperatureValue = Math.random() * 50 + 20;
//     const pressureValue = Math.random() * 50 + 950;
//     console.log(temperatureValue,pressureValue)
//     temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
//     pressureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: pressureValue }));

//     updateCounter++;
//   }, 5000);

//   server.start(() => {
//     console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
//   });
// });

// process.on('SIGINT', () => {
//   server.shutdown(() => {
//     console.log('Server shutdown completed.');
//     process.exit(0);
//   });
// });



// ____________________________________________________________________________________________________________________________________________



// const Server= require('./../models/serverModel');
// const opcua = require('node-opcua');
// const jwt = require('jsonwebtoken');

// const dataName2="Pressure"

// exports.createNewServer =  async (req,res,next)=>
// {

//   // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
//   // const currentuser = await User.findById(decoded.id);

// const serverName=req.body.serverName
// const endpoint=req.body.serverEndPoint
// const dataName=req.body.dataName
// const accessId=req.body.accessId
// const userId=req.body.userId

// const newServer = await Server.create({serverName:serverName,serverEndPoint:endpoint, userId:userId,accessId:accessId})
// const server = new opcua.OPCUAServer({
//   port: 4844,
//   resourcePath:`/opcua/${serverName}/`,
//   buildInfo: {
//     productName: `${serverName}`,
//     buildNumber: "1",
//     buildDate: new Date()
//   }
// });

// server.on("getEndpoints", (request, callback) => {
//   const endpoints = [
//     {
//       endpointUrl: `${endpoint}`,
//       securityMode: opcua.MessageSecurityMode.None,
//       securityPolicyUri: opcua.SecurityPolicy.None,
//       userIdentityTokens: [],
//       transportProfileUri: "http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary"
//     }
//   ];

//   callback(null, endpoints);
// });

//  server.initialize( () => {
//   const addressSpace = server.engine.addressSpace;
//   const namespace = addressSpace.getOwnNamespace();

//   const temperatureNode = namespace.addVariable({
//     browseName: `${dataName}`,
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   const pressureNode = namespace.addVariable({
//     browseName: `${dataName2}`,
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   let updateCounter = 0;

//   const updateInterval =  setInterval(async () => {
//     if (updateCounter >= 10) {
//       clearInterval(updateInterval);
//       server.shutdown(() => {
//         console.log('Server stopped after sending 10 data values.');
//         process.exit(0);
//       });
//       return;
//     }

//     const temperatureValue = Math.random() * 50 + 20;
//     const pressureValue = Math.random() * 50 + 950;
//     console.log(temperatureValue,pressureValue)
//     // obj={
//     //   dataName:dataName,
//     //         dataValue:temperatureValue,
//     //         timeStamp: new Date()
//     // }
//     const updateData = await Server.findByIdAndUpdate(
//       newServer._id,
//       {
//         data:{dataName:dataName,
//           dataValue:temperatureValue,
//           timeStamp: new Date()}
//       },
//       { new: true, runValidators: true }
//     );
//     updateData.save()
//     temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
//     pressureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: pressureValue }));

//     updateCounter++;
//   }, 5000);

//   server.start(() => {
//     console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
//   });
// });

// process.on('SIGINT', () => {
//   server.shutdown(() => {
//     console.log('Server shutdown completed.');
//     process.exit(0);
//   });
// });


  
// }

// exports.registerServer=(req,res,next)=>
// {

// }




// ---------------------------------------------------------------------






// const opcua = require('node-opcua');

// const server = new opcua.OPCUAServer({
//   port: 4844, // Set the port for the OPC-UA server
//   resourcePath: "/freeopcus/server1/",
//   buildInfo: {
//     productName: "MyServer",
//     buildNumber: "1",
//     buildDate: new Date(2023, 9, 25)
//   }
// });

// server.initialize(() => {
//   const addressSpace = server.engine.addressSpace;

//   // Create a new namespace for custom nodes
//   const namespace = addressSpace.getOwnNamespace();

//   // Setup server namespace
//   const uri = "http://example.org";

//   // Add temperature and pressure nodes
//   const temp = namespace.addVariable({
//     browseName: "Temperature",
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   const pressure = namespace.addVariable({
//     browseName: "Pressure",
//     dataType: "Double",
//     value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
//   });

//   // Set initial node values
  
//     temp.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 25.0 }));
//   pressure.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 100.0 }));

  
//   // Start the server
//   server.start(() => {
//     console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
//   });
// });

// // Handle server shutdown
// process.on('SIGINT', () => {
//   server.shutdown(() => {
//     console.log('Server shutdown completed.');
//     process.exit(0);
//   });
// });



// _______________________________________________________________________________





const opcua = require('node-opcua');

const server = new opcua.OPCUAServer({
  port: 4844,
  resourcePath: "/freeopcua/server1/",
  buildInfo: {
    productName: "MyServer",
    buildNumber: "1",
    buildDate: new Date(2023, 9, 25)
  }
});

server.on("getEndpoints", (request, callback) => {
  const endpoints = [
    {
      endpointUrl: "opc.tcp://127.0.0.1:4844/freeopcua/server1/",
      securityMode: opcua.MessageSecurityMode.None,
      securityPolicyUri: opcua.SecurityPolicy.None,
      userIdentityTokens: [],
      transportProfileUri: "http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary"
    }
  ];

  callback(null, endpoints);
});

server.initialize(() => {
    const addressSpace = server.engine.addressSpace;

    // Create a new namespace for custom nodes
    const namespace = addressSpace.getOwnNamespace();
  
    // Setup server namespace
    const uri = "http://example.org";
  
    // Add temperature and pressure nodes
    const temp = namespace.addVariable({
      browseName: "Temperature",
      dataType: "Double",
      value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
    });
  
    const pressure = namespace.addVariable({
      browseName: "Pressure",
      dataType: "Double",
      value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
    });
  
    // Set initial node values
    
      temp.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 25.0 }));
    pressure.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 100.0 }));
  
    
    // Start the server
    server.start(() => {
      console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
    });
});

// Handle server shutdown
process.on('SIGINT', () => {
  server.shutdown(() => {
    console.log('Server shutdown completed.');
    process.exit(0);
  });
});

