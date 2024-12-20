"use client";
import React, { useState, useEffect } from "react";
import "./system_manage.css";
import Image from "next/image";
import axios from "axios";

import Images from "../../../public/assets/Images/logo.png";

interface Printer {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive";
  pagesPrinted: number;
}

interface FileType {
  id: string;
  name: string;
  allowed: boolean;
}

const SystemManage: React.FC = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [fileTypes, setFileTypes] = useState<FileType[]>([]);
  const [defaultPages, setDefaultPages] = useState(20);

  // Fetch danh sách máy in
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/printers");
        setPrinters(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách máy in:", error);
      }
    };
    fetchPrinters();
  }, []);

  // Fetch danh sách kiểu tệp
  useEffect(() => {
    const fetchFileTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/file-types"
        );
        setFileTypes(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách kiểu tệp:", error);
      }
    };
    fetchFileTypes();
  }, []);

  // Thêm máy in mới
  const addPrinter = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/printers", {
        name: "New Printer",
        location: "Default Location",
      });
      setPrinters((prevPrinters) => [...prevPrinters, response.data]);
    } catch (error) {
      console.error("Lỗi khi thêm máy in:", error);
    }
  };

  // Xóa máy in
  const deletePrinter = async (printerId: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/printers/${printerId}`);
      setPrinters((prevPrinters) =>
        prevPrinters.filter((printer) => printer.id !== printerId)
      );
    } catch (error) {
      console.error("Lỗi khi xóa máy in:", error);
    }
  };

  // Cập nhật số trang in mặc định
  const updateDefaultPages = async () => {
    try {
      await axios.put("http://localhost:8080/api/settings/default-pages", {
        pages: defaultPages,
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật số trang mặc định:", error);
    }
  };

  return (
    <div className="system-manage">
      <header className="system-header">
        <div className="logo">
          <Image src={Images} alt="Logo" width={80} height={80} />
          <span>HCMUT-SSPS</span>
        </div>
        <nav className="system-navbar">
          <a href="/admin_homepage">Trang chủ</a>
          <a href="/user_manage">Quản lý người dùng</a>
          <a href="/system_manage">Quản lý hệ thống</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>
      <main className="system-main text-black">
        {/* Quản lý máy in */}
        <section className="printer-management">
          <h2>Quản lý máy in</h2>
          {printers.length > 0 ? (
            <table className="printer-table">
              <thead>
                <tr>
                  <th>ID máy in</th>
                  <th>Tên máy in</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái hoạt động</th>
                  <th>Số lượng trang in</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {printers.map((printer) => (
                  <tr key={printer.id}>
                    <td>{printer.id}</td>
                    <td>{printer.name}</td>
                    <td>{printer.location}</td>
                    <td
                      className={
                        printer.status === "active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {printer.status === "active"
                        ? "Đang hoạt động"
                        : "Ngưng hoạt động"}
                    </td>
                    <td>{printer.pagesPrinted}</td>
                    <td>
                      <button onClick={() => deletePrinter(printer.id)}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có máy in nào trong danh sách.</p>
          )}
          <div className="printer-actions">
            <button onClick={addPrinter}>Thêm máy in</button>
          </div>
        </section>

        {/* Quản lý tệp */}
        <section className="file-management">
          <h2>Quản lý tệp</h2>
          {fileTypes.length > 0 ? (
            <table className="file-table">
              <thead>
                <tr>
                  <th>Loại tệp</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {fileTypes.map((fileType) => (
                  <tr key={fileType.id}>
                    <td>{fileType.name}</td>
                    <td
                      className={
                        fileType.allowed ? "status-allowed" : "status-denied"
                      }
                    >
                      {fileType.allowed ? "Cho phép" : "Không cho phép"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có kiểu tệp nào trong danh sách.</p>
          )}
        </section>

        {/* Thông tin khác */}
        <section className="other-info">
          <h2>Thông tin khác</h2>
          <div className="info-details">
            <label>
              Số trang giấy in mặc định:
              <input
                type="number"
                value={defaultPages}
                onChange={(e) => setDefaultPages(Number(e.target.value))}
              />
            </label>
            <button onClick={updateDefaultPages}>Cập nhật</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SystemManage;
