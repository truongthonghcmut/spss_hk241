import { orderModel } from '../../model/order_model.js'

const addOrder = async (req, res) => {
  const { Paper_type, Quantity, TotalPrice, Payment_time, Supplier_name, ContactInfo } = req.body

  try {
    // Tạo máy in mới
    const newOrder = await orderModel.create({
      Paper_type: Paper_type,
      Quantity: Quantity,
      TotalPrice: TotalPrice,
      Payment_time: Payment_time,
      Supplier_name: Supplier_name,
      ContactInfo: ContactInfo
    })

    // Phản hồi thành công
    if (!newOrder.ContactInfo) {
      return res.status(400).json({
        message: 'Không thể tạo đơn đặt hàng mới.'
      })
    }
    res.status(201).json({
      message: 'Đơn hàng đã được tạo thành công.',
      printer: newOrder
    })
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi thêm máy in.',
      error: error.message
    })
  }
}

export default addOrder
