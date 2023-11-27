const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const { spawn } = require('child_process');
const serverData = require("./models/serverDataModel");
const moment = require('moment');

dotenv.config({ path: './config.env' });

const port = process.env.PORT || 3000;

const DB = process.env.DATA_BASE;
try {
    mongoose.connect(DB).then(() => { console.log("database connected successfully") })
} catch (e) {
    console.log("error in connecting to database")
}

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// async function fun1() {
//     const id = '654b4c3f42782e08d6a9af5e';
//     const datas = await serverData.findById(id);
//     const predict = JSON.stringify([{
//         dataName: 'temparature',
//         interval: '500',
//         number: '10'
//     },
//     {
//         dataName: 'pressure',
//         interval: '100',
//         number: '10'
//     },
//     {
//         dataName: 'humidity',
//         interval: '600',
//         number: '10'
//     },
//     ]);


//     // console.log(datas);
//     const datase = datas.data[0].variableNode;
//     // console.log(datase);
//     // // const cleanedData = datase.map(({ _id, ...rest }) => rest);
//     // // Format the `timeStamp` field
//     // for (let i = 0; i < 3; i++) {
//     //     console.log(datase[0].dataSource);
//     // }
//     for (let i = 0; i < 3; i++) {
//         datase[i].dataSource.forEach(entry => {
//             entry.timeStamp = moment(entry.timeStamp, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('YYYY-MM-DD HH:mm:ss');
//         });
//     }
//     // // Print or use the cleaned data
//     // for (let j = 0; j < 3; j++) {
//     //     console.log(datase[j]);
//     // }
//     const dataValue = JSON.stringify(datase);
//     // console.log(dataValue);
//     try {
//         const python = spawn('python', ['new7.py', dataValue, predict]);

//         let pythonOutput = '';
//         python.stdout.on('data', function (data) {
//             pythonOutput += data.toString();
//         });

//         // Handle errors during the execution of the Python script
//         python.stderr.on('data', function (data) {
//             console.error('Error from Python script:', data.toString());
//             // You may want to send an error response to the client here
//         });

//         // Handle the closure of the child process
//         python.on('close', (code) => {
//             console.log(`Child process closed with code ${code}`);
//             if (code === 0) {
//                 console.log("The process exited successfully");

//                 // Now pythonOutput contains the entire output
//                 // You can split it into modelMetrics and predictionsData based on some condition
//                 const [modelMetrics, predictionsData] = splitOutput(pythonOutput);

//                 // Handle the modelMetrics and predictionsData variables as needed
//                 console.log("Model Metrics:", modelMetrics);
//                 //console.log("Predictions Data:", predictionsData);
//                 const predictions = JSON.parse(predictionsData);

//                 // Loop through the predictions object
//                 predictions.predictions.forEach(predictionData => {
//                     console.log(`Data Name: ${predictionData.dataName}`);

//                     console.log("Data and Timestamps:");
//                     for (let i = 0; i < predictionData.predictions.length; i++) {
//                         const prediction = predictionData.predictions[i];
//                         const timestamp = predictionData.timestamps[i];
//                         console.log(`  ${prediction} - ${timestamp}`);
//                     }

//                     console.log("\n");
//                 });
//             } else {
//                 // The process exited with an error
//                 console.log("Error occurred");

//             }
//         });
//     }
//     catch (err) {
//         console.error('Error reading JSON file:', err.message);

//     }
// };

// async function fun2() {

//     const timestamp = "2023-01-01 09:23:17";

//     const python = spawn('python', ['predict.py', timestamp]);
//     python.stdout.on('data', (data) => {
//         console.log(data.toString());
//     });

// }
// fun1();
// function splitOutput(output) {
//     let modelMetrics = '';
//     let predictionsData = '';
//     let isModelMetrics = false;

//     const lines = output.split('\n');

//     for (const line of lines) {
//         if (line.startsWith("Model for")) {
//             // Model evaluation metrics
//             isModelMetrics = true;
//         } else if (line.startsWith("{")) {
//             // Prediction results
//             isModelMetrics = false;
//         }

//         if (isModelMetrics) {
//             modelMetrics += line + '\n';
//         } else {
//             predictionsData += line + '\n';
//         }
//     }

//     return [modelMetrics.trim(), predictionsData.trim()];
// }