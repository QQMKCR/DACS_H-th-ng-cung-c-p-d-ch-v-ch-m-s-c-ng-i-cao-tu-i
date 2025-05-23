import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/table.css';

const BillingEmployee = () => {
  const navigate = useNavigate();

  // Dữ liệu mẫu cho thanh toán nhân viên
  const billingData = [
    {
      paymentId: 'PAY001',
      employeeId: 'EMP001',
      invoiceId: 'INV001',
      paymentTime: '2025-05-11T14:30:00',
      systemFeePercentage: 5,
      netAmount: 9500000,
      transferNote: 'Thanh toán lương tháng 5/2025',
    },
    {
      paymentId: 'PAY002',
      employeeId: 'EMP002',
      invoiceId: 'INV002',
      paymentTime: '2025-05-11T15:00:00',
      systemFeePercentage: 7,
      netAmount: 8600000,
      transferNote: 'Thanh toán phụ cấp tháng 5/2025',
    },
    {
      paymentId: 'PAY003',
      employeeId: 'EMP003',
      invoiceId: 'INV003',
      paymentTime: '2025-05-11T16:45:00',
      systemFeePercentage: 3,
      netAmount: 12000000,
      transferNote: 'Thanh toán thưởng dự án Q2/2025',
    },
  ];

  // Hàm định dạng tiền tệ (VND)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  // Hàm định dạng thời gian
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

  // Hàm xử lý click vào mã nhân viên
  const handleEmployeeClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  // Hàm xử lý click vào mã hóa đơn
  const handleInvoiceClick = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  return (
    <div className="h-full w-full bg-white">
      <h1 className="text-xl font-bold mb-4">Danh sách thanh toán nhân viên</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Mã thanh toán</th>
            <th>Mã tài khoản nhân viên</th>
            <th>Mã hóa đơn</th>
            <th>Thời gian thanh toán</th>
            <th>Phần trăm chi phí hệ thống</th>
            <th>Số tiền thực nhận</th>
            <th>Nội dung chuyển</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((billing) => (
            <tr key={billing.paymentId}>
              <td>{billing.paymentId}</td>
              <td>
                <span
                  onClick={() => handleEmployeeClick(billing.employeeId)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {billing.employeeId}
                </span>
              </td>
              <td>
                <span
                  onClick={() => handleInvoiceClick(billing.invoiceId)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {billing.invoiceId}
                </span>
              </td>
              <td>{formatDateTime(billing.paymentTime)}</td>
              <td>{billing.systemFeePercentage}%</td>
              <td>{formatCurrency(billing.netAmount)}</td>
              <td>{billing.transferNote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingEmployee;