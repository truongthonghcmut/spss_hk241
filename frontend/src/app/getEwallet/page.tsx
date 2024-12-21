"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../../../public/assets/Images/logo.png";
import "../printDocument/header.css";

export default function GetEwallet() {

  const [accountId, setAccountId] = useState<string>("");
  const [orderAmount, setOrderAmount] = useState<number>(10000); // Số tiền mặc định
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [balance, setMoney] = useState<number>(0);
  // const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAccountId(response.data.ewallet.accountId);
          setMoney(response.data.ewallet.balance)
        }).catch((error) =>
          console.error("Error fetching customer balance:", error)
        );
    }
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    if (amount >= 10000) {
      setOrderAmount(amount);
    } else {
      alert("Số tiền phải lớn hơn hoặc bằng 10,000 VND.");
    }
  };

  const handleTransaction = () => {
    // setErrorMessage(""); // Reset lỗi
    // setIsLoading(true);  // Bắt đầu tải
    
    const token = localStorage.getItem("token");
    axios.patch("https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet/change", {
      type: "add",
      amount: orderAmount,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        console.log("response: ", response);
        window.location.href = response.request.responseURL;
      }
    }).catch((error) => {
      console.error("Error adding money to e-wallet:", error);
    });
  }

  const handlePurchaseRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Image src={Logo} alt="Logo" width={80} height={80} />
          <span>HCMUT-SSPS</span>
        </div>
        <nav className="navbar">
          <a href="/student_homepage">Trang chủ</a>
          <a href="/printDocument">In tài liệu</a>
          <a href="/studentInfo">Hồ sơ cá nhân</a>
          <a href="/logout">Đăng xuất</a>
        </nav>
      </header>

      <div className="min-h-screen flex flex-col items-center bg-gray-50 py-10">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md border border-gray-300">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            CỔNG NẠP TIỀN
          </h1>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
            <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
              <h3 className="text-lg font-bold text-red-700 mb-4">Thông tin nạp tiền</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã tài khoản
                </label>
                <input
                  type="text"
                  readOnly
                  value={accountId}
                  className="block w-full p-2 border rounded bg-gray-200 text-black"
                />
              </div>
              <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số dư tài khoản (VND)
                </label>
                <input
                  type="text"
                  readOnly
                  value={balance}
                  className="block w-full p-2 border rounded bg-gray-200 text-black"
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tiền cần nạp (VND)
                </label>
                <input
                  type="number"
                  value={orderAmount}
                  onChange={handleAmountChange}
                  className="block w-full p-2 border rounded text-black"
                  min={10000}
                />
              </div>
              <p className="text-sm text-gray-700">
                Số tiền tối thiểu: 10,000 VND
              </p>
            </div>
             
            <div className="mb-4">
              <button onClick={() => handlePurchaseRedirect('/purchasePaper')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={ handleTransaction }
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Xác nhận thanh toán
              </button >
              {/* {errorMessage && (
                <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
              )} */}
            </div>
            {/* Lưu ý */}
            <div>
            <h3 className="text-lg font-bold text-blue-700 mb-4">Một số lưu ý</h3>
            <ul className="list-disc list-inside text-sm text-gray-700 mb-6">
              <li>Giá thành cho giấy A4: 500 VND / tờ</li>
              <li>Giá thành cho giấy A3: 1000 VND / tờ</li>
              <li>Số lượng giấy mua tối thiểu: 5 tờ / lượt</li>
              <li>Số lượng giấy mua tối đa: 100 tờ / lượt</li>
              <li>Số lượng giấy mua phải là bội số của 5 (5, 10, 15,...)</li>
            </ul>

            <h3 className="text-lg font-bold text-blue-700 mb-4">Hỗ trợ khi có sự cố</h3>
            <p className="text-sm text-gray-700 mb-2">
              Nếu trong quá trình thanh toán có xảy ra sự cố giao dịch, hãy thử thanh toán lại hoặc liên hệ qua các kênh hỗ trợ sau:
            </p>
            <p className="text-sm text-blue-600">
              Email: payment_support@hcmut.edu.vn
            </p>
            <p className="text-sm text-gray-700">Hotline: 0987-654-321</p>
          </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}
