import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../../services/orderService'; // <-- đúng cú pháp
import '../styles/table.css';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders(); // <-- gọi từ orderService
        setOrders(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn đặt:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    navigate(`/pages/order/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Đơn Đặt Dịch Vụ</h1>
      </div>
      <div className="table-container">
        <table className="data-table">
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Mã tài khoản người dùng</th>
            <th>Mã tài khoản nhân viên</th>
            <th>Ngày đặt</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.MaDonDat}>
              <td>{order.MaDonDat}</td>
              <td>{order.MaTKND}</td>
              <td>{order.MaTKNV}</td>
              <td>{new Date(order.NgayDatDon).toLocaleDateString()}</td>
              <td className="action-cell">
                <button
                  className="btn-action btn-view"
                  onClick={() => handleViewDetails(order.MaDonDat)}
                >
                  Chi tiết
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}
