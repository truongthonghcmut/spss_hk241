"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user_manage.css";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  ms?: string;
}

const UserManage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        console.log(token);

        const response = await axios.get(
          "http://localhost:8080/manager/api/accountAllStudent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUsers(response.data.accounts);
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

  const handleViewMore = (user: User) => {
    setSelectedUser(user);
  };

  const closeDetails = () => {
    setSelectedUser(null);
  };

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
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleViewMore(user)}>
                      Xem thêm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedUser && (
          <div className="user-details">
            <h3>Thông tin chi tiết</h3>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Họ và tên:</strong>
                  </td>
                  <td>{selectedUser.name}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Email:</strong>
                  </td>
                  <td>{selectedUser.email}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Số điện thoại:</strong>
                  </td>
                  <td>{selectedUser.phone}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Vai trò:</strong>
                  </td>
                  <td>{selectedUser.role}</td>
                </tr>
                {selectedUser.ms && (
                  <tr>
                    <td>
                      <strong>MS:</strong>
                    </td>
                    <td>{selectedUser.ms}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <button onClick={closeDetails}>Đóng</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManage;
