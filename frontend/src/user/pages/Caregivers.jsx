import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '/src/context/AppContext.jsx';

// Import hình ảnh
import doc1 from "/src/assets/doc1.png";
import doc2 from "/src/assets/doc2.png";
import doc3 from "/src/assets/doc3.png";
import doc4 from "/src/assets/doc4.png";
import doc5 from "/src/assets/doc5.png";
import doc6 from "/src/assets/doc6.png";
import doc7 from "/src/assets/doc7.png";
import doc8 from "/src/assets/doc8.png";
import doc9 from "/src/assets/doc9.png";
import doc10 from "/src/assets/doc10.png";
import doc11 from "/src/assets/doc11.png";

const Caregivers = () => {
  const { serviceType } = useParams();
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Lấy danh sách dịch vụ từ API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/client/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        if (!data) throw new Error('No data returned');
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Lấy danh sách nhân viên chăm sóc từ API
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        let url = 'http://localhost:5000/api/client/caregivers';
        if (serviceType) {
          url += `?serviceType=${serviceType}`;
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch caregivers');
        const data = await response.json();
        if (!data) throw new Error('No data returned');
        setFilteredCaregivers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching caregivers:', error);
        setLoading(false);
      }
    };

    fetchCaregivers();
  }, [serviceType]);

  // Ánh xạ hình ảnh
  const imageMap = {
    'doc1.png': doc1,
    'doc2.png': doc2,
    'doc3.png': doc3,
    'doc4.png': doc4,
    'doc5.png': doc5,
    'doc6.png': doc6,
    'doc7.png': doc7,
    'doc8.png': doc8,
    'doc9.png': doc9,
    'doc10.png': doc10,
    'doc11.png': doc11,
  };

  if (loading) {
    return <div className="text-center py-10">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium text-blue-950 mb-2">Nhân viên chăm sóc</h1>
      <p className="text-blue-950 mb-6">Tìm kiếm nhân viên thông qua dịch vụ</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar lọc dịch vụ */}
        <div className="lg:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-950 mb-4">Danh mục dịch vụ</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/caregivers')}
                  className={`w-full text-left px-4 py-2 rounded transition-all ${!serviceType ? 'bg-indigo-100 text-indigo-950' : 'hover:bg-gray-100'}`}
                >
                  Tất cả nhân viên
                </button>
              </li>
              {services.map((service) => (
                <li key={service.MaDV}>
                  <button
                    onClick={() => navigate(`/caregivers/${service.MaDV}`)}
                    className={`w-full text-left px-4 py-2 rounded transition-all ${serviceType && serviceType === service.MaDV.toString() ? 'bg-indigo-100 text-indigo-950' : 'hover:bg-gray-100'}`}
                  >
                    {service.TenDV}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Danh sách nhân viên */}
        <div className="lg:w-3/4">
          {filteredCaregivers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-blue-950">Không tìm thấy nhân viên phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaregivers.map((caregiver) => {
                const imageName = caregiver.HinhDaiDien ? caregiver.HinhDaiDien.split('/').pop() : null;
                const imageSrc = imageName && imageMap[imageName] ? imageMap[imageName] : 'https://via.placeholder.com/150';

                return (
                  <div
                    key={caregiver.MaNV}
                    onClick={() => navigate(`/caregivers/detail/${caregiver.MaNV}`)}
                    className="border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                  >
                    <img
                      className="w-full h-48 object-cover"
                      src={imageSrc}
                      alt={`${caregiver.HoVaTenLot} ${caregiver.Ten}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Đặt ngay</span>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-950">{`${caregiver.HoVaTenLot} ${caregiver.Ten}`}</h3>
                      <p className="text-blue-950 text-sm mt-1">Giới tính: {caregiver.GioiTinh === 0 ? 'Nữ' : 'Nam'}</p>
                      <p className="text-blue-950 text-sm">Nghề nghiệp: {caregiver.NgheNghiep}</p>
                      <p className="text-blue-950 text-sm">Kinh nghiệm: {caregiver.KinhNghiem}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Caregivers;