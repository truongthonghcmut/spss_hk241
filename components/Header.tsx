import Link from 'next/link';
import Image from "next/image";
import React from "react"
import Images from "../public/assets/Images/logo.png"

export default function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#4f76f5', color: '#fff'}}>
        <Link href={"/"} className="h-20 flex items-center w-2/5">
            <Image
                src={Images}
                width={100}
                height={100}
                className=""
                alt="Logo"
            />
            <h1 className="text-2xl font-bold ml-4 text-white">HCMUT_SPSS</h1>
        </Link>
        
    </header>
  );
}