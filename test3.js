// let updateCounter = 0;
//     const dataToUpdate = [];

//     const updateInterval = setInterval(async () => {
//       if (updateCounter >= 10) {
//         clearInterval(updateInterval);

//         // Update the database with all data points
//         await Server.findByIdAndUpdate(
//           newServer._id,
//           { $push: { data: { $each: dataToUpdate } } },
//           { new: true, runValidators: true }
//         );

//         server.shutdown(() => {
//           console.log('Server stopped after sending 10 data values.');
//           // process.exit(0);
//         });
//         return;
//       }

//       const temperatureValue = Math.random() * 50 + 20;
      

//       const obj = {
//         dataName: dataName,
//         dataValue: temperatureValue,
//         timeStamp: new Date(),
//       };

//       // Store data for bulk update
//       dataToUpdate.push(obj);

//       temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
      

//       updateCounter++;
//     }, 5000);

const opcua = require('node-opcua');

const serverName = "server1";
const endpoint = "opc.tcp://127.0.0.1:4841/freeopcua/server1/";
const dataNames = "temperature,pressure,humidity".split(',');

const server = new opcua.OPCUAServer({
  port: 4841,
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

  // Create variables for each dataName
  const variables = dataNames.map((dataName) => {
    const variableNode = namespace.addVariable({
      componentOf: server.engine.addressSpace.rootFolder,
      browseName: dataName,
      dataType: 'Double',
      value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
    });

    return variableNode;
  });

  // Function to update variable values with random data
  function updateVariableValues() {
    variables.forEach((variable) => {
      const randomValue = Math.random() * 50 + 20;
      variable.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: randomValue }));
    });
  }

  // Update variable values every second
  setInterval(updateVariableValues, 1000);

  server.start((err) => {
    if (err) {
      console.log("Error while starting server", err);
    } else {
      console.log('OPC-UA server is up and running on port', server.endpoints[0].port);
    }
  });
});

process.on('SIGINT', () => {
  server.shutdown(() => {
    console.log('Server shutdown completed.');
    process.exit(0);
  });
});
