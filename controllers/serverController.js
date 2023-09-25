const opcua = require('node-opcua');

const server = new opcua.OPCUAServer({
  port: 4844, // Set the port for the OPC-UA server
  resourcePath: "/freeopcua/server",
  buildInfo: {
    productName: "MyServer",
    buildNumber: "1",
    buildDate: new Date(2023, 9, 25)
  }
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
