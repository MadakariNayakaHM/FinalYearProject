// Import the node-opcua module
const opcua = require("node-opcua");

// Define the endpoint URL of the server
const endpointUrl = "opc.tcp://192.168.0.105:3005/freeopcua/server1/";

// Create an OPC UA client with the same security mode and policy as the server
const options = {
    endpointMustExist: false,
    securityMode: opcua.MessageSecurityMode.SignAndEncrypt, // Added security mode here
    securityPolicy: opcua.SecurityPolicy.Basic256Sha256, // Added security policy here
};

const client = opcua.OPCUAClient.create(options);

(async () => {
    try {
        // Step 1: Connect to the server
        console.log("Before connecting to server...");
        await client.connect(endpointUrl);
        console.log("After connecting to server...");

        // Step 2: Create a session
        console.log("Creating a session...");
        const session = await client.createSession();
        console.log("Session created");

        // Step 3: Browse the server's address space (here we start from the RootFolder)
        console.log("Browsing the address space...");
        const browseResult = await session.browse("RootFolder");
        console.log("Browsing completed. Results:");

        const dataToUpdate = [];
        // Step 4: Iterate through the references and read data from variables
        for (const reference of browseResult.references) {
            const nodeId = reference.nodeId.toString();
            const browseName = reference.browseName.toString();

            console.log(`Node BrowseName: ${browseName}, NodeId: ${nodeId}`);

            const dataValue = await session.readVariableValue(nodeId);
            console.log(
                `  Value: ${dataValue.value.value}, DataType: ${dataValue.value.dataType}`
            );
        }

        // Step 5: Close the session and disconnect from the server
        console.log("Closing the session...");
        await session.close();
        console.log("Session closed");

        console.log("Disconnecting from the server...");
        await client.disconnect();
        console.log("Client disconnected from server");
    } catch (error) {
        // Added a catch block here to handle errors
        console.error("Error:", error.message);
    }
})();
