"use client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "../../../public/assets/Images/logo.png";
import "../purchasePaper/header.css";

export default function PaperPurchase() {
  const initialState = {
    paperType: "A4",
    balancePaper: 20,
    price: 500, // Giá mặc định cho A4 là 500
  };
  const [paperType, setPaperType] = useState(initialState.paperType);
  const [balancePaper, setQuantity] = useState(initialState.balancePaper);
  const [price, setPrice] = useState(initialState.price);
  const [customerBalance, setCustomerBalance] = useState<number>(0); // Số dư tài khoản
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const totalPrice = balancePaper * price;

  // Lấy thông tin số dư tài khoản
  useState(() => {
    const token = localStorage.getItem("token");
    axios
      .get("https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCustomerBalance(response.data.ewallet.balance))
      .catch((error) =>
        console.error("Error fetching customer balance:", error)
      );
  });

  const handlePaperTypeChange = (type: string) => {
    setPaperType(type);
    setPrice(type === "A4" ? 500 : 1000); // Giá cho từng loại giấy
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = balancePaper + change;
    if (newQuantity >= 5 && newQuantity <= 100 && newQuantity % 5 === 0) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchaseRedirect = (path: string) => {
      router.push(path);
  };

  const handlePayment = () => {
    if (totalPrice > customerBalance) {
      setErrorMessage(
        "Số dư tài khoản không đủ để thực hiện giao dịch. Vui lòng nạp thêm tiền."
      );
      return;
    }
    
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://printingsystem-dev-by-swimteam.onrender.com/api/e-wallet/buy",
        {
          balancePaper,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Cập nhật số dư tài khoản sau khi thanh toán thành công
        alert(
          `Bạn đã mua thành công ${balancePaper} tờ giấy ${paperType} với giá ${totalPrice.toLocaleString()} VND.`
        );
        router.push("/printDocument");
      })
      .catch((error) => {
        console.error("Error purchasing paper:", error);
        setErrorMessage("Có lỗi xảy ra khi thực hiện giao dịch.");
      });
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
          DỊCH VỤ MUA THÊM GIẤY IN
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thông tin mua giấy */}
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
            <h3 className="text-lg font-bold text-red-700 mb-4">Thông tin mua giấy</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Loại giấy in</label>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    paperType === "A4" ? "bg-yellow-300" : "bg-white"
                  } border text-black`}
                  onClick={() => handlePaperTypeChange("A4")}
                >
                  297mm x 210mm A4
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    paperType === "A3" ? "bg-yellow-300" : "bg-white"
                  } border text-black`}
                  onClick={() => handlePaperTypeChange("A3")}
                >
                  420mm x 297mm A3
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng cần mua</label>
              <div className="flex items-center gap-4">
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg text-black"
                  onClick={() => handleQuantityChange(-5)}
                >
                  -
                </button>
                <span className="px-6 py-2 border rounded-lg text-black">{balancePaper}</span>
                <button
                  className="px-3 py-1 bg-gray-300 rounded-lg text-black"
                  onClick={() => handleQuantityChange(5)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tổng tiền</label>
              <input
                type="text"
                readOnly
                value={`${totalPrice.toLocaleString()} VND`}
                className="block w-full p-2 border rounded bg-gray-200 text-black"
              />
            </div>

            <div className="flex gap-4">
              <button onClick={() => handlePurchaseRedirect('/printDocument')}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Xác nhận thanh toán
              </button >
              <button 
               onClick={() => handlePurchaseRedirect('/getEwallet')}
               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                Nạp tiền
              </button>
              {errorMessage && (
                <div className="mt-4 text-sm text-red-600">{errorMessage}</div>
              )}
            </div>
          </div>
          
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-100">
          <h3 className="text-lg font-bold text-red-700 mb-4">Thông tin thanh toán</h3>
          <p className="text-sm text-gray-700 mb-2">
                Số dư tài khoản:{" "}
                <span className="font-bold">
                  {customerBalance.toLocaleString()} VND
                </span>
              </p>
              <p className="text-sm text-gray-700 mb-6">
                Hãy đảm bảo rằng số dư tài khoản đủ để thanh toán.
              </p>

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
    </div>
    </>
  );


}
