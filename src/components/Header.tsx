"use client"
import Link from 'next/link';
import Image from "next/image";
import React from "react";
import Images from "../../public/assets/Images/logo.png";

export default function Header() {
  return (
    <header 
      style={{ 
        padding: '10px 20px', 
        backgroundColor: '#4f76f5', 
        color: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <Image
            src={Images}
            width={80}
            height={80}
            alt="Logo"
          />
          <h1 style={{ marginLeft: '10px', fontSize: '20px', fontWeight: 'bold' }}>
            HCMUT_SSPS
          </h1>
        </Link>
      </div>

      <div>
        <Link 
          href="/login"
          style={{
            color: '#fff',
            backgroundColor: '#4f76f5',
            padding: '8px 16px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Đăng nhập
        </Link>
      </div>
    </header>
  );
}
