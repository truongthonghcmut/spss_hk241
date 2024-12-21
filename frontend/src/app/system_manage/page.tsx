"use client";
import React, { useState, useEffect } from "react";
import "./system_manage.css";
import Image from "next/image";
import axios from "axios";
import Images from "../../../public/assets/Images/logo.png";

interface Printer {
  _id: string;
  brand: string;
  cs: string;
  location: string;
  status: "active" | "inactive";
}

interface FileType {
  _id: string;
  name: string;
  link: string;
  linkPath: string;
  accountId: string;
  pages: number;
  createdAt: string;
  updatedAt: string;
}

const SystemManage: React.FC = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [fileTypes, setFileTypes] = useState<FileType[]>([]);
  const [defaultPages, setDefaultPages] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [printerData, setPrinterData] = useState({
    cs: "1",
    brand: "",
    description: "",
    location: "",
    status: "active",
    type: "A4",
    deleted: "false",
    model: "",
    price: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPrinterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPrinter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/manager/api/printer/create",
        printerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchPrinters();
      setIsModalOpen(false);
      setPrinterData({
        cs: "1",
        brand: "",
        description: "",
        location: "",
        status: "active",
        type: "A4",
        deleted: "false",
        model: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding printer:", error);
    }
  };

  const fetchPrinters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/manager/api/printer/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrinters(response.data.printer);
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/manager/api/file",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFileTypes(response.data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  const deletePrinter = async (printerId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8080/manager/api/printer/delete/${printerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrinters((prevPrinters) =>
        prevPrinters.filter((printer) => printer._id !== printerId)
      );
    } catch (error) {
      console.error("Error deleting printer:", error);
    }
  };

  const updateDefaultPages = async () => {
    try {
      await axios.put("http://localhost:8080/api/settings/default-pages", {
        pages: defaultPages,
      });
      alert("Cập nhật thành công!");
    } catch (error) {
      console.error("Error updating default pages:", error);
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
        <section className="printer-management">
          <h2>Quản lý máy in</h2>
          {printers.length > 0 ? (
            <table className="printer-table">
              <thead>
                <tr>
                  <th>ID máy in</th>
                  <th>Tên máy in</th>
                  <th>Cơ sở</th>
                  <th>Tòa</th>
                  <th>Trạng thái hoạt động</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {printers.map((printer) => (
                  <tr key={printer._id}>
                    <td>{printer._id}</td>
                    <td>{printer.brand}</td>
                    <td>{printer.cs}</td>
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
                    <td>
                      <button
                        onClick={() => {
                          setSelectedPrinter(printer);
                          setIsConfirmModalOpen(true);
                        }}
                      >
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
            <button onClick={() => setIsModalOpen(true)}>Thêm máy in</button>
            {isModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <form onSubmit={addPrinter}>
                    <div>
                      <label>Tên máy in:</label>
                      <input
                        type="text"
                        name="brand"
                        value={printerData.brand}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Dòng máy:</label>
                      <input
                        type="text"
                        name="model"
                        value={printerData.model}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label>Cơ sở:</label>
                      <select
                        name="cs"
                        value={printerData.cs}
                        onChange={handleInputChange}
                      >
                        <option value="1">Cơ sở 1</option>
                        <option value="2">Cơ sở 2</option>
                      </select>
                    </div>
                    <div>
                      <label>Tòa:</label>
                      <input
                        type="text"
                        name="location"
                        value={printerData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Mô tả:</label>
                      <input
                        type="text"
                        name="description"
                        value={printerData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label>Loại giấy:</label>
                      <input
                        type="text"
                        name="type"
                        value={printerData.type}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Giá:</label>
                      <input
                        type="number"
                        name="price"
                        value={printerData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label>Trạng thái:</label>
                      <select
                        name="status"
                        value={printerData.status}
                        onChange={handleInputChange}
                      >
                        <option value="active">Đang hoạt động</option>
                        <option value="inactive">Ngưng hoạt động</option>
                      </select>
                    </div>
                    <button type="submit">Thêm máy in</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>
                      Hủy
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="file-management">
          <h2>Quản lý tệp</h2>
          {fileTypes.length > 0 ? (
            <div className="table-container">
              <table className="file-table">
                <thead>
                  <tr>
                    <th>Tên tài liệu</th>
                    <th>Liên kết</th>
                    <th>Số trang</th>
                    <th>ID tài khoản</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {fileTypes.map((fileType) => (
                    <tr key={fileType._id || fileType.name}>
                      <td>{fileType.name}</td>
                      <td>
                        <a
                          href={fileType.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="file-link"
                          style={{ color: "blue", textDecoration: "none" }}
                        >
                          Đường dẫn
                        </a>
                      </td>
                      <td>{fileType.pages}</td>
                      <td>{fileType.accountId}</td>
                      <td>{new Date(fileType.createdAt).toLocaleString()}</td>
                      <td>{new Date(fileType.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Không có kiểu tệp nào trong danh sách.</p>
          )}
        </section>
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
      {isConfirmModalOpen && selectedPrinter && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Xác nhận xóa</h3>
            <p>
              Bạn có chắc chắn muốn xóa máy in{" "}
              <strong>{selectedPrinter.brand}</strong> tại cơ sở{" "}
              <strong>{selectedPrinter.cs}</strong> không?
            </p>
            <div className="modal-actions">
              <button
                onClick={() => {
                  deletePrinter(selectedPrinter._id);
                  setIsConfirmModalOpen(false);
                }}
              >
                Xóa
              </button>
              <button onClick={() => setIsConfirmModalOpen(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemManage;
