import React, { useState, useEffect } from 'react';
import serviceService from '../../services/serviceService';
import '../styles/table.css';

const CareService = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    MaDV: '',
    MaLoai: 1, // đổi thành số
    TenDV: '',
    MoTa: '',
    Gia: '',
    ThoiGianThucHien: '',
  });
  const [editServiceId, setEditServiceId] = useState(null);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  // Hàm chuyển số sang tên loại dịch vụ
  const getCategoryName = (id) => {
    if (id === 1) return 'Đơn';
    if (id === 2) return 'Gói';
    return 'Không xác định';
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error('Lỗi khi lấy dữ liệu:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Ép kiểu số cho MaLoai khi chọn
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'MaLoai' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      MaDV: '',
      MaLoai: 1,
      TenDV: '',
      MoTa: '',
      Gia: '',
      ThoiGianThucHien: '',
    });
    setIsEditMode(false);
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setFormData({ ...service });
    setEditServiceId(service.MaDV);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Dữ liệu gửi lên:", formData);

    if (isEditMode) {
      serviceService.updateService(editServiceId, formData)
        .then(res => {
          setServices(prev =>
            prev.map(service => service.MaDV === editServiceId ? res.data : service)
          );
          closeForm();
        })
        .catch(err => console.error('Lỗi khi cập nhật dịch vụ:', err));
    } else {
      // Tạo payload mới không có MaDV (để backend tự tạo)
      const { MaDV, ...payload } = formData;
      serviceService.createService(payload)
        .then(res => {
          setServices(prev => [...prev, res.data]);
          closeForm();
        })
        .catch(err => console.error('Lỗi khi tạo dịch vụ:', err));
    }
  };


  const handleDelete = (MaDV) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá dịch vụ này?')) {
      serviceService.deleteService(MaDV)
        .then(() => {
          setServices((prev) => prev.filter((service) => service.MaDV !== MaDV));
        })
        .catch((err) => console.error('Lỗi khi xoá dịch vụ:', err));
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditServiceId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Dịch Vụ Chăm Sóc</h1>
        <button
          onClick={resetForm}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thêm Dịch Vụ
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{isEditMode ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ'}</h2>
            <form onSubmit={handleSubmit}>
              <input name="MaDV" type="hidden" value={formData.MaDV} />
              <div className="mb-4">
                <label className="block text-sm font-medium">Loại Dịch Vụ</label>
                <select
                  name="MaLoai"
                  value={formData.MaLoai}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                >
                  <option value={1}>Đơn</option>
                  <option value={2}>Gói</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Tên Dịch Vụ</label>
                <input
                  name="TenDV"
                  value={formData.TenDV}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Mô Tả</label>
                <textarea
                  name="MoTa"
                  value={formData.MoTa}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Giá (VND)</label>
                <input
                  type="number"
                  name="Gia"
                  value={formData.Gia}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Thời Gian Thực Hiện</label>
                <input
                  name="ThoiGianThucHien"
                  value={formData.ThoiGianThucHien}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeForm} className="px-4 py-2 bg-gray-300 rounded">
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                  {isEditMode ? 'Lưu' : 'Thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <table className="data-table">
        <thead>
          <tr>
            <th>Mã</th>
            <th>Loại</th>
            <th>Tên</th>
            <th>Mô Tả</th>
            <th>Giá</th>
            <th>Thời Gian</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.MaDV}>
              <td>{service.MaDV}</td>
              <td>{getCategoryName(service.MaLoai)}</td>
              <td>{service.TenDV}</td>
              <td>{service.MoTa}</td>
              <td>{formatCurrency(service.Gia)}</td>
              <td>{service.ThoiGianThucHien}</td>
              <td>
                <button
                  onClick={() => openEditForm(service)}
                  className="btn-action btn-edit text-blue-600 hover:underline mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(service.MaDV)}
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

export default CareService;
