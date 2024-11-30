import { printerModel } from '../model/printer_model.js'

export default async (req, res) => {
  try {
    const print_ID = req.params.Print_ID

    const printer = await printerModel.findOne({ Print_ID: print_ID }).exec()
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' })
    }

    return res.status(200).json({
      message: 'Printer ' + printer.Print_ID + 'has the number of pages: ',
      Printer_pages: printer.Printer_pages
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: 'An internal server error occurred, please try again.'
    })
  }
}
