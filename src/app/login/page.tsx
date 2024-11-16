"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";
import Images from "../../../public/assets/Images/logo.png";



export default function LoginPage() {
    const router = useRouter();

    const handleLoginRedirect = (path: string) => {
        router.push(path);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-bold">
            <div 
                className="w-full space-y-8"
                style={{
                    maxWidth: '500px',
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '10px',
                    border: '2px solid black',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                <main
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}
                >
                    <Image
                        src={Images}
                        alt="BK TP.HCM Logo"
                        width={400}
                        height={400}
                    />
                    <h2 style={{ color: '#4f76f5', margin: '20px 0', fontSize: 25 }}>
                        Đăng nhập bằng tài khoản của bạn:
                    </h2>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '15px'
                        }}
                    >
                        <button
                            onClick={() => handleLoginRedirect('/login/student')}
                            style={{
                                padding: '12px 25px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #4f76f5',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                width: '220px'
                            }}
                        >
                            <h2 style={{ color: '#000000', margin: '5px 0', fontSize: 19 }}>
                                Tài khoản HCMUT
                            </h2>
                        </button>

                        <button
                            onClick={() => handleLoginRedirect('/login/admin')}
                            style={{
                                padding: '12px 25px',
                                fontSize: '16px',
                                borderRadius: '5px',
                                border: '1px solid #4f76f5',
                                backgroundColor: '#fff',
                                cursor: 'pointer',
                                width: '220px'
                            }}
                        >
                            <h2 style={{ color: '#000000', margin: '5px 0', fontSize: 19 }}>
                                Quản trị viên
                            </h2>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
