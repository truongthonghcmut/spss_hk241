"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Logo from "../../../public/assets/Images/logo.png"
import "../printDocument/header.css"

interface Printer {
  _id: string;
  brand: string;
  type: string;
  // Thêm các thuộc tính khác nếu cần
}

export default function PrintPage() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [fileName, setFileName] = useState("Chưa có tài liệu được tải lên");
  const [paperCount, setPaperCount] = useState(-1);
  const [printQuantity, setPrintQuantity] = useState(1);
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [selectedPrinter, setSelectedPrinter] = useState<string>('');
  const [selectedPaperSize, setSelectedPaperSize] = useState<string>('');
  const [printFormat, setPrintFormat] = useState("In một mặt");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    // console.log(selectedFile)
    if (selectedFile) { 
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    axios.get('https://printingsystem-dev-by-swimteam.onrender.com/api/printer', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setPrinters(response.data.listPrinter)
        if (response.data.listPrinter.length > 0) 
          setSelectedPrinter(response.data.listPrinter[0].brand);
        if (response.data.listPrinter[0].type === 'A3')
            setSelectedPaperSize('A3 (420 mm x 297 mm)');
          else setSelectedPaperSize('A4 (297 mm x 210 mm)');
      })
      .catch(error => console.error('Error fetching printers:', error)) 
    
    axios.get('https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setPaperCount(response.data.ewallet.balancePaper)
      })
      .catch(error => console.error('Error fetching paper count:', error))
  }, [])

  const getAvailablePaperSizes = () => {
    if (!selectedPrinter) return [];
    const printer = printers.find(p => p.brand === selectedPrinter);
    if (!printer) return [];
    switch (printer?.type) {
      case 'A4':
        return ['A4 (297 mm x 210 mm)'];
      case 'A3':
        return ['A3 (420 mm x 297 mm)'];
      case 'A4 and A3':
      case 'A3 and A4': // Đảm bảo tương thích nhiều cách ghi
        return ['A4 (297 mm x 210 mm)', 'A3 (420 mm x 297 mm)'];
      default:
        return [];
    }
  };

  const handlePurchaseMorePaper = () => {
    router.push("/purchasePaper");
  };

  const handleConfirmPrint = () => {
    setLoading(true);
    if (printQuantity > paperCount) 
      setErrorMessage('Số lượng bản in vượt quá số lượng tờ còn lại.');
    else if (printQuantity <= 0)
      setErrorMessage('Số lượng bản in phải lớn hơn 0.');
    else if (fileName === "Chưa có tài liệu được tải lên") 
      setErrorMessage('Chưa có tài liệu được tải lên.');
    else {
      const token = localStorage.getItem('token')
      const formData = new FormData();
      if (file) formData.append('file', file);
      else {
        console.error('File is undefined');
        setErrorMessage('File không hợp lệ.');
        return;
      }

      axios.post('https://printingsystem-dev-by-swimteam.onrender.com/api/file', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        const fileId = response.data.file._id;
        console.log(fileId);
        const printerId = printers.find(p => p.brand === selectedPrinter)?._id;
        console.log(printerId);

        axios.post('https://printingsystem-dev-by-swimteam.onrender.com/api/printer', {
          fileId,
          printerId,
          selectedPaperSize,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(() => {
        alert("Đã xác nhận in thành công.");
        router.push('/student_homepage');
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Có lỗi xảy ra khi in.');
      })
      .finally(() => {
        setLoading(false);
      });
    };
  }
  const handleCancel = () => {
    setFile(undefined);
    setFileName("Chưa có tài liệu được tải lên");
    setPrintQuantity(1);
    setSelectedPrinter(printers[0].brand);
    setSelectedPaperSize(printers[0].type === 'A3' ? 'A3 (420 mm x 297 mm)' : 'A4 (297 mm x 210 mm)');
    setPrintFormat("In một mặt");
  }; 

  return (
    <>
    <header className="header">
        <div className="logo">
        <Image src={Logo} alt="Logo" width={80} height={80} />
          <span>HCMUT-SSPS</span>
        </div>
        <nav className="navbar">
          <a href="/student_homepage">Trang chủ</a>
          <a href="/printDocument">In tài liệu</a>
          <a href="/studentInfo">Hồ sơ cá nhân</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>
    <div className="min-h-screen bg-gray-50 py-10 text-black">
      <div className="w-full max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Tải tệp lên
        </h1>

        {/* Tải tài liệu */}
        <div className="mb-8">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="fileUpload"
          >
            Chọn tài liệu
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              Chọn tài liệu
            </label>
            <span className="text-gray-600">{fileName}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Định dạng hỗ trợ: PDF
          </p>
        </div>

        {/* Máy in và thông tin in */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chọn máy in */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Chọn máy in
            </h3>
            <div className="space-y-2">
              {printers.map((printer, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedPrinter(printer.brand)
                    setSelectedPaperSize(printer.type === 'A3' ? 'A3 (420 mm x 297 mm)' : 'A4 (297 mm x 210 mm)');
                  }}
                  className={`cursor-pointer px-4 py-2 border rounded-lg ${
                    selectedPrinter === printer.brand
                      ? "bg-yellow-200 border-yellow-400"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {printer.brand}
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-4">
              Số lượng tờ còn lại tương ứng:{" "}
              <span className="bg-yellow-200 px-2 py-1 rounded">
                {paperCount}
              </span>
            </h3>
            <button
              className="text-blue-500 hover:underline"
              onClick={handlePurchaseMorePaper}
            >
              Mua thêm
            </button>

            <div className="mt-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="printQuantity"
              >
                Số lượng bản in:
              </label>
              <input
                type="number"
                id="printQuantity"
                value={printQuantity}
                onChange={(e) => setPrintQuantity(Number(e.target.value))}
                min={1}
                className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Chọn cỡ giấy in */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Chọn cỡ giấy in
          </h3>
          <div className="space-y-2">
            {getAvailablePaperSizes().map((size) => (
              <div
                key={size}
                onClick={() => setSelectedPaperSize(size)}
                className={`cursor-pointer px-4 py-2 border rounded-lg ${
                  selectedPaperSize === size
                    ? "bg-yellow-200 border-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Chọn định dạng in */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Chọn định dạng in
          </h3>
          <div className="flex space-x-4">
            {["In một mặt", "In hai mặt"].map((format) => (
              <div
                key={format}
                onClick={() => setPrintFormat(format)}
                className={`cursor-pointer px-4 py-2 border rounded-lg ${
                  printFormat === format
                    ? "bg-yellow-200 border-yellow-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {format}
              </div>
            ))}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-8 flex justify-end space-x-4">
            <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handleCancel}
                disabled={loading}
            >
            Hủy bỏ các lựa chọn
          </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handleConfirmPrint}
              disabled = { loading }
            >
            Xác nhận in
          </button>
          </div>
          
        {/* Thông báo lỗi */}
        {errorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-red-500 mb-4">{errorMessage}</p>
              <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setErrorMessage('')}
              >
                Đóng
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
