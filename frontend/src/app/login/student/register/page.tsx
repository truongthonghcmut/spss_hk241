"use client"
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Logo from "../../../../../public/assets/Images/logo.png"
import "../register/header.css"

export default function StudentRegister() {
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        otp: "",
        name: "",
        email: "",
        password: "",
        phone: "",
    });


    // Kiểm tra email hợp lệ
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email
        return regex.test(email);
    };


    // Kiểm tra mật khẩu mạnh
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9]{10,15}$/; // Số điện thoại từ 10 đến 15 chữ số
        return regex.test(phone);
    };

    const handleRegister = (e) => {
        e.preventDefault(); // Ngăn form submit mặc định

        if (!formData.name) {
            setError("Tên không được để trống!");
            return;
        }

        // Kiểm tra email hợp lệ
        if (!formData.email) {
            setError("Email không được để trống!");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Email không hợp lệ!");
            return;
        }

        if (!formData.phone || !validatePhone(formData.phone)) {
            setError("Số điện thoại không hợp lệ!");
            return;
        }

        // Kiểm tra mật khẩu giống nhau
        if (formData.password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        // Kiểm tra độ mạnh của mật khẩu
        if (!validatePassword(formData.password)) {
            setError(
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
            );
            return;
        }

        // Nếu hợp lệ, xử lý đăng ký
        setError("");
        handleVerifyOtp(e);
    };

    const handleVerifyOtp = async (e) => {
        try {
            const msg = {
                email: formData.email,
            }
    
            // Perform the GET request with async/await
            await axios.post(
                'http://localhost:8080/api/account/otp',
                msg,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIsOtpModalOpen(true);

        } catch (error) {
            console.error("Lỗi khi gửi OTP:", error);
        }
    };


    // Function to handle form submission
    const handleSubmitForm = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submission
        console.log('form data: ', formData);
        
        try {
            const response = await axios.post(
                'http://localhost:8080/api/account/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            // Handle the response content here
            console.log('Response Data:', response.data);

            if (response.data.code == "error") { // OTP mẫu
                alert("OTP không chính xác!");
            } else {
                alert("Xác thực thành công!");
                setFormData({
                    otp: "",
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                setIsOtpModalOpen(false);
            }
        } catch (error) {
            console.error("Error adding printer:", error);
        }
    };

    return (
        <>
        <header className="header">
        <div className="logo">
        <Image src={Logo} alt="Logo" width={80} height={80} />
          <span>HCMUT-SSPS</span>
        </div>
        <nav className="navbar">
          <a href="/login">Đăng nhập</a>
        </nav>
      </header>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md border border-gray-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-blue-700">
                        DỊCH VỤ XÁC THỰC TẬP TRUNG
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <h3 className="text-lg font-bold text-red-700 mb-4">
                            Tạo tài khoản mới
                        </h3>
                        <form>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tên
                            </label>
                            <input
                                type="text"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Tên"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <input
                                type="text"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="password"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Nhập lại mật khẩu"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {error && (
                                <p className="text-red-500 text-sm mb-4">{error}</p>
                            )}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    onClick={handleRegister}
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>
            {/* Modal OTP */}
            {isOtpModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold text-blue-700 mb-4">Xác minh OTP</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Vui lòng nhập mã OTP được gửi đến email của bạn.
                        </p>
                        <input
                            type="text"
                            className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                            placeholder="Nhập OTP"
                            value={formData.otp}
                            onChange={(e) => 
                                setFormData({
                                    ...formData,
                                    otp: e.target.value,
                                })
                            }
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
                                onClick={() => setIsOtpModalOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                onClick={handleSubmitForm}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
                    
                    <div>
                        <h3 className="text-lg font-bold text-blue-700 mb-4">Lưu ý</h3>
                        <p className="text-sm text-gray-700 mb-4">
                            Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ
                            thống web ở trường Đại học Bách Khoa TP.HCM. Điều này có nghĩa là
                            bạn chỉ đăng nhập một lần cho những hệ thống web đã đăng ký với hệ
                            thống xác thực quản lý truy cập tập trung.
                        </p>
                        <p className="text-sm text-gray-700 mb-4">
                            Bạn cần dùng tài khoản HCMUT để đăng nhập. Tài khoản HCMUT cho
                            phép truy cập đến nhiều tài nguyên bao gồm hệ thống thông tin, thư
                            điện tử,...
                        </p>
                        <p className="text-sm text-gray-700">
                            Vì lý do an ninh, bạn hãy thoát khỏi trình duyệt Web khi bạn kết
                            thúc việc truy cập các dịch vụ đòi hỏi xác thực!
                        </p>

                        <h3 className="text-lg font-bold text-blue-700 mt-6">
                            Hỗ trợ kỹ thuật
                        </h3>
                        <p className="text-sm text-gray-700">
                            Email: support@hcmut.edu.vn
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
