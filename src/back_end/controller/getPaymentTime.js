import { studentModel } from '../model/student_model.js'
import { orderModel } from '../model/order_model.js'

export default async (req, res) => {
  try {
    const { Stu_ID, Index } = req.query;

    if (!Stu_ID || Index === undefined) {
      return res.status(400).json({ message: 'Stu_ID and index are required.' });
    }

    const student = await studentModel.findOne({ Stu_ID }).exec();

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    const paymentId = student.PaymentHistory[Index];
    if (!paymentId) {
      return res.status(404).json({ message: 'Payment history entry not found at the specified index.' });
    }

    const order = await orderModel.findById(paymentId).exec();

    if (!order) {
      return res.status(404).json({ message: 'Order not found for the provided PaymentHistory ID.' });
    }

    res.status(200).json({
      message: 'TotalPrice retrieved successfully.',
      PaymentTime: order.PaymentTime,
    });
  } catch (error) {
    console.error('Error retrieving TotalPrice:', error);
    res.status(500).json({
      message: 'An internal server error occurred.',
      error: error.message,
    });
  }
}