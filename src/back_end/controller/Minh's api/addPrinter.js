import { printerModel } from '../model/printer_model.js';

const addPrinter = async (req, res) => {
    const { Name, Building, Location, Status, Printer_pages, Brand, Print_list } = req.body;
  
    try {
      // Tạo máy in mới
      const newPrinter = new printerModel({
        Name,
        Building,
        Location,
        Status,
        Printer_pages,
        Brand,
        Print_list,
      });
  
      // Lưu máy in vào cơ sở dữ liệu
      const savedPrinter = await newPrinter.save();
  
      // Phản hồi thành công
      res.status(201).json({
        message: 'Máy in mới đã được thêm thành công.',
        printer: savedPrinter,
      });
    } catch (error) {
      // Xử lý lỗi
      res.status(500).json({
        message: 'Đã xảy ra lỗi khi thêm máy in.',
        error: error.message,
      });
    }
  };
  
  export default addPrinter;