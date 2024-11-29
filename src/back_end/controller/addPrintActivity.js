import { printHistoryModel } from '../model/printhistory_model.js'

export default async (req, res) => {
  try {

    const { Index, Stu_name, Stu_ID, Filename, Time, Printer_name, Building, No_pages, Paper_type, Author, Content_sum } = req.body;

    // Check if all required fields are provided
    if (!Index || !Stu_name || !Stu_ID || !Filename || !Time || !Printer_name || !Building || !No_pages || !Paper_type || !Author || !Content_sum) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create a new print history instance
    const newPrintHistory = new printHistoryModel({
      Index,
      Stu_name,
      Stu_ID,
      Filename,
      Time,
      Printer_name,
      Building,
      No_pages,
      Paper_type,
      Author,
      Content_sum,
    });

    await newPrintHistory.save();

    return res.status(201).json({
      message: 'Successfully added print history',
      student: newPrintHistory
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'An internal server error occurred, please try again.'
    })
  }
}