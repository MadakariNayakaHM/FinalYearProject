const opcua = require('node-opcua');

const endpointUrl = 'opc.tcp://127.0.0.1:4841/freeopcua/server1/';

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
        
  
      // Step 5: Close the session and disconnect from the server
      console.log('Closing the session...');
      await session.close();
      console.log('Session closed');
  
      console.log('Disconnecting from the server...');
      await client.disconnect();
      console.log('Client disconnected from server');
    }
   catch (error) {
    console.error('Error:', error.message);
  }
})();
