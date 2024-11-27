import mongoose from 'mongoose'
import db from '../db_connect'

const Schema = mongoose.Schema

// Định nghĩa schema cho PrintPolicy
const printPolicySchema = new Schema(
  {
    Default_page: Number,
    Default_date: { type: Date, default: Date.now },
    Max_size: Number,
    Permitted_file: [{ type: String }]
  },
  { collection: 'PrintPolicy' }
)

// Tạo model từ schema
const PrintPolicyModel = db.model('PrintPolicy', printPolicySchema)

// CRUD functions để tương tác với cơ sở dữ liệu

// // Tạo một policy mới
// const createPolicy = async () => {
//   try {
//     const newPolicy = await PrintPolicyModel.create({
//       Default_page: 100,
//       Max_size: 5, // Max size in MB
//       Permitted_file: ['pdf', 'docx', 'png']
//     })
//     console.log('Policy created with _id:', newPolicy._id)
//   } catch (err) {
//     console.error('Error creating policy:', err)
//   }
// }

// // Lấy danh sách tất cả các policies
// const getAllPolicies = async () => {
//   try {
//     const policies = await PrintPolicyModel.find()
//     policies.forEach((policy, index) => {
//       console.log(`Policy ${index + 1}:`, policy)
//     })
//   } catch (err) {
//     console.error('Error retrieving policies:', err)
//   }
// }

// // Cập nhật một policy theo ID
// const updatePolicy = async () => {
//   const policyId = '1234567890abcdef12345678' // Thay bằng ID thực tế
//   try {
//     const result = await PrintPolicyModel.updateOne(
//       { _id: policyId },
//       { $set: { Max_size: 10 } } // Cập nhật Max_size thành 10MB
//     )
//     console.log('Update result:', result)
//   } catch (err) {
//     console.error('Error updating policy:', err)
//   }
// }

// // Xóa một policy theo ID
// const deletePolicyById = async () => {
//   const policyId = '1234567890abcdef12345678' // Thay bằng ID thực tế
//   try {
//     const deletedPolicy = await PrintPolicyModel.findByIdAndDelete(policyId)
//     if (deletedPolicy) {
//       console.log('Deleted policy:', deletedPolicy)
//     } else {
//       console.log('Policy not found.')
//     }
//   } catch (err) {
//     console.error('Error deleting policy:', err)
//   }
// }

// Gọi các function để kiểm tra hoạt động
// createPolicy();
// getAllPolicies();
// updatePolicy();
// deletePolicyById();

export default PrintPolicyModel
