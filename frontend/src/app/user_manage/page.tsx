"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user_manage.css";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png";

interface User {
  mssv: string;
  name: string;
  location: string;
  date: string;
}

const UserManage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<User[]>(
          "http://localhost:8080/api/users"
        );
        console.log(response);
        setUsers(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data?.message || "Không thể lấy dữ liệu người dùng!"
          );
        } else {
          setError("Đã xảy ra lỗi không xác định!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-manage">
      <header className="user-header">
        <div className="logo">
          <Image src={Images} alt="Logo" width={80} height={80} />
          <span>HCMUT-SSPS</span>
        </div>
        <nav className="user-navbar">
          <a href="/admin_homepage">Trang chủ</a>
          <a href="/user_manage">Quản lý người dùng</a>
          <a href="/system_manage">Quản lý hệ thống</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>

      <main className="user-main text-black">
        <h2>Quản lý người dùng</h2>
        {isLoading && <p>Đang tải dữ liệu...</p>}
        {error && <p className="error">{error}</p>}
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và tên</th>
                <th>Địa điểm in</th>
                <th>Ngày</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.mssv}>
                  <td>{user.mssv}</td>
                  <td>{user.name}</td>
                  <td>{user.location}</td>
                  <td>{user.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="user-actions">
          <button>Xem thêm</button>
          <button>Xác nhận</button>
        </div>
      </main>
    </div>
  );
};

export default UserManage;
