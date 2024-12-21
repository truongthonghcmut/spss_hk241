"use client"
import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import Logo from "../../../../public/assets/Images/logo.png"
import "../student/header.css"

export default function StudentLogin() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(""); // Reset lỗi
        setIsLoading(true);  // Bắt đầu tải

        try {
            const response = await axios.post("http://localhost:8080/api/account/login", {
                email,
                password,
            });
            console.log(response)
            // Xử lý phản hồi nếu đăng nhập thành công
            if (response.data.code === "success") {
                alert("Đăng nhập thành công!");
                // Chuyển hướng hoặc lưu token vào localStorage
                localStorage.setItem("token", response.data.token);
                router.push('/student_homepage')
            }
        } catch (error: any) {
            // Xử lý lỗi từ server
            if (error.response) {
                setErrorMessage(error.response.data.message || "Đăng nhập thất bại!");
            } else {
                setErrorMessage("Lỗi kết nối đến server. Vui lòng thử lại sau!");
            }
        } finally {
            setIsLoading(false); // Dừng tải
        }
    };

    const handleRegister = () => {
        router.push('/login/student/register')
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
                            Nhập thông tin tài khoản của bạn
                        </h3>
                        <form>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="text"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Email"
                                style={{ color: "#000" }}
                                value={email} // Gắn giá trị email
                                onChange={(e) => setEmail(e.target.value)} // Cập nhật email
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Mật khẩu"
                                style={{ color: "#000" }}
                                value={password} // Gắn giá trị password
                                onChange={(e) => setPassword(e.target.value)} // Cập nhật password
                            />
                            <div className="flex justify-between items-center mb-4">
                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="reset"
                                    className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
                                >
                                    Xóa
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                    onClick={handleLogin}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="flex justify-between items-center mb-4 mt-3">
                                <a
                                    
                                    className="text-sm text-blue-600 hover:underline"
                                    onClick={handleRegister}
                                >
                                    Tạo tài khoản
                                </a>
                            </div>
                        </form>
                    </div>

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
