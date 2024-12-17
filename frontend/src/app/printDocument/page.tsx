"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/assets/Images/logo.png"
import "../printDocument/header.css"

export default function PrintPage() {
  const router = useRouter();
  const [fileName, setFileName] = useState("Chưa có tài liệu được tải lên");
  const [paperCount, setPaperCount] = useState(5);
  const [printQuantity, setPrintQuantity] = useState(1);
  const [selectedPrinter, setSelectedPrinter] = useState(
    "Canon LBP603W - A5 - CS1"
  );
  const [selectedPaperSize, setSelectedPaperSize] = useState(
    "A4 (297 mm x 210 mm)"
  );
  const [printFormat, setPrintFormat] = useState("In một mặt");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handlePurchaseMorePaper = () => {
    router.push("/purchasePaper");
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
            Định dạng hỗ trợ: PDF, Word, PPT, PNG
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
              {[
                "Canon LBP603W - A5 - CS1",
                "HP LaserJet M211d - B4 - CS1",
                "LBP2900 - H3 - CS2",
                "HP 107a (4ZB77A) - H6 - CS2",
              ].map((printer) => (
                <div
                  key={printer}
                  onClick={() => setSelectedPrinter(printer)}
                  className={`cursor-pointer px-4 py-2 border rounded-lg ${
                    selectedPrinter === printer
                      ? "bg-yellow-200 border-yellow-400"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {printer}
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
            {["A4 (297 mm x 210 mm)", "A3 (420 mm x 297 mm)"].map((size) => (
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
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
            Hủy bỏ các lựa chọn
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Xác nhận in
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
