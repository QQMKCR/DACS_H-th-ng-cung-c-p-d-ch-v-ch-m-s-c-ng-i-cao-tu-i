import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import invoiceService from '../../services/invoiceService';
import '../styles/table.css';

const Invoice = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await invoiceService.getInvoices();
        setInvoices(response.data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách hóa đơn:', error);
      }
    };
    fetchInvoices();
  }, []);

  const formatCurrency = (TongTien) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(TongTien);
  };

  const handleOrderClick = (MaDonDat) => {
    navigate(`/pages/order/${MaDonDat}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Hoá Đơn</h1>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã hóa đơn</th>
                <th>Mã đơn</th>
                <th>Ngày lập</th>
                <th>Tổng tiền</th>
                <th>Phương thức thanh toán</th>
                <th>Trạng thái xử lý</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.MaHD}>
                  <td>{invoice.MaHD}</td>
                  <td>
                    <span
                      onClick={() => handleOrderClick(invoice.MaDonDat)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {invoice.MaDonDat}
                    </span>
                  </td>
                  <td>{new Date(invoice.NgayLapHD).toLocaleDateString('vi-VN')}</td>
                  <td>{formatCurrency(invoice.TongTien)}</td>
                  <td>{invoice.PhuongThucThanhToan}</td>
                  <td>{invoice.TrangThaiXuLy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
