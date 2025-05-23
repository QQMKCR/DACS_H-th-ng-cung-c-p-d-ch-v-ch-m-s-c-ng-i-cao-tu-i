import { useState } from 'react';

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(null);

  // Dữ liệu mẫu cho lịch tuần (thứ 2 đến thứ 7)
  const lichTuan = {
    "Thứ 2": { ca: "Sáng (8:00 - 12:00)", diaDiem: "Văn phòng A", congViec: ["Hỗ trợ khách hàng", "Gặp đối tác"] },
    "Thứ 3": { ca: "Chiều (13:00 - 17:00)", diaDiem: "Văn phòng B", congViec: ["Đào tạo nhân viên", "Báo cáo tuần"] },
    "Thứ 4": { ca: "Sáng (8:00 - 12:00)", diaDiem: "Văn phòng A", congViec: ["Họp nhóm", "Kiểm tra dữ liệu"] },
    "Thứ 5": { ca: "Chiều (13:00 - 17:00)", diaDiem: "Văn phòng B", congViec: ["Hỗ trợ sự kiện", "Phản hồi khách"] },
    "Thứ 6": { ca: "Sáng (8:00 - 12:00)", diaDiem: "Văn phòng A", congViec: ["Lập kế hoạch", "Gọi khách hàng"] },
    "Thứ 7": { ca: "Chiều (13:00 - 17:00)", diaDiem: "Văn phòng B", congViec: ["Kiểm tra cuối tuần", "Báo cáo"] },
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 bg-gradient-to-r from-green-200 to-white p-2 rounded-t-lg shadow-md">
        Lịch làm việc
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.keys(lichTuan).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day === selectedDay ? null : day)}
              className={`p-4 rounded-lg border ${selectedDay === day ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'} hover:bg-gray-100 transition-colors duration-200`}
            >
              <h3 className="text-lg font-medium">{day}</h3>
              <p className="text-gray-600">Ca: {lichTuan[day].ca}</p>
              <p className="text-gray-600">Địa điểm: {lichTuan[day].diaDiem}</p>
            </button>
          ))}
        </div>
        {selectedDay && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">Công việc ngày {selectedDay}</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {lichTuan[selectedDay].congViec.map((cv, index) => (
                <li key={index}>{cv}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}