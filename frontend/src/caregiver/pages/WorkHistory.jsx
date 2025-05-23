import React from 'react';

const WorkHistory = () => {
  // Dữ liệu cứng cho lịch sử công việc
  const duLieuLichSuCongViec = [
    {
      maHoaDon: "HD001",
      ngay: "2025-04-01",
      congViec: "Chăm sóc khách hàng VIP",
      luong: "2,000,000 VND"
    },
    {
      maHoaDon: "HD002",
      ngay: "2025-04-15",
      congViec: "Hỗ trợ sự kiện",
      luong: "1,500,000 VND"
    },
    {
      maHoaDon: "HD003",
      ngay: "2025-05-01",
      congViec: "Chăm sóc khách hàng tại nhà",
      luong: "1,800,000 VND"
    }
  ];

  // Hàm xử lý khi click vào mã hóa đơn (nếu muốn điều hướng hoặc thao tác khác)
  const handleMaHoaDonClick = (maHoaDon) => {
    // Ví dụ điều hướng, bạn có thể thay đổi theo router của bạn
    alert(`Bạn vừa click vào hóa đơn: ${maHoaDon}`);
    // Hoặc dùng navigate nếu bạn dùng react-router
    // navigate(`/invoice/${maHoaDon}`);
  };

  return (
    <div className="h-full w-full bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Lịch sử công việc</h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Mã hóa đơn</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ngày</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Công việc</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Lương</th>
          </tr>
        </thead>
        <tbody>
          {duLieuLichSuCongViec.map((item) => (
            <tr key={item.maHoaDon} className="hover:bg-gray-50 cursor-pointer">
              <td
                className="border border-gray-300 px-4 py-2 text-blue-600 hover:underline"
                onClick={() => handleMaHoaDonClick(item.maHoaDon)}
              >
                {item.maHoaDon}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.ngay}</td>
              <td className="border border-gray-300 px-4 py-2">{item.congViec}</td>
              <td className="border border-gray-300 px-4 py-2">{item.luong}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkHistory;
