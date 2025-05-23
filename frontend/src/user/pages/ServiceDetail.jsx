import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(!!storedToken);
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/services/${id}`);
        if (!response.ok) throw new Error('Failed to fetch service');
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [id]);

  const formatCurrency = (number) => {
    return Number(number).toLocaleString('vi-VN') + ' VND';
  };

  const handleOrderClick = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/caregiverdetail');
    }
  };

  if (!service) return <div className="p-5 text-center">Đang tải dịch vụ...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      {/* Ảnh dịch vụ */}
      {service.HinhAnh && (
        <img
          src={service.HinhAnh}
          alt={service.TenDV}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Nội dung */}
      <h1 className="text-3xl font-bold text-primary mb-4">{service.TenDV}</h1>
      <p className="text-xl text-blue-950 mb-4">{service.MoTa}</p>
      <p className="text-xl text-blue-950 font-medium mb-2">
        Giá: {formatCurrency(service.Gia)}
      </p>
      <p className="text-xl text-blue-950 font-medium mb-6">
        Thời gian thực hiện: {service.ThoiGianThucHien}
      </p>

      {/* Nút hành động */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleOrderClick}
          className="bg-blue-950 hover:bg-primary text-white px-6 py-3 rounded-full shadow transition duration-300"
        >
          {token ? 'Đặt dịch vụ' : 'Đặt dịch vụ'}
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-950 hover:bg-primary text-white px-6 py-3 rounded-full shadow transition duration-300"
        >
          Quay lại Trang chủ
        </button>
      </div>
    </div>
  );
};

export default ServiceDetail;
