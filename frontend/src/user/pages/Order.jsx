import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { service, caregiver, selectedDate, selectedTime } = state || {};
  const [user, setUser] = useState(null);
  const [promotion, setPromotion] = useState(null);
  const [address, setAddress] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  useEffect(() => {
    // Lấy thông tin người dùng
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/client/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Không thể lấy thông tin người dùng');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    // Lấy thông tin khuyến mãi (nếu có)
    const fetchPromotion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/services/${service.MaDV}/promotion`);
        if (response.ok) {
          const data = await response.json();
          setPromotion(data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy khuyến mãi:', error);
      }
    };

    fetchUser();
    if (service) fetchPromotion();
  }, [service]);

  const formatCurrency = (number) => {
    return Number(number).toLocaleString('vi-VN') + ' VND';
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/client/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          MaDV: service.MaDV,
          MaNV: caregiver.MaNV,
          NgayChamSoc: selectedDate,
          GioBatDau: selectedTime,
          DiaChi: address,
          YeuCauDacBiet: specialRequest,
          MaKM: promotion?.MaKM || null,
        }),
      });
      if (!response.ok) throw new Error('Không thể tạo đơn hàng');
      const data = await response.json();
      navigate(`/payment/${data.MaDonDat}`);
    } catch (error) {
      console.error('Lỗi khi xác nhận đơn hàng:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleCancel = () => {
    navigate('/my-order/order');
  };

  if (!service || !caregiver || !user) return <div className="p-5 text-center">Đang tải...</div>;

  const finalPrice = promotion ? promotion.GiaSauKhiGiam : service.Gia;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-blue-950">Xác nhận đơn hàng</h1>

      {/* Thông tin người dùng */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin người dùng</h2>
        <p>Họ và tên: {user.Ho} {user.Ten}</p>
        <p>Email: {user.Email}</p>
        <p>SĐT: {user.SDT}</p>
      </div>

      {/* Thông tin dịch vụ */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin dịch vụ</h2>
        <p>Tên dịch vụ: {service.TenDV}</p>
        <p>Mô tả: {service.MoTa}</p>
        <p>Giá: {formatCurrency(service.Gia)}</p>
        {promotion && (
          <p>
            Khuyến mãi: {promotion.TenKM} ({promotion.PhanTramKM}%) - Giá sau giảm: {formatCurrency(promotion.GiaSauKhiGiam)}
          </p>
        )}
      </div>

      {/* Thông tin nhân viên */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin nhân viên</h2>
        <p>Họ và tên: {caregiver.HoVaTenLot} {caregiver.Ten}</p>
        <p>Kinh nghiệm: {caregiver.KinhNghiem}</p>
      </div>

      {/* Thông tin lịch chăm sóc */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Lịch chăm sóc</h2>
        <p>Ngày: {new Date(selectedDate).toLocaleDateString('vi-VN')}</p>
        <p>Giờ bắt đầu: {selectedTime}</p>
        <div className="mt-2">
          <label className="block mb-1">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Nhập địa chỉ"
          />
        </div>
        <div className="mt-2">
          <label className="block mb-1">Yêu cầu đặc biệt</label>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Nhập yêu cầu đặc biệt (nếu có)"
          />
        </div>
      </div>

      {/* Tổng tiền */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tổng tiền</h2>
        <p className="text-xl font-bold">{formatCurrency(finalPrice)}</p>
      </div>

      {/* Nút hành động */}
      <div className="flex gap-4">
        <button
          onClick={handleConfirm}
          className="bg-blue-950 text-white px-6 py-3 rounded-full"
        >
          Xác nhận
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-black px-6 py-3 rounded-full"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default Order;