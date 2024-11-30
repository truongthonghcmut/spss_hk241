import { printerModel } from '../../model/printer_model.js'

const addPrinter = async (req, res) => {
  const { Name, Building, Location, Status, Printer_pages, Brand, Print_list } = req.body

  try {
    // Tạo máy in mới
    const newPrinter = await printerModel.create({
      Name: Name,
      Building: Building,
      Location: Location,
      Status: Status,
      Printer_pages: Printer_pages,
      Brand: Brand,
      Print_list: Print_list
    })

    // Phản hồi thành công
    if (!newPrinter.Name) {
      return res.status(400).json({
        message: 'Không thể tạo máy in mới.'
      })
    }
    res.status(201).json({
      message: 'Máy in mới đã được thêm thành công.',
      printer: newPrinter
    })
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({
      message: 'Đã xảy ra lỗi khi thêm máy in.',
      error: error.message
    })
  }
}

export default addPrinter
