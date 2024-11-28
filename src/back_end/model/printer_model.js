import mongoose from 'mongoose'
import db from '../db_connect'
const Schema = mongoose.Schema

const printerSchema = new Schema(
  {
    Name: String,
    Building: String,
    Location: String,
    Status: String,
    Printer_pages: Number,
    Brand: String,
    Print_list: [{ type: Schema.Types.ObjectId, ref: 'PrintHistory' }]
  },
  { collection: 'Printer' }
)

const printerModel = db.model('Printer', printerSchema)

// // CRUD functions to interact with the database
// const test = printerModel
//   .create({
//     Name: 'Lamont',
//     Building: 'H2',
//     Location: 'Đại học Bách Khoa TP.HCM',
//     Status: 'Processing',
//     Printer_pages: 574,
//     Brand: 'Epson',
//     Print_list: [
//       '4b15922c05fe27d1624ffeb6',
//       'bafae3eaf1aadbaf2c5fdbea',
//       'bc8acdfae890ec34a1e5f9f9',
//       '3670cd07a01c12db48a0fe14',
//       '021dce4cf37d921f1c582e1c',
//       '0839f71e8d1bb522fcf9857b'
//     ]
//   })
//   .then(() => {
//     console.log('Printer created with _id:' + test._id)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// printerModel.find().then((printers) => {
//   for (let i = 0; i < printers.length; i++) {
//     console.log('Printer: ' + printers[i])
//   }
// })

// const update = async () => {
//   try {
//     const result = await printerModel.updateOne(
//       { _id: '67433af4fc13ae6e74eecff5' }, // Filter to find the document
//       { $set: { Status: 'Processing' } } // Update operation
//     )
//     console.log('Update result:', result)
//   } catch (err) {
//     console.error('Error updating user:', err)
//   }
// }

// update()

// const deleteById = async () => {
//   const userId = '67433af4fc13ae6e74eecff5'
//   try {
//     const deletedPrinter = await printerModel.findByIdAndDelete(userId)
//     if (deletedPrinter) {
//       console.log('Deleted Printer:', deletedPrinter)
//     } else {
//       console.log('User not found.')
//     }
//   } catch (err) {
//     console.error('Error deleting printer:', err)
//   }
// }

// deleteById()

export { printerModel }
