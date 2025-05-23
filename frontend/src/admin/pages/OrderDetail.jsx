import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderDetailService from '../../services/orderDetailService'; // import đúng
import '../styles/table.css';

export default function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderDetailService.getOrderDetail(orderId);

      if (response?.data) {
        setOrder(response.data);
        setNewStatus(response.data.TrangThaiDon || '');
      } else {
        setError('Không tìm thấy đơn hàng');
        setOrder(null);
      }
    } catch (err) {
      console.error('Lỗi khi tải chi tiết đơn đặt:', err);
      setError('Lỗi khi tải chi tiết đơn đặt');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

    if (orderId) {
      fetchOrderDetail();
    }
  }, [orderId]);


  const handleStatusChange = () => {
    if (newStatus) {
      setOrder((prevOrder) => ({
        ...prevOrder,
        TrangThaiDon: newStatus
      }));
      setIsEditingStatus(false);
      // TODO: Gọi API cập nhật trạng thái ở đây nếu cần
    }
  };

  if (loading) return <div className="text-center p-6 text-gray-600">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  if (!order) return <div className="text-center p-6 text-gray-600">Không tìm thấy đơn đặt</div>;

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Chi tiết đơn hàng #{order.MaDonDat}
          </h1>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.TrangThaiDon === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                order.TrangThaiDon === 'Hoàn thành' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {order.TrangThaiDon}
            </span>
            <button
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              onClick={() => setIsEditingStatus(!isEditingStatus)}
            >
              Chỉnh sửa trạng thái
            </button>
          </div>
        </div>

        {isEditingStatus && (
          <div className="mb-6">
            <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
              Chọn trạng thái mới:
            </label>
            <select
              id="status"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option value="">-- Chọn trạng thái --</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                onClick={handleStatusChange}
              >
                Lưu
              </button>
              <button
                className="ml-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setIsEditingStatus(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Thông tin đơn hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Mã đơn:</span>
              <span className="text-gray-900">{order.MaDonDat}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Ngày chăm sóc:</span>
              <span className="text-gray-900">{new Date(order.NgayChamSoc).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Giờ bắt đầu:</span>
              <span className="text-gray-900">{order.GioBatDau}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Thông tin khách hàng</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Địa chỉ:</span>
              <span className="text-gray-900">{order.DiaChi}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Thông tin dịch vụ</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Dịch vụ:</span>
              <span className="text-gray-900">{order.TenDV}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Yêu cầu đặc biệt:</span>
              <span className="text-gray-900">{order.YeuCauDacBiet}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            onClick={() => navigate('/pages/orders')}
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    </div>
  );
}
