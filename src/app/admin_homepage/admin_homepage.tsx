import React from "react";
import "./admin_homepage.css";

const AdminHomepage: React.FC = () => {
  return (
    <div className="admin-homepage">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
          <img src="./logo.png" alt="logo" />
          <span>HCMUT-SPSS</span>
        </div>
        <nav className="admin-navbar">
          <a href="/home">Trang chủ</a>
          <a href="/user-management">Quản lý người dùng</a>
          <a href="/system-management">Quản lý hệ thống</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <h1>QUẢN TRỊ VIÊN HỆ THỐNG HCMUT-SPSS</h1>
        <div className="admin-image">
          <img src="./image.png" alt="HCMUT" />
        </div>
      </main>

      {/* Footer */}
      <footer className="admin-footer">Copyright (C) 2024</footer>
    </div>
  );
};

export default AdminHomepage;
