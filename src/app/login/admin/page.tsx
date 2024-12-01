import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trang đăng nhập cho quản trị viên",
    description: "Trang đăng nhập HCMUT_SPSS cho sinh viên",
    icons: "/favicon.ico",
}


export default function AdminLogin() {

    
    return (
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
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                className="block w-full p-2 mb-4 border border-gray-300 rounded text-black"
                                placeholder="Mật khẩu"
                                style={{ color: "#000" }}
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
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-blue-700 mb-4">Lưu ý</h3>
                        <p className="text-sm text-gray-700 mb-4">
                        Đây là trang đăng nhập tài khoản dành riêng cho quản trị viên hệ thống, sinh viên vui lòng không đăng nhập vào đây.
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
    );
}
