import mongoose from 'mongoose'
import db from '../db_connect'
const Schema = mongoose.Schema

const printHistorySchema = new Schema(
  {
    Index: Number,
    Stu_name: String,
    Stu_ID: String,
    Filename: String,
    Time: { type: Date, default: Date.now },
    Printer_name: String,
    Building: String,
    No_pages: Number,
    Paper_type: String,
    Author: String,
    Content_sum: String
  },
  { collection: 'PrintHistory' }
)

const printHistoryModel = db.model('PrintHistory', printHistorySchema)

// CRUD functions to interact with the database
// const test = printerHistoryModel
//   .create({
//     Index: 1,
//     Stu_name: 'Nguyễn Vũ Quang Minh',
//     Stu_ID: 2212071,
//     Filename: 'Bí kíp không làm vẫn có ăn',
//     Time: new Date('2024-11-21T12:45:27.000+00:00'),
//     Printer_name: 'Brother 143',
//     Building: 'H6',
//     No_pages: 5,
//     Paper_type: 'A4'
//   })
//   .then(() => {
//     console.log('Printer created with _id:' + test._id)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// printerHistoryModel.find().then((printerhistory) => {
//   for (let i = 0; i < printerhistory.length; i++) {
//     console.log('Printer History: ' + printerhistory[i])
//   }
// })

// const update = async () => {
//   try {
//     const result = await printerHistoryModel.updateOne(
//       { Stu_ID: 2212071 }, // Filter to find the document
//       { $set: { Printer_name: 'Brother 143' } } // Update operation
//     )
//     console.log('Update result:', result)
//   } catch (err) {
//     console.error('Error updating user:', err)
//   }
// }
// update()

// const deleteById = async () => {
//   const userId = '6741a7dfaa676128ec3278ff'
//   try {
//     const deletedPrinterHistory = await printerHistoryModel.findByIdAndDelete(userId)
//     if (deletedPrinterHistory) {
//       console.log('Deleted Printer:', deletedPrinterHistory)
//     } else {
//       console.log('User not found.')
//     }
//   } catch (err) {
//     console.error('Error deleting printer:', err)
//   }
// }

// deleteById()

export default printHistoryModel
