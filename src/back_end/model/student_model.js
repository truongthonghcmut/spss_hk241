import mongoose from 'mongoose'
import db from '../db_connect'
const Schema = mongoose.Schema

// Define the schema for the student model
const studentSchema = new Schema(
  {
    Stu_ID: Number,
    Stu_name: String,
    Stu_email: { type: String, required: true, unique: true },
    PrintHistory: [{ type: Schema.Types.ObjectId, ref: 'PrintHistory' }],
    PaymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    Username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: 'Student' }
)

// Create the student model
const studentModel = db.model('Student', studentSchema)

// CRUD functions to interact with the database
// const test = studentModel
//   .create({
//     Stu_ID: 2213779,
//     Stu_name: 'Nguyễn Cao Tuấn',
//     Stu_email: 'tuan.nguyenjerry1@hcmut.edu.vn',
//     PrintHistory: ['674332c1fc13ae6dafeed369', '674332c1fc13ae6dafeed36e'],
//     PaymentHistory: [],
//     Username: 'tuan.nguyenjerry1',
//     password: 'taolam1concho'
//   })
//   .then(() => {
//     console.log('Student created with _id:' + test._id)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// studentModel.find().then((students) => {
//   for (let i = 0; i < students.length; i++) {
//     console.log('Student: ' + students[i])
//   }
// })

// const update = async () => {
//   try {
//     const result = await studentModel.updateOne(
//       { Stu_ID: 2212071 }, // Filter to find the document
//       { $set: { password: 'toibingu' } } // Update operation
//     )
//     console.log('Update result:', result)
//   } catch (err) {
//     console.error('Error updating user:', err)
//   }
// }

// update()

// const deleteById = async () => {
//   const userId = '67433720fc13ae6ed5eedc90' // Replace with actual user ID
//   try {
//     const deletedStudent = await studentModel.findByIdAndDelete(userId)
//     if (deletedStudent) {
//       console.log('Deleted user:', deletedStudent)
//     } else {
//       console.log('User not found.')
//     }
//   } catch (err) {
//     console.error('Error deleting user:', err)
//   }
// }

// deleteById()

export default studentModel
