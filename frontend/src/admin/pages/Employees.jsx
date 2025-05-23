import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import employeeService from '../../services/employeeService';

const Employees = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    MaNV: '',
    NgheNghiep: '',
    HoVaTenLot: '',
    Ten: '',
    NgaySinh: '',
    GioiTinh: '',
    Email: '',
    DiaChi: '',
    SDT: '',
    BangCap: '',
    KinhNghiem: '',
    TenNH: '',
    STK: '',
    HinhDaiDien: ''
  });

  useEffect(() => {
    employeeService.getEmployees()
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleCardClick = (MaNV) => {
    navigate(`/pages/employee/${MaNV}`);
  };

  const handleDelete = (MaNV) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá nhân viên này?')) {
      employeeService.deleteEmployee(MaNV)
        .then(() => {
          setEmployees(prev => prev.filter(emp => emp.MaNV !== MaNV));
        })
        .catch(err => console.error(err));
    }
  };

  const handleEdit = (emp) => {
    // Format date to yyyy-mm-dd if needed
    const formattedEmp = {
      ...emp,
      NgaySinh: emp.NgaySinh ? emp.NgaySinh.split('T')[0] : ''
    };
    setFormData(formattedEmp);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      MaNV: '',
      NgheNghiep: '',
      HoVaTenLot: '',
      Ten: '',
      NgaySinh: '',
      GioiTinh: '',
      Email: '',
      DiaChi: '',
      SDT: '',
      BangCap: '',
      KinhNghiem: '',
      TenNH: '',
      STK: '',
      HinhDaiDien: ''
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi lên:", formData);
    if (isEditing) {
      employeeService.updateEmployee(formData.MaNV, formData)
        .then(res => {
          setEmployees(prev =>
            prev.map(emp => emp.MaNV === formData.MaNV ? res.data : emp)
          );
          resetForm();
        })
        .catch(err => console.error(err));
    } else {
      employeeService.createEmployee(formData)
        .then(res => {
          setEmployees(prev => [...prev, res.data]);
          resetForm();
        })
        .catch(err => console.error("Chi tiết lỗi:", err.response?.data));
        
    }
  };

  const uniquePositions = [...new Set(employees.map(emp => emp.NgheNghiep))];
  const uniqueDegrees = [...new Set(employees.map(emp => emp.BangCap))];

  const filteredEmployees = employees.filter(emp =>
    (!selectedPosition || emp.NgheNghiep === selectedPosition) &&
    (!selectedDegree || emp.BangCap === selectedDegree)
  );

  return (
    <div className="h-full w-full bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tất Cả Nhân Viên</h1>
        <button
          onClick={() => { setShowForm(true); setIsEditing(false); }}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Thêm Nhân Viên
        </button>
      </div>

      <div className="flex gap-6 mb-6 items-end">
        <div>
          <label className="block mb-1 font-semibold">Vị Trí:</label>
          <select
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
            className="p-2 border rounded w-48"
          >
            <option value="">Tất cả</option>
            {uniquePositions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Bằng Cấp:</label>
          <select
            value={selectedDegree}
            onChange={(e) => setSelectedDegree(e.target.value)}
            className="p-2 border rounded w-48"
          >
            <option value="">Tất cả</option>
            {uniqueDegrees.map(deg => (
              <option key={deg} value={deg}>{deg}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => { setSelectedPosition(''); setSelectedDegree(''); }}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Xoá bộ lọc
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-6">
        {filteredEmployees.map(emp => (
          <EmployeeCard
            key={emp.MaNV}
            employee={emp}
            onClick={() => handleCardClick(emp.MaNV)}
            onDelete={() => handleDelete(emp.MaNV)}
            onEdit={() => handleEdit(emp)}
          />
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Chỉnh Sửa Nhân Viên' : 'Thêm Nhân Viên'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã Nhân Viên</label>
                <input
                  type="text"
                  name="MaNV"
                  value={formData.MaNV}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                  disabled={isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Vị Trí</label>
                <input
                  type="text"
                  name="NgheNghiep"
                  value={formData.NgheNghiep}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Họ Và Tên Lót</label>
                <input
                  type="text"
                  name="HoVaTenLot"
                  value={formData.HoVaTenLot}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên</label>
                <input
                  type="text"
                  name="Ten"
                  value={formData.Ten}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ngày Sinh</label>
                <input
                  type="date"
                  name="NgaySinh"
                  value={formData.NgaySinh}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Giới Tính</label>
                <select
                  name="GioiTinh"
                  value={formData.GioiTinh}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                >
                  <option value="">Chọn giới tính</option>
                  <option value="0">Nữ</option>
                  <option value="1">Nam</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Địa Chỉ</label>
                <textarea
              name="DiaChi"
              value={formData.DiaChi}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
            <input
              type="text"
              name="SDT"
              value={formData.SDT}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Bằng Cấp</label>
            <input
              type="text"
              name="BangCap"
              value={formData.BangCap}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Kinh Nghiệm</label>
            <input
              type="text"
              name="KinhNghiem"
              value={formData.KinhNghiem}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tên Ngân Hàng</label>
            <input
              type="text"
              name="TenNH"
              value={formData.TenNH}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Số Tài Khoản</label>
            <input
              type="text"
              name="STK"
              value={formData.STK}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ảnh Đại Diện URL</label>
            <input
              type="text"
              name="HinhDaiDien"
              value={formData.HinhDaiDien}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
</div>
);
};

export default Employees;