import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import evaluationService from '../../services/evaluationService'; // <-- đúng cú pháp
import '../styles/table.css';

export default function Evaluations() {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await evaluationService.getEvaluations(); // <-- gọi từ evaluationService
        setEvaluations(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đánh giá:', error);
      }
    };
    fetchEvaluations();
  }, []);

  const handleViewDetails = (orderId) => {
    navigate(`/pages/evaluation/${orderId}`);
  };

  const handleOrderClick = (MaDonDat) => {
    navigate(`/pages/order/${MaDonDat}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Đánh Giá</h1>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã đánh giá</th>
                <th>Mã đơn</th>
                <th>Số Sao</th>
                <th>Nội dung</th>
                <th>Ngày đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.MaDanhGia}>
                  <td>{evaluation.MaDanhGia}</td>
                  <td>
                    <span
                        onClick={() => handleOrderClick(evaluation.MaDonDat)}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {evaluation.MaDonDat}
                      </span>
                  </td>
                  <td>{evaluation.SoSao} <span style={{ color: 'gold' }}>★</span></td>
                  <td>{evaluation.NoiDung}</td>
                  <td>{new Date(evaluation.NgayDanhGia).toLocaleDateString()}</td>
                  <td className="action-cell">
                    <button
                      className="btn-action btn-view"
                      onClick={() => handleViewDetails(evaluation.MaDonDat)}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
