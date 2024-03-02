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





        // const opcua = require('node-opcua');

        // const server = new opcua.OPCUAServer({
        //   port: 4844,
        //   resourcePath: "/freeopcua/server1/",
        //   buildInfo: {
        //     productName: "MyServer",
        //     buildNumber: "1",
        //     buildDate: new Date(2023, 9, 25)
        //   }
        // });

        // server.on("getEndpoints", (request, callback) => {
        //   const endpoints = [
        //     {
        //       endpointUrl: "opc.tcp://127.0.0.1:4844/freeopcua/server1/",
        //       securityMode: opcua.MessageSecurityMode.None,
        //       securityPolicyUri: opcua.SecurityPolicy.None,
        //       userIdentityTokens: [],
        //       transportProfileUri: "http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary"
        //     }
        //   ];

        //   callback(null, endpoints);
        // });

        // server.initialize(() => {
        //     const addressSpace = server.engine.addressSpace;

        //     // Create a new namespace for custom nodes
        //     const namespace = addressSpace.getOwnNamespace();
          
        //     // Setup server namespace
        //     const uri = "http://example.org";
          
        //     // Add temperature and pressure nodes
        //     const temp = namespace.addVariable({
        //       browseName: "Temperature",
        //       dataType: "Double",
        //       value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
        //     });
          
        //     const pressure = namespace.addVariable({
        //       browseName: "Pressure",
        //       dataType: "Double",
        //       value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 })
        //     });
          
        //     // Set initial node values
            
        //       temp.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 25.0 }));
        //     pressure.setValueFromSource(new opcua.Variant({ dataType: opcua.DataType.Double, value: 100.0 }));
          
            
        //     // Start the server
        //     server.start(() => {
        //       console.log("OPC-UA server is up and running on port", server.endpoints[0].port);
        //     });
        // });

        // // Handle server shutdown
        // process.on('SIGINT', () => {
        //   server.shutdown(() => {
        //     console.log('Server shutdown completed.');
        //     process.exit(0);
        //   });
        // });



// exports.createNewServer = async (req, res, next) => {
//   try{
//   const serverName = req.body.serverName;
//   const endpoint = req.body.serverEndPoint;
//   const dataName = req.body.dataName.split(',');
//   const accessId = req.body.accessId;
//   const userId = req.body.userId;

//   const newServer = await Server.create(
//   {
//     serverName: serverName,
//     serverEndPoint: endpoint,
//     userId: userId,
//     accessId: accessId,
//   });
//   // opc.tcp://26.107.113.149:4840/freeopcua/server1/
//   const server = new opcua.OPCUAServer({
//     port:4840,
//     resourcePath: `/freeopcua/${serverName}/`,
//     buildInfo: {
//       productName: `${serverName}`,
//       buildNumber: '1',
//       buildDate: new Date(),
//     },
//   });

//   server.on('getEndpoints', (request, callback) => {
//     const endpoints = [
//       {
//         endpointUrl: `${endpoint}`,
//         securityMode: opcua.MessageSecurityMode.None,
//         securityPolicyUri: opcua.SecurityPolicy.None,
//         userIdentityTokens: [],
//         transportProfileUri: 'http://opcfoundation.org/UA-Profile/Transport/uatcp-uasc-uabinary',
//       },
//     ];

//     callback(null, endpoints);
//   });

//   server.initialize(() => {
//     const addressSpace = server.engine.addressSpace;
//     const namespace = addressSpace.getOwnNamespace();

//     const temperatureNode = namespace.addVariable({
//       componentOf: server.engine.addressSpace.rootFolder,
//       browseName: `${dataName}`,
//       dataType: 'Double',
//       value: new opcua.Variant({ dataType: opcua.DataType.Double, value: 0.0 }),
//     });

//     let updateCounter = 0;
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

//     server.start((err) => {
//       if(err)
//       {
//         console.log("error while starting server", err)
//       }
//       else{
//       console.log('OPC-UA server is up and running on port', server.endpoints[0].port);}
//     });
//   });

//   process.on('SIGINT', () => {
//     server.shutdown(() => {
//       console.log('Server shutdown completed.');
//       process.exit(0);
//     });
//   });
//   }
//   catch(e)
//   {
//     console.log("error at serverCreation" ,e)
//   }
// };



