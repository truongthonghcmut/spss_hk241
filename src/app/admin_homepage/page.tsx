import React from "react";
import "./admin_homepage.css";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png"

const AdminHomepage: React.FC = () => {
  return (
    <div className="admin-homepage">
      {/* Header */}
      <header className="admin-header">
        <div className="logo">
        <Image src={Images} alt="Logo" width={80} height={80} />
          <span>HCMUT-SPSS</span>
        </div>
        <nav className="admin-navbar">
          <a href="/admin_homepage">Trang chủ</a>
          <a href="/user_manage">Quản lý người dùng</a>
          <a href="/system_manage">Quản lý hệ thống</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="admin-main text-black">
        <h1>QUẢN TRỊ VIÊN HỆ THỐNG HCMUT-SPSS</h1>
        <div className="admin-image flex flex-col items-center justify-center">
        <Image src={Images} alt="Logo" width={600} height={600} />
        </div>
      </main>

    </div>
  );
};

export default AdminHomepage;
