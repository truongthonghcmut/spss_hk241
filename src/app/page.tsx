import Image from "next/image";
import React from "react"
import { Metadata } from "next";
import Images from "../../public/assets/Images/background.png"
import Logo from "../../public/assets/Images/logo.png"
import "../app/header.css"


export const metadata: Metadata = {
    title: "HCMUT_SSPS",
    description: "Trang chủ ứng dụng in ấn dành cho sinh viên",
    icons: "/favicon.ico",
}


export default function Home() {
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
      <main className="relative h-screen w-screen overflow-hidden">
        <Image
          src={Images}
          alt="Background"
          layout="fill"           
          objectFit="cover"       
          objectPosition="center" 
          priority              
        />
        <div className="relative z-10 flex flex-col items-center justify-start h-full pt-10">
          <h1 className="text-blue-600 text-4xl font-bold mt-4">HỆ THỐNG DỊCH VỤ IN THÔNG MINH DÀNH CHO SINH VIÊN (HCMUT - SPSS)</h1>
        </div>
      </main>
    </>
  );
}