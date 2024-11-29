import { studentModel } from '../model/student_model.js';

const getPrintTime = async (req, res) => {
    const { ID, Index } = req.params; // Lấy mã sinh viên và chỉ mục từ URL
  
    try {
      // Tìm sinh viên trong cơ sở dữ liệu theo Stu_ID
      const student = await studentModel
        .findOne({ Stu_ID: stu_ID })
        .populate({
          path: 'PrintHistory', // Liên kết tới bảng PrintHistory
          select: 'printTime', // Chỉ lấy trường thời gian in ấn
        });
  
      if (!student) {
        // Nếu không tìm thấy sinh viên
        return res.status(404).json({
          message: `Không tìm thấy sinh viên với ID: ${ID}`,
        });
      }
  
      // Kiểm tra nếu chỉ mục không hợp lệ
      if (!student.PrintHistory || Index >= student.PrintHistory.length || Index < 0) {
        return res.status(400).json({
          message: `Chỉ mục không hợp lệ. Tổng số lịch sử in: ${student.PrintHistory.length}`,
        });
      }
  
      // Lấy thông tin thời gian in từ chỉ mục
      const printTime = student.PrintHistory[Index].printTime;
  
      res.status(200).json({
        message: 'Lấy thời gian in thành công.',
        printTime,
      });
    } catch (error) {
      // Xử lý lỗi
      res.status(500).json({
        error: 'An internal server error occurred, please try again.'
      });
    }
  };
  
  export default getPrintTime;