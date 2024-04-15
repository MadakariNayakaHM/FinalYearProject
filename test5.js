const opcua = require('node-opcua');

const endpointUrl = 'opc.tcp://192.168.196.171:4840/freeopcua/server1/';

(async () => {
  try {
    const options = {
      endpointMustExist: false,
    };

    const client = opcua.OPCUAClient.create(options);

    // Step 1: Connect to the server
    console.log('Connecting to server...');
    await client.connect(endpointUrl);

    console.log('Client connected to server');

    // Step 2: Create a session
    console.log('Creating a session...');
    const session = await client.createSession();
    console.log('Session created');

    // Step 3: Browse the server's address space (here we start from the RootFolder)
    console.log('Browsing the address space...');
    const browseResult = await session.browse('RootFolder');
    console.log('Browsing completed. Results:');

    // Step 4: Iterate through the references and read data from variables
    for (let i = 1; i > 0; i++) {
      for (let i = 0; i < 1000000; i++) {}

      const nodeId = "ns=2;i=2";
      const node = "ns=2;i=3";

      const dataValue = await session.readVariableValue(nodeId);
      const dataValue1 = await session.readVariableValue(node);

      console.log(`Received Distance from Raspberry Pi Client: ${dataValue.value.value}`);
      
      // Add a 1-second delay here
      await delay(1000);
      
      console.log(`Received pressure from Raspberry Pi Client: ${dataValue1.value.value}`);

      for (let i = 1; i < 1000000; i++) {}
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

// Function to create a delay using Promises
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}