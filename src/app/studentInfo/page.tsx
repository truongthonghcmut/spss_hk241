"use client";
import React from "react";

export default function StudentProfile() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
        {/* Header */}
        <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          HỒ SƠ CÁ NHÂN
        </h1>

        {/* Thông tin sinh viên */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
            <div className="flex items-center gap-4 mb-6">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                NA
              </div>
              <h2 className="text-xl font-bold text-blue-700">NGUYỄN VĂN A</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value="Nguyễn Văn A"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  MSSV
                </label>
                <input
                  type="text"
                  value="2213224"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Email
                </label>
                <input
                  type="text"
                  value="a.nv@hcmut.edu.vn"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Khoa
                </label>
                <input
                  type="text"
                  value="Khoa học và Kỹ thuật Máy tính"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Niên khóa
                </label>
                <input
                  type="text"
                  value="2022"
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
            </div>
          </div>

          {/* Nhật ký in */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4">Nhật ký in ấn</h3>
            <table className="w-full border border-black rounded-lg overflow-hidden text-sm text-left">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="px-4 py-2 border">Ngày</th>
                  <th className="px-4 py-2 border">Địa điểm</th>
                  <th className="px-4 py-2 border">Giờ</th>
                  <th className="px-4 py-2 border">Số tờ</th>
                  <th className="px-4 py-2 border">Khổ giấy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border text-black">22/10/2024</td>
                  <td className="px-4 py-2 border text-black">A5 - CS1</td>
                  <td className="px-4 py-2 border text-black">10:37</td>
                  <td className="px-4 py-2 border text-black">10</td>
                  <td className="px-4 py-2 border text-black">A4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border text-black">18/10/2024</td>
                  <td className="px-4 py-2 border text-black">A5 - CS1</td>
                  <td className="px-4 py-2 border text-black">15:11</td>
                  <td className="px-4 py-2 border text-black">16</td>
                  <td className="px-4 py-2 border text-black">A4</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border text-black">16/10/2024</td>
                  <td className="px-4 py-2 border text-black">A5 - CS1</td>
                  <td className="px-4 py-2 border text-black">12:10</td>
                  <td className="px-4 py-2 border text-black">12</td>
                  <td className="px-4 py-2 border text-black">A4</td>
                </tr>
              </tbody>
            </table>
            <h3 className="text-lg font-bold text-blue-700 mb-4">Nhật ký giao dịch</h3>
            <table className="w-full border border-black rounded-lg overflow-hidden text-sm text-left">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="px-4 py-2 border">Ngày</th>
                  <th className="px-4 py-2 border">Giờ</th>
                  <th className="px-4 py-2 border">Số tờ</th>
                  <th className="px-4 py-2 border">Khổ giấy</th>
                  <th className="px-4 py-2 border">Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border text-black">22/10/2024</td>
                  <td className="px-4 py-2 border text-black">10:33</td>
                  <td className="px-4 py-2 border text-black">10</td>
                  <td className="px-4 py-2 border text-black">A4</td>
                  <td className="px-4 py-2 border text-black">5.000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border text-black">18/10/2024</td>
                  <td className="px-4 py-2 border text-black">10:57</td>
                  <td className="px-4 py-2 border text-black">10</td>
                  <td className="px-4 py-2 border text-black">A4</td>
                  <td className="px-4 py-2 border text-black">5.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
