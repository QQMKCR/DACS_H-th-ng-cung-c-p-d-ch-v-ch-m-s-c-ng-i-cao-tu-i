import React from 'react';
import '../../admin/styles/table.css'; // Đường dẫn đến file CSS cho bảng

const Notification = () => {
  // Dữ liệu mẫu cho thông báo
  const notificationData = [
    {
      notificationId: 'TB001',
      date: '2025-05-20T08:00:00',
      content: 'Nhắc nhở: Họp đội nhóm lúc 14:00 ngày 21/05',
    },
    {
      notificationId: 'TB002',
      date: '2025-05-19T09:15:00',
      content: 'Cập nhật quy trình chăm sóc khách hàng mới',
    },
    {
      notificationId: 'TB003',
      date: '2025-05-18T10:30:00',
      content: 'Thông báo nghỉ lễ ngày 30/05',
    },
  ];

  // Hàm định dạng ngày giờ
  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="h-full w-full bg-white">
      <h1 className="text-xl font-bold mb-4">Danh sách thông báo</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Mã thông báo</th>
            <th>Thời gian</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {notificationData.map((notification) => (
            <tr key={notification.notificationId}>
              <td>{notification.notificationId}</td>
              <td>{formatDateTime(notification.date)}</td>
              <td>{notification.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notification;
