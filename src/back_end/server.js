//This one just use for test
import express from 'express'
// import getStuEmail from './getStuEmail.js'
// import addPrintActivity from './addPrintActivity.js'
// import getPrintTime from './getPrintTime.js'
// import getPrintFile from './getPrintFile.js'
// import getNumPage from './getNumPage.js'
// import getPageType from './getPageType.js'
// import getBuilding from './getBuilding.js'
// import getPaymentAmount from './getPaymentAmount.js'
// import getPaymentTime from './getPaymentTime.js'
// import getPurchasedPage from './getPurchasedPage.js'
import addPrinter from './controller/Printer/addPrinter.js'
import changeStatus from './controller/Printer/changeStatus.js'

// Initialize Express
const PORT = process.env.PORT || 5007 // Use PORT from environment variables or default to 5000

const app = express()
// Middleware
app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true }))

// // Define routes **AFTER IMPORT**
// app.get('/getStuEmail/:Stu_ID', getStuEmail) // Route for fetching student details

// app.get('/getPrintTime', getPrintTime)
// app.get('/getPrintFile', getPrintFile)
// app.get('/getNumPage', getNumPage)
// app.get('/getPageType', getPageType)
// app.get('/getBuilding', getBuilding)
// app.get('/getPaymentAmount', getPaymentAmount)
// app.get('/getPaymentTime', getPaymentTime)
// app.get('/getPurchasedPage', getPurchasedPage)

// // route to insert new print activity
// app.post('/addPrintActivity/', addPrintActivity)
app.post('/addPrinter', addPrinter)

//route to change data in database
app.patch('/changeStatus/:id', changeStatus)

// app.post('/login/', (req, res) => {
//     // const { Index, Stu_name, Stu_ID, Filename, Time, Printer_name, Building, No_pages, Paper_type, Author, Content_sum } = req.body;

//     console.log('Received data:', req.body); // Check the received body

//     return res.status(200).json({
//         message: 'Print activity data received successfully.',
//         data: JSON.stringify(req.body)
//     });
// });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the API!')
})

// Example route for fetching data (replace with your actual routes)
app.get('/example', (req, res) => {
  res.json({ message: 'This is an example endpoint!' })
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

export default app
