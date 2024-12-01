import React from "react";
import "./system_manage.css";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png"

const SystemManage: React.FC = () => {
  return (
    <div className="system-manage">
      {/* Header */}
      <header className="system-header">
        <div className="logo">
          <Image src={Images} alt="Logo" width={80} height={80} />
          <span>HCMUT-SPSS</span>
        </div>
        <nav className="system-navbar">
          <a href="/admin_homepage">Trang chủ</a>
          <a href="/user_manage">Quản lý người dùng</a>
          <a href="/system_manage">Quản lý hệ thống</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="system-main text-black">
        {/* Máy in Section */}
        <section className="printer-management">
          <h2>Quản lý máy in</h2>
          <table className="printer-table">
            <thead>
              <tr>
                <th>ID máy in</th>
                <th>Tên máy in</th>
                <th>Địa điểm</th>
                <th>Trạng thái hoạt động</th>
                <th>Số lượng trang in</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PR0001</td>
                <td>Canon LBP603W</td>
                <td>A5 - CS1</td>
                <td className="status-active">Đang hoạt động</td>
                <td>165</td>
              </tr>
              <tr>
                <td>PR0002</td>
                <td>HP LaserJet M211d</td>
                <td>B4 - CS1</td>
                <td className="status-active">Đang hoạt động</td>
                <td>110</td>
              </tr>
              <tr>
                <td>PR0003</td>
                <td>LBP2900</td>
                <td>H3 - CS2</td>
                <td className="status-active">Đang hoạt động</td>
                <td>190</td>
              </tr>
              <tr>
                <td>PR0004</td>
                <td>HP 107a (4ZB77A)</td>
                <td>H6 - CS2</td>
                <td className="status-active">Đang hoạt động</td>
                <td>135</td>
              </tr>
            </tbody>
          </table>
          <div className="printer-actions">
            <button>Thêm máy in</button>
            <button>Xóa máy in</button>
            <button>Cập nhật trạng thái</button>
          </div>
        </section>

        {/* Quản lý tệp Section */}
        <section className="file-management">
          <h2>Quản lý tệp</h2>
          <table className="file-table">
            <thead>
              <tr>
                <th>Loại tệp</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>PDF</td>
                <td className="status-allowed">Cho phép</td>
              </tr>
              <tr>
                <td>Word</td>
                <td className="status-allowed">Cho phép</td>
              </tr>
              <tr>
                <td>PNG</td>
                <td className="status-allowed">Cho phép</td>
              </tr>
              <tr>
                <td>PPT</td>
                <td className="status-allowed">Cho phép</td>
              </tr>
            </tbody>
          </table>
          <div className="file-actions">
            <button>Thêm kiểu tệp</button>
            <button>Xóa kiểu tệp</button>
          </div>
        </section>

        {/* Thông tin khác Section */}
        <section className="other-info">
          <h2>Thông tin khác</h2>
          <div className="info-details">
            <label>
              Số trang giấy in mặc định:
              <input type="number" defaultValue={20} />
            </label>
            <button>Cập nhật</button>
          </div>
          <div className="info-reports">
            <label>Nhận báo cáo người dùng:</label>
            <button>Hàng tháng</button>
            <button>Hàng năm</button>
          </div>
          <div className="confirm-changes">
            <button>Xác nhận tất cả thay đổi</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SystemManage;
