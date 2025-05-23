import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CaregiverDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const serviceId = queryParams.get('serviceId');
  const [caregiver, setCaregiver] = useState(null);
  const [service, setService] = useState(null);
  const [suggestedCaregivers, setSuggestedCaregivers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    // Lấy thông tin dịch vụ
    const fetchService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/services/${serviceId}`);
        if (!response.ok) throw new Error('Không thể lấy thông tin dịch vụ');
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Lỗi khi lấy dịch vụ:', error);
      }
    };

    // Lấy thông tin nhân viên chăm sóc
    const fetchCaregiver = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/caregivers/${serviceId}`);
        if (!response.ok) throw new Error('Không thể lấy thông tin nhân viên');
        const data = await response.json();
        setCaregiver(data);
      } catch (error) {
        console.error('Lỗi khi lấy nhân viên:', error);
      }
    };

    // Lấy danh sách nhân viên đề xuất
    const fetchSuggestedCaregivers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/caregivers?suggested=true`);
        if (!response.ok) throw new Error('Không thể lấy danh sách nhân viên đề xuất');
        const data = await response.json();
        setSuggestedCaregivers(data);
      } catch (error) {
        console.error('Lỗi khi lấy nhân viên đề xuất:', error);
      }
    };

    fetchService();
    fetchCaregiver();
    fetchSuggestedCaregivers();
  }, [serviceId]);

  // Lấy lịch trình khả dụng của nhân viên
  useEffect(() => {
    if (selectedDate && caregiver) {
      const fetchAvailableTimes = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/client/caregivers/${caregiver.MaNV}/schedule?date=${moment(
              selectedDate
            ).format('YYYY-MM-DD')}`
          );
          if (!response.ok) throw new Error('Không thể lấy lịch trình');
          const data = await response.json();
          setAvailableTimes(data); // Giả sử trả về danh sách giờ khả dụng, ví dụ: ["08:00", "09:00", ...]
        } catch (error) {
          console.error('Lỗi khi lấy lịch trình:', error);
        }
      };
      fetchAvailableTimes();
    }
  }, [selectedDate, caregiver]);

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      alert('Vui lòng chọn ngày và giờ bắt đầu.');
      return;
    }
    navigate('/order', {
      state: {
        service,
        caregiver,
        selectedDate,
        selectedTime,
      },
    });
  };

  if (!caregiver || !service) return <div className="p-5 text-center">Đang tải...</div>;

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-950">{caregiver.HoVaTenLot} {caregiver.Ten}</h1>
      <img
        src={caregiver.HinhDaiDien ? `/images/${caregiver.HinhDaiDien}` : 'https://via.placeholder.com/150'}
        alt={caregiver.HoVaTenLot}
        className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
      />
      <p className="mb-2">Kinh nghiệm: {caregiver.KinhNghiem}</p>
      <p className="mb-4">Nghề nghiệp: {caregiver.NgheNghiep}</p>

      {/* Chọn ngày và giờ */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Chọn lịch chăm sóc</h2>
        <div className="mb-4">
          <label className="block mb-1">Ngày chăm sóc</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            className="border p-2 rounded w-full"
          />
        </div>
        {selectedDate && (
          <div>
            <label className="block mb-1">Giờ bắt đầu</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">Chọn giờ</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Nút tiếp theo */}
      <button
        onClick={handleNext}
        className="bg-blue-950 text-white px-6 py-3 rounded-full mb-6"
      >
        Tiếp theo
      </button>

      {/* Nhân viên đề xuất */}
      <h2 className="text-xl font-semibold mb-4">Nhân viên chăm sóc khác</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {suggestedCaregivers.map((cg) => (
          <div key={cg.MaNV} className="border p-4 rounded-lg">
            <img
              src={cg.HinhDaiDien ? `/images/${cg.HinhDaiDien}` : 'https://via.placeholder.com/100'}
              alt={cg.HoVaTenLot}
              className="w-24 h-24 rounded-full mx-auto mb-2"
            />
            <p className="text-center font-medium">{cg.HoVaTenLot} {cg.Ten}</p>
            <p className="text-center text-sm">Kinh nghiệm: {cg.KinhNghiem}</p>
            <button
              onClick={() => navigate(`/caregiversdetail?serviceId=${serviceId}&caregiverId=${cg.MaNV}`)}
              className="bg-blue-950 text-white px-4 py-2 rounded mt-2 w-full"
            >
              Chọn
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/caregivers')}
        className="bg-gray-300 text-black px-4 py-2 rounded mt-6"
      >
        Quay lại
      </button>
    </div>
  );
};

export default CaregiverDetail;