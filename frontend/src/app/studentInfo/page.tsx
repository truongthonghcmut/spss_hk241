"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/assets/Images/logo.png"
import "../studentInfo/header.css"
import axios from "axios";

interface Student {
  name: string;
  email: string;
  avatar: string;
}

interface EWallet {
  ms: string;
  balance: number;
}

interface PrintHistory {
  date: string;
  location: string;
  time: string;
  pages: number;
}

interface TransactionHistory {
  date: string;
  time: string;
  pages: number;
  total: number;
}

interface File {
  _id: string;
  name: string;
  link: string;
  pages: number;
}

export default function StudentProfile() {
  const [student, setStudent] = useState<Student>();
  const [ewallet, setEWallet] = useState<EWallet>();
  const [printHistory, setPrintHistory] = useState<PrintHistory[]>([]);
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const [files, setFile] = useState<File[]>([]);

  const handleDelete = async (_id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this file?');
    if (confirmed) {
      try {
        await axios.delete(`https://printingsystem-dev-by-swimteam.onrender.com/api/file/${_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        window.location.reload(); // Reload the page after deletion
        // Optionally, refresh the list of files or update the state to remove the deleted file
      } catch (error) {
        console.error('There was an error deleting the file!', error);
      }
    } else return;
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    /* Fetch account data */
      axios.get('https://printingsystem-dev-by-swimteam.onrender.com/api/account/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setStudent(response.data.account);
      })
      .catch(error => {
        console.error("There was an error fetching the account data!", error);
      });
    
    /* Fetch e-wallet data */
      axios.get('https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
         setEWallet(response.data.ewallet);
      })
    
    /* Fetch print history */
      axios.get("https://printingsystem-dev-by-swimteam.onrender.com/api/history/", { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        const newHistory: PrintHistory[] = response.data.historys.map((item: { createdAt: string; location: string; pages: number; paperSize: string; }) => {
          if (item.createdAt) {
            const [datePart, timePart] = item.createdAt.split('T');
            return {
              date: datePart,
              time: timePart?.split('.')[0] || '',
              location: item.location,
              pages: item.pages,
            };
          } else {
            return {
              date: '',
              time: '',
              location: item.location,
              pages: item.pages,
            };
          }
        });
        setPrintHistory(newHistory);
      });
    
    /*fetch file name */
    axios.get("https://printingsystem-dev-by-swimteam.onrender.com/api/file/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
      setFile(response.data.files)
    })
    
  }, [])

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
                {student?.avatar ? student.avatar : "NA"}
              </div>
                <h2 className="text-xl font-bold text-blue-700">{ student?.name }</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={student?.name ?? "Hệ thống đang lỗi tên"}
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
                  value= {ewallet?.ms ? ewallet?.ms : "Sinh viên chưa cập nhật MSSV"}
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
                  value= {student?.email ?? "Hệ thống đang lỗi email"}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-200 text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">
                  Số dư tài khoản
                </label>
                <input
                  type="text"
                  value= {ewallet?.balance ?? "Hệ thống đang lỗi số dư"}
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
                  {/* <th className="px-4 py-2 border">Khổ giấy</th> */}
                </tr>
              </thead>
               <tbody>
                {printHistory.map((record, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-black">{record.date}</td>
                    <td className="px-4 py-2 border text-black">{record.location}</td>
                    <td className="px-4 py-2 border text-black">{record.time}</td>
                    <td className="px-4 py-2 border text-black">{record.pages}</td>
                    {/* <td className="px-4 py-2 border text-black">{record.paperSize}</td> */}
                  </tr>
                ))}
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
              <h3 className="text-lg font-bold text-blue-700 mb-4">File của tôi</h3>
              <table className="w-full border border-black rounded-lg overflow-hidden text-sm text-left">
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="px-4 py-2 border">Tên file</th>
                  <th className="px-4 py-2 border">Link</th>
                  <th className="px-4 py-2 border">Số tờ</th>
                  <th className="px-4 py-2 border">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {files.map((record, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-black">{record.name}</td>
                    <td className="px-4 py-2 border text-black">
                      <button 
                        className="text-blue-500 underline" 
                        onClick={() => window.location.href = record.link}
                      >
                        Link
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-black">{record.pages}</td>
                    <td className="px-4 py-2 border text-black">
                      <button 
                        className="text-red-500 underline" 
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
