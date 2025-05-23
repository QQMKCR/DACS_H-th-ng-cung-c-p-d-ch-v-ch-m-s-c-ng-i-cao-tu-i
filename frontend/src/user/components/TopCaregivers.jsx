// src/components/TopCaregivers.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import hình ảnh từ assets/
import doc1 from "../assets/doc1.png";
import doc2 from '../assets/doc2.png';
import doc3 from '../assets/doc3.png';
import doc4 from '../assets/doc4.png';
import doc5 from '../assets/doc5.png';
import doc6 from '../assets/doc6.png';
import doc7 from '../assets/doc7.png';
import doc8 from '../assets/doc8.png';
import doc9 from '../assets/doc9.png';
import doc10 from '../assets/doc10.png';
import doc11 from '../assets/doc11.png';

// Ánh xạ tên file với hình ảnh đã import
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

const TopCaregivers = () => {
  const navigate = useNavigate();
  const [caregivers, setCaregivers] = useState([]); // State để lưu danh sách nhân viên chăm sóc

  // Lấy danh sách nhân viên chăm sóc từ API
  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/client/caregivers');
        if (!response.ok) throw new Error('Failed to fetch caregivers');
        const data = await response.json();
        setCaregivers(data);
      } catch (error) {
        console.error('Error fetching caregivers:', error);
      }
    };

    fetchCaregivers();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-blue-950 md:mx-10">
      <h1 className="text-3xl font-medium">Nhân viên chăm sóc đề xuất</h1>
      <p className="sm:w-full text-center text-lg">Gợi ý trong việc lựa chọn nhân viên chăm sóc cho bạn</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 y-6 px-3 sm:px-0">
        {caregivers.slice(0, 10).map((item, index) => {
          // Lấy tên file từ HinhDaiDien (loại bỏ đường dẫn, chỉ lấy tên file)
          const imageName = item.HinhDaiDien ? item.HinhDaiDien.split('/').pop() : null;
          const imageSrc = imageName && imageMap[imageName] ? imageMap[imageName] : 'https://via.placeholder.com/150';

          return (
            <div
              onClick={() => navigate(`/caregivers/${item.MaNV}`)} // Sửa để dùng MaNV thay vì HoVaTenLot
              className="border border-blue-950 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img
                className="bg-white w-full h-48 object-cover"
                src={imageSrc} // Sử dụng imageSrc từ imageMap
                alt={`${item.HoVaTenLot} ${item.Ten}`}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Đặt ngay</p>
                </div>
                <p className="text-blue-950 text-lg font-medium">{`${item.HoVaTenLot} ${item.Ten}`}</p>
                <p className="text-blue-950 text-sm">
                  Giới tính: {item.GioiTinh === 0 ? 'Nữ' : 'Nam'}
                </p>
                <p className="text-blue-950 text-sm">Nghề nghiệp: {item.NgheNghiep}</p>
                <p className="text-blue-950 text-sm">Kinh nghiệm: {item.KinhNghiem}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          navigate(`/caregivers`);
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-blue-950 px-10 py-3 rounded-full mt-10"
      >
        Xem thêm
      </button>
    </div>
  );
};

export default TopCaregivers;