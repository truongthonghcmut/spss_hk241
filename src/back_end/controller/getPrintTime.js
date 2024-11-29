import { printHistoryModel } from '../model/printhistory_model.js'

export default async (req, res) => {
  try {
    const {Stu_ID, Index} = req.query

    if (!Stu_ID || !Index) {
      return res.status(400).json({ message: 'Stu_ID and Index are required.' });
    }

    const history = await printHistoryModel.findOne({ Stu_ID, Index }).exec();

    if (!history) {
      return res.status(404).json({ message: 'Property not found' })
    }

    return res.status(200).json({
      message: 'Property found',
      printTime: history.Time
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'An internal server error occurred, please try again.'
    })
  }
}