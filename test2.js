// const opcua = require('node-opcua');

// const endpointUrl = 'opc.tcp://127.0.0.1:4844/freeopcus/server1/';

// async function browseRecursive(session, nodeId, indent) {
//   const nodeToBrowse = {
//     nodeId,
//     referenceTypeId: 'HierarchicalReferences',
//     resultMask: 63,
//     includeSubtypes: true,
//     browseDirection: opcua.BrowseDirection.Forward,
//     nodeClassMask: 31
//   };

//   const browseResult = await session.browse(nodeToBrowse);

//   for (const reference of browseResult.references) {
//     const childNodeId = reference.nodeId.toString();
//     const childBrowseName = reference.browseName.toString();

//     const childNode = await session.readVariableValue(childNodeId);
//     console.log(`${indent}${childBrowseName} (${childNodeId}):`, childNode.value.value);

//     // Recursively browse child nodes
//     await browseRecursive(session, childNodeId, `${indent}  `);
//   }
// }

// (async () => {
//   try {
//     const options = {
//       endpointMustExist: false,
//     };

//     const client = opcua.OPCUAClient.create(options);

//     await client.connect(endpointUrl);
//     console.log('Client connected to server');

//     const session = await client.createSession();
//     console.log('Session created');

//     const rootFolderNodeId = opcua.resolveNodeId('ObjectsFolder');
//     await browseRecursive(session, rootFolderNodeId, '');

//     await session.close();
//     console.log('Session closed');

//     await client.disconnect();
//     console.log('Client disconnected from server');
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// })();


// const opcua = require('node-opcua');

// const endpointUrl = 'opc.tcp://127.0.0.1:4844/freeopcus/server1/';  // Replace with your server's endpoint

// (async () => {
//   try {
//     const options = {
//       endpointMustExist: false,
//     };

//     const client = opcua.OPCUAClient.create(options);

//     // Step 1: Connect to the server
//     await client.connect(endpointUrl);
//     console.log('Client connected to server');

//     // Step 2: Create a session
//     const session = await client.createSession();
//     console.log('Session created');

//     // Step 3: Browse the server's address space (here we start from the RootFolder)
//     const browseResult = await session.browse('RootFolder');
//     console.log('Browsing the address space:');

//     // Step 4: Iterate through the references and read data from variables
//     for (const reference of browseResult.references) {
//       const nodeId = reference.nodeId.toString();
//       const browseName = reference.browseName.toString();

//       const dataValue = await session.readVariableValue(nodeId);
//       console.log(`Node: ${browseName}, NodeId: ${nodeId}`);
//       console.log(`  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`);
//     }

//     // Step 5: Close the session and disconnect from the server
//     await session.close();
//     console.log('Session closed');

//     await client.disconnect();
//     console.log('Client disconnected from server');
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
// })();



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

    // Step 3: Browse the server's address space (here we start from the RootFolder)
    console.log('Browsing the address space...');
    const browseResult = await session.browse('RootFolder');
    console.log('Browsing completed. Results:');

    // Step 4: Iterate through the references and read data from variables
    for (const reference of browseResult.references) {
        const nodeId = reference.nodeId.toString();
        const browseName = reference.browseName.toString();
      
        console.log(`Node BrowseName: ${browseName}, NodeId: ${nodeId}`);
      
        const dataValue = await session.readVariableValue(nodeId);
        console.log(`  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`);
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

