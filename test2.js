// const opcua = require('node-opcua');

// const endpointUrl = 'opc.tcp://127.0.0.1:4844/freeopcua/server/'; // Adjust the endpoint URL accordingly

// const client = new opcua.OPCUAClient({});

// async function connect() {
//   try {
//     await client.connect(endpointUrl);

//     const session = await client.createSession();
//     console.log('Client connected and session created.');

//     // Browse for the root folder (Objects)
//     const rootFolder = await session.browse('RootFolder');
//     console.log('Root folder nodes:');
//     rootFolder.references.forEach((ref) => {
//       console.log(`  -> ${ref.browseName.toString()}`);
//     });

//     // Find and read the temperature and pressure nodes
//     const temperatureNode = await session.readVariableValue('ns=1;s=Temperature');
//     const pressureNode = await session.readVariableValue('ns=1;s=Pressure');

//     console.log('Temperature:', temperatureNode.value.value);
//     console.log('Pressure:', pressureNode.value.value);

//     await session.close();
//     console.log('Session closed.');

//     await client.disconnect();
//     console.log('Client disconnected.');
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// }

// // Connect to the server and perform operations
// connect();


// // _______________________________________________________________________________________________________________________________________________
// // ________________________________________________________________________________________________________________________________________________


// const opcua = require('node-opcua');

// const endpointUrl = 'opc.tcp://127.0.0.1:4844/freeopcua/server/'; // Adjust the endpoint URL accordingly

// const client = new opcua.OPCUAClient({});

// async function getServerInfo() {
//   try {
//     await client.connect(endpointUrl);
//     console.log('Client connected.');

//     const session = await client.createSession();
//     console.log('Session created.');

//     // Retrieve server endpoints info
//     const endpoints = await client.getEndpoints(endpointUrl);
//     console.log('Server endpoints:', endpoints);

//     // Assuming the server has a root folder, browse from there
//     const rootFolderNodeId = opcua.makeNodeId(opcua.ObjectIds.ObjectsFolder);
//     const browseResult = await session.browse(rootFolderNodeId);

//     // Print browse names and values for nodes under the root folder
//     for (const reference of browseResult.references) {
//       const childNodeId = reference.nodeId.toString();
//       const childBrowseName = reference.browseName.toString();

//       const childNode = await session.readVariableValue(childNodeId);
//       console.log(`${childBrowseName} (${childNodeId}):`, childNode.value.value);
//     }

//     await session.close();
//     console.log('Session closed.');

//     await client.disconnect();
//     console.log('Client disconnected.');
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// }

// // Get server info and node details based on the provided endpoint URL
// getServerInfo();



// // _________________________________________________________________________________________________________________________________
// // _________________________________________________________________________________________________________________________________

// const opcua = require('node-opcua');

// const endpointUrl = 'opc.tcp://127.0.0.1:4844/freeopcua/server/'; // Adjust the endpoint URL accordingly

// const client = new opcua.OPCUAClient({});

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

// async function connect() {
//   try {
//     await client.connect(endpointUrl);

//     const session = await client.createSession();
//     console.log('Client connected and session created.');

//     // Start browsing from the root folder (Objects)
//     const rootFolderNodeId = opcua.resolveNodeId('ObjectsFolder');
//     await browseRecursive(session, rootFolderNodeId, '');

//     await session.close();
//     console.log('Session closed.');

//     await client.disconnect();
//     console.log('Client disconnected.');
//   } catch (err) {
//     console.error('Error:', err.message);
//   }
// }

// // Connect to the server and perform operations
// connect();
