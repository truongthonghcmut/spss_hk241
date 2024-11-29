import { printerModel } from '../model/printer_model.js';

const changeStatus = async (req, res) => {
  const printerId = req.params.id
  const newStatus = req.body.status // Trạng thái mới được gửi từ yêu cầu
  
    try {
      // Kiểm tra nếu trạng thái mới không được cung cấp
      if (!newStatus) {
        return res.status(400).json({
        message: 'Please produce new status.'
        });
      }
  
      // Tìm máy in và cập nhật trạng thái
      const updatedPrinter = await printerModel.findByIdAndUpdate(
        printerId,
        { Status: newStatus },
        { new: true } // Tùy chọn để trả về bản ghi sau khi cập nhật
      );
  
      // Kiểm tra nếu máy in không tồn tại
      if (!updatedPrinter) {
        return res.status(404).json({
        message: 'Printer not found.'
        });
      }
  
      // Trả về kết quả thành công
      res.json({
        message: 'Printer found',
      printer: updatedPrinter
      });
    } catch (error) {
      // Xử lý lỗi
      res.status(500).json({
        message: 'Đã xảy ra lỗi khi thay đổi trạng thái máy in.',
      error: error.message
    })
  }
}
  
export default changeStatus
