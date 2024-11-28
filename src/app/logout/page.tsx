import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Images from "../../../public/assets/Images/logout.png"

export const metadata: Metadata = {
    title: "Đăng xuất",
    description: "Trang đăng xuất HCMUT_SPSS",
    icons: "/favicon.ico",
}

export default function LogoutPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="max-w-2xl text-center">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">
                    Bạn đã đăng xuất tài khoản thành công.
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    Hẹn gặp lại bạn vào lần đăng nhập sau!
                </p>
                <div className="mb-6">
                    <Image
                        src={Images}
                        alt="Log out"
                        width={500}
                        height={200}
                    />
                </div>
                <div className="mb-6">
                </div>
            </div>
        </div>
    );
}
