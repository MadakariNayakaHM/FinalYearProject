const { spawn } = require('child_process')
const serverData = require('../models/serverDataModel')
const moment = require('moment')
const path = require('path')
const puppeteer = require('puppeteer')
const pug = require('pug')
const fs = require('fs')

// Function to generate HTML from Pug template
function generateHTML(dataList) {
    return pug.renderFile('PredictedValues.pug', { dataList }) // Replace 'your-pug-file.pug' with your actual Pug file
}

async function pdfGenarator(dataList) {
    // Launch headless browser
    const browser = await puppeteer.launch()

    // Create a new page
    const page = await browser.newPage()

    // Generate HTML dynamically from Pug template
    const htmlContent = generateHTML(dataList) // Pass your data to the function

    // Set HTML content on the page
    await page.setContent(htmlContent)

    // Define header and footer content

    // Generate PDF with header and footer
    const pdfName = `${Date.now()}.pdf`
    const pdfPath = path.join(__dirname, '..', 'pdfGenarated', pdfName)
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        displayHeaderFooter: true,

        margin: {
            top: '75px', // Adjust top margin for header space
            bottom: '75px', // Adjust bottom margin for footer space
        },
    })

    // Close the browser
    await browser.close()

    console.log('PDF generated successfully at:', pdfPath)

    return pdfName
}

//function split the recevied data from python script into modelMetrics, predictionsData
function splitOutput(output) {
    let modelMetrics = ''
    let predictionsData = ''
    let isModelMetrics = false
    const lines = output.split('\n')
    for (const line of lines) {
        if (line.startsWith('Model for')) {
            // Model evaluation metrics
            isModelMetrics = true
        } else if (line.startsWith('{')) {
            // Prediction results
            isModelMetrics = false
        }

        if (isModelMetrics) {
            modelMetrics += line + '\n'
        } else {
            predictionsData += line + '\n'
        }
    }
    return [modelMetrics.trim(), predictionsData.trim()]
}

exports.predictions = async (req, res) => {
    console.log(req.body)
    const interval = req.body.interval * 60
    const number = req.body.number
    const id = '654b4c3f42782e08d6a9af5e'

    const datas = await serverData.findById(id)

    const predict = JSON.stringify([
        {
            dataName: 'temparature',
            interval,
            number,
        },
        {
            dataName: 'pressure',
            interval,
            number,
        },
        {
            dataName: 'humidity',
            interval,
            number,
        },
    ])

    const datase = datas.data[0].variableNode
    // converting the timeStamp into this format ddd MMM DD YYYY HH:mm:ss (2023-11-30 11:21:07)
    for (let i = 0; i < 3; i++) {
        datase[i].dataSource.forEach((entry) => {
            entry.timeStamp = moment(
                entry.timeStamp,
                'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ'
            ).format('YYYY-MM-DD HH:mm:ss')
        })
    }

    //this the data for traing the model
    const dataValue = JSON.stringify(datase)
    // console.log(dataValue)

    try {
        //here we specifyting the python script along with passing the two arguments
        //running child process
        const scriptPath = path.join(
            __dirname,
            '..',
            'pythonScripts',
            'new7.py'
        )

        const python = spawn('python', [scriptPath, dataValue, predict])
        let pythonOutput = ''
        //here we captureing the data printed on python script
        python.stdout.on('data', function (data) {
            // Now pythonOutput contains the entire output
            pythonOutput += data.toString()
        })

        // Handle errors during the execution of the Python script
        python.stderr.on('data', function (data) {
            console.error('Error from Python script:', data.toString())
        })
        // Handle the closure of the child process

        python.on('close', (code) => {
            //0=success, 1=error
            // console.log(`Child process closed with code ${code}`)
            if (code === 0) {
                // console.log('The process exited successfully')
                //  split it into modelMetrics and predictionsData
                const [modelMetrics, predictionsData] =
                    splitOutput(pythonOutput)
                // console.log('Model Metrics:', modelMetrics)
                const predictions = JSON.parse(predictionsData)
                // Loop through the predictions object
                predictions.predictions.forEach((predictionData) => {
                    // console.log(`Data Name: ${predictionData.dataName}`)

                    console.log('Data and Timestamps:')
                    for (
                        let i = 0;
                        i < predictionData.predictions.length;
                        i++
                    ) {
                        const prediction = predictionData.predictions[i]
                        const timestamp = predictionData.timestamps[i]
                        // console.log(`  ${prediction} - ${timestamp}`)
                    }
                    console.log('\n')
                })

                pdfGenarator(predictions.predictions).then((path) => {
                    console.log('PDF Path:', path)

                    res.render('PredictedValues', {
                        dataList: predictions.predictions,
                        pdfName: path,
                    })
                })
            } else {
                // The process exited with an error
                console.log('Error occurred')
                return res.status(500).json({
                    status: 'failed',
                })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

exports.downloadPdf = (req, res) => {
    console.log('vjvjv', req.params.pdf)
    const filePath = path.join(__dirname, '..', 'pdfGenarated', req.params.pdf)
    const pdfName = req.params.pdfName
    console.log(filePath)
    // const filePath = path.join(pdfsDirectory, pdfName)

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('PDF file not found:', err)
            return res.status(404).send('PDF file not found')
        }

        // Set response headers for PDF download
        res.setHeader('Content-disposition', 'attachment; filename=' + pdfName)
        res.setHeader('Content-type', 'application/pdf')

        // Create a read stream from the PDF file and pipe it to the response
        const fileStream = fs.createReadStream(filePath)
        fileStream.on('error', (err) => {
            console.error('Error reading PDF file:', err)
            res.status(500).send('Internal Server Error')
        })
        fileStream.pipe(res)
    })
}
