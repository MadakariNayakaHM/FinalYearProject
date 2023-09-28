const opcua = require('node-opcua');

const server = new opcua.OPCUAServer({
  port: 4844,
  resourcePath: "/freeopcua/server/",
  buildInfo: {
    productName: "myServer",
    buildNumber: "1",
    buildDate: new Date()
  }
});

server.on("getEndpoints", (request, callback) => {
  const endpoints = [
    {
      endpointUrl: "opc.tcp://127.0.0.1:4844/freeopcua/server/",
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
  const namespace = addressSpace.getOwnNamespace();

  const temperatureNode = namespace.addVariable({
    browseName: "Temperature",
    dataType: "Double",
    value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
  });

  const pressureNode = namespace.addVariable({
    browseName: "Pressure",
    dataType: "Double",
    value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
  });

  let updateCounter = 0;

  const updateInterval = setInterval(() => {
    if (updateCounter >= 10) {
      clearInterval(updateInterval);
      server.shutdown(() => {
        console.log('Server stopped after sending 10 data values.');
        process.exit(0);
      });
      return;
    }

    const temperatureValue = Math.random() * 50 + 20;
    const pressureValue = Math.random() * 50 + 950;
    console.log(temperatureValue,pressureValue)
    temperatureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: temperatureValue }));
    pressureNode.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: pressureValue }));

    updateCounter++;
  }, 5000);

  server.start(() => {
    console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
  });
});

process.on('SIGINT', () => {
  server.shutdown(() => {
    console.log('Server shutdown completed.');
    process.exit(0);
  });
});
