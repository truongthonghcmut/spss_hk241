import mongoose from 'mongoose'
import db from '../db_connect'
const Schema = mongoose.Schema

// Define the schema for the student model
const orderSchema = new Schema(
  {
    Paper_type: String,
    Quantity: Number,
    TotalPrice: Number,
    PaymentTime: { type: Date, default: Date.now },
    Supplier_name: String,
    ContactInfo: String
  },
  { collection: 'Order' }
)

// Create the student model
const orderModel = db.model('Order', orderSchema)

export { orderModel }
