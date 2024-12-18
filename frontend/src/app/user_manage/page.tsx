import React from "react";
import "./user_manage.css";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png"

const UserManage: React.FC = () => {
  return (
    <div className="user-manage">
      {/* Header */}
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

      {/* Main Content */}
      <main className="user-main text-black">
        <h2>Quản lý người dùng</h2>
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
              <tr>
                <td>2213342</td>
                <td>Nguyễn Văn A</td>
                <td>A5 - CS1</td>
                <td>22/10/2024</td>
              </tr>
              <tr>
                <td>2210001</td>
                <td>Hà Văn B</td>
                <td>B4 - CS1</td>
                <td>22/10/2024</td>
              </tr>
              <tr>
                <td>2011001</td>
                <td>Nguyễn Thị C</td>
                <td>H3 - CS2</td>
                <td>21/10/2024</td>
              </tr>
              <tr>
                <td>2110111</td>
                <td>Lê Thành D</td>
                <td>H6 - CS2</td>
                <td>21/10/2024</td>
              </tr>
              <tr>
                <td>2252001</td>
                <td>Trần Thị E</td>
                <td>H3 - CS2</td>
                <td>21/10/2024</td>
              </tr>
              <tr>
                <td>1912013</td>
                <td>Nguyễn Trường G</td>
                <td>H6 - CS2</td>
                <td>21/10/2024</td>
              </tr>
              <tr>
                <td>1810024</td>
                <td>Lê Văn H</td>
                <td>B4 - CS1</td>
                <td>19/10/2024</td>
              </tr>
              <tr>
                <td>2213300</td>
                <td>Đoàn Thị K</td>
                <td>A5 - CS1</td>
                <td>19/10/2024</td>
              </tr>
              <tr>
                <td>1911999</td>
                <td>Thái Trần M</td>
                <td>B4 - CS1</td>
                <td>19/10/2024</td>
              </tr>
              <tr>
                <td>2213954</td>
                <td>Lành Minh Q</td>
                <td>H6 - CS2</td>
                <td>19/10/2024</td>
              </tr>
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
