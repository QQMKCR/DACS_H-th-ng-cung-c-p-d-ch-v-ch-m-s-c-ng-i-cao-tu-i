import React, { useState, useEffect } from 'react';
import promotionService from '../../services/promotionService';
import '../styles/table.css';

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    MaKM: '',
    TenKM: '',
    MoTa: '',
    PhanTramKM: '',
    NgayBatDau: '',
    NgayKetThuc: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    promotionService
      .getAllPromotions()
      .then((res) => setPromotions(res.data))
      .catch((err) => console.error('Lỗi khi tải khuyến mãi:', err));
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('vi-VN');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setFormData({
      MaKM: '',
      TenKM: '',
      MoTa: '',
      PhanTramKM: '',
      NgayBatDau: '',
      NgayKetThuc: '',
    });
    setIsEditMode(false);
    setShowForm(true);
  };

  const openEditForm = (promotion) => {
    setFormData({
      MaKM: promotion.MaKM,
      TenKM: promotion.TenKM,
      MoTa: promotion.MoTa,
      PhanTramKM: promotion.PhanTramKM,
      NgayBatDau: promotion.NgayBatDau?.slice(0, 10),
      NgayKetThuc: promotion.NgayKetThuc?.slice(0, 10),
    });
    setEditId(promotion.MaKM);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { PhanTramKM, NgayBatDau, NgayKetThuc } = formData;

    if (PhanTramKM < 0 || PhanTramKM > 100) {
      alert('Phần trăm khuyến mãi phải từ 0 đến 100');
      return;
    }

    if (new Date(NgayKetThuc) < new Date(NgayBatDau)) {
      alert('Ngày kết thúc không được trước ngày bắt đầu');
      return;
    }

    try {
      let response;
      if (isEditMode) {
        response = await promotionService.updatePromotion(editId, formData);
        setPromotions((prev) =>
          prev.map((p) => (p.MaKM === editId ? response.data : p))
        );
      } else {
        response = await promotionService.createPromotion(formData);
        setPromotions((prev) => [...prev, response.data]);
      }

      closeForm();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi gửi dữ liệu');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa khuyến mãi này?')) return;
    try {
      await promotionService.deletePromotion(id);
      setPromotions((prev) => prev.filter((p) => p.MaKM !== id));
    } catch (error) {
      console.error(error);
      alert('Không thể xóa khuyến mãi');
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      MaKM: '',
      TenKM: '',
      MoTa: '',
      PhanTramKM: '',
      NgayBatDau: '',
      NgayKetThuc: '',
    });
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Khuyến Mãi</h1>

          <button
            onClick={openAddForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm Khuyến Mãi
          </button>
        </div>

        {/* Form thêm/sửa */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {isEditMode ? 'Sửa Khuyến Mãi' : 'Thêm Khuyến Mãi'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mã Khuyến Mãi
                  </label>
                  <input
                    type="text"
                    name="MaKM"
                    value={formData.MaKM}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                    disabled={isEditMode}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tên Khuyến Mãi
                  </label>
                  <input
                    type="text"
                    name="TenKM"
                    value={formData.TenKM}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Mô Tả
                  </label>
                  <textarea
                    name="MoTa"
                    value={formData.MoTa}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phần Trăm Khuyến Mãi
                  </label>
                  <input
                    type="number"
                    name="PhanTramKM"
                    value={formData.PhanTramKM}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày Bắt Đầu
                  </label>
                  <input
                    type="date"
                    name="NgayBatDau"
                    value={formData.NgayBatDau}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày Kết Thúc
                  </label>
                  <input
                    type="date"
                    name="NgayKetThuc"
                    value={formData.NgayKetThuc}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {isEditMode ? 'Lưu' : 'Thêm'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bảng dữ liệu */}
        <div className="table-container">
            <table className="data-table">
            <thead>
              <tr>
                <th>Mã KM</th>
                <th>Tên KM</th>
                <th>Mô Tả</th>
                <th>% KM</th>
                <th>Bắt Đầu</th>
                <th>Kết Thúc</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((p) => (
                <tr key={p.MaKM}>
                  <td>{p.MaKM}</td>
                  <td>{p.TenKM}</td>
                  <td>{p.MoTa}</td>
                  <td>{p.PhanTramKM}%</td>
                  <td>{formatDate(p.NgayBatDau)}</td>
                  <td>{formatDate(p.NgayKetThuc)}</td>
                  <td>
                    <button
                      onClick={() => openEditForm(p)}
                      className="btn-action btn-edit text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p.MaKM)}
                      className="btn-action btn-delete text-red-600 hover:underline"
                    >
                      Xóa
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
};

export default Promotion;
