import { studentModel } from '../model/student_model.js'

export default async (req, res) => {
  try {
    const stu_ID = req.params.Stu_ID

    const student = await studentModel.findOne({ Stu_ID: stu_ID }).exec()
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    return res.status(200).json({
      message: 'Student found',
      student: student
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'An internal server error occurred, please try again.'
    })
  }
}