// doctype html
// head
//   meta(charset='UTF-8')
//   meta(name='viewport' content='width=device-width, initial-scale=1.0')
//   title Dynamic Scrolling Window
//   link(rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css')
//   style.
//     /* Style for the black window */
//     .window {
//       height: 100%; 
//       width: 100%; 
//       background-color: black;
//       overflow: hidden; 
//       padding: 20px; 
//       box-sizing: border-box; 
//       position: relative; 
//       color: white;
//       display: flex;
//     }
//     .inner-container {
//       display: flex;
//       flex-direction: column;
//       align-items: flex-start;
//       width: 50%;
//     }
//     .card {
//       margin: 10px 0;
//       padding: 10px;
//       background-color: #212529; /* Dark color for card background */
//       border: 1px solid #6c757d; /* Border color */
//       border-radius: 5px;
//       width: 300px;
//     }
//     .card .key {
//       font-weight: bold;
//       color: #ffcc00; /* Yellow */
//     }
//     .card .value {
//       color: #00ccff; /* Blue */
//     }
//     .graph-container {
//       width: 50%;
//       padding: 20px;
//     }

// include navBar
// .window
//   #dynamic-content.inner-container
//   .graph-container
//     svg

// script(src='https://cdnjs.cloudflare.com/ajax/libs/d3/7.0.0/d3.min.js' integrity='sha512-t3+whaCkpXX3q7yceBe/P7VxNtB+OalfeZRz/2JHQy9Zdck90gHHEsWdKUMraazxLbyf7G6leG8jIuZgjA9Xmg==' crossorigin='anonymous' referrerpolicy='no-referrer')

// script.
//   // Function to update data
//   function updateData() {
//     fetch('/serverDynamicData')
//       .then(response => response.json())
//       .then(data => {
//         const innerContainer = document.getElementById('dynamic-content');
//         innerContainer.innerHTML = '';

//         const graphContainer = document.querySelector('.graph-container');
//         graphContainer.innerHTML = '';

//         data.dataToUpdate.forEach((dataObject) => {
//           // Exclude specific dataNames
//           if (['Objects', 'Types', 'Views'].includes(dataObject.dataName)) {
//             return;
//           }

//           // Check if dataValue is not null
//           if (dataObject.dataValue !== null) {
//             const card = document.createElement('div');
//             card.className = 'card';

//             for (const [key, value] of Object.entries(dataObject)) {
//               const keyValueElement = document.createElement('div');
//               keyValueElement.className = 'key-value';

//               const keyElement = document.createElement('div');
//               keyElement.className = 'key';
//               keyElement.textContent = `${key}:`;

//               const valueElement = document.createElement('div');
//               valueElement.className = 'value';
//               valueElement.textContent = value;

//               keyValueElement.appendChild(keyElement);
//               keyValueElement.appendChild(valueElement);

//               card.appendChild(keyValueElement);
//             }

//             innerContainer.appendChild(card);

//             // D3.js code for line graph
//             const graphData = data.dataToUpdate
//               .filter(obj => obj.dataName === dataObject.dataName)
//               .map(obj => ({ value: obj.dataValue, timeStamp: new Date(obj.timeStamp) }));

//             const graphWidth = 300;
//             const graphHeight = 200;

//             const svg = d3.select('.graph-container').append('svg')
//               .attr('width', graphWidth)
//               .attr('height', graphHeight);

//             const xScale = d3.scaleTime()
//               .domain(d3.extent(graphData, d => d.timeStamp))
//               .range([0, graphWidth]);

//             const yScale = d3.scaleLinear()
//               .domain([0, d3.max(graphData, d => d.value)])
//               .range([graphHeight, 0]);

//             const line = d3.line()
//               .x(d => xScale(d.timeStamp))
//               .y(d => yScale(d.value));

//             svg.append('path')
//               .data([graphData])
//               .attr('fill', 'none')
//               .attr('stroke', 'steelblue')
//               .attr('stroke-width', 1.5)
//               .attr('d', line);
//           }
//         });
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }

//   // Update data initially
//   updateData();

//   // Update data every 5 seconds (adjust as needed)
//   setInterval(updateData, 5000);
// script(src='/js/serverDynamicData.js')
