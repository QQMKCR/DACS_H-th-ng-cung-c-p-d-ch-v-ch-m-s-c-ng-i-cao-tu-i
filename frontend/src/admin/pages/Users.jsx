import { useState, useEffect } from 'react';
import userService from '../../services/userService.js';
import accountUserService from '../../services/accountUserService';
import '../styles/table.css';
import formatDate from '../components/FormatDate';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ MaND: '', TenDN: '', MatKhau: '', VaiTro: 'user' });

  const handleDelete = (MaND) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${MaND}?`)) {
      userService.deleteUser(MaND)
        .then(() => {
          setUsers((prev) => prev.filter((user) => user.MaND !== MaND));
        })
        .catch((err) => {
          alert('Lỗi khi xóa người dùng: ' + (err.response?.data?.message || err.message));
        });
    }
  };
  const RoleEnum = {
  USER: 'user',
  ADMIN: 'admin',
  };

  const openForm = (MaND) => {
    setFormData({ MaND, TenDN: '', MatKhau: '', VaiTro: 'user' });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ MaND: '', TenDN: '', MatKhau: '', VaiTro: 'user' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    accountUserService.createAccount(formData)
      .then(() => {
        alert('Tạo tài khoản thành công!');
        closeForm();
      })
      .catch((err) => {
        alert('Lỗi khi tạo tài khoản: ' + (err.response?.data?.message || err.message));
      });
  };

  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-6 text-red-600">Lỗi: {error.message || error.toString()}</div>;

  const isEditMode = !!formData.MaTKND;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Danh Sách Người Dùng</h1>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã ND</th>
                <th>Họ</th>
                <th>Tên</th>
                <th>Ngày Sinh</th>
                <th>Giới Tính</th>
                <th>Email</th>
                <th>SDT</th>
                <th>Ảnh</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.MaND}>
                  <td>{user.MaND}</td>
                  <td>{user.Ho}</td>
                  <td>{user.Ten}</td>
                  <td>{formatDate(user.NgaySinh)}</td>
                  <td>{user.GioiTinh}</td>
                  <td className="email" title={user.Email}>{user.Email}</td>
                  <td>{user.SDT}</td>
                  <td>
                    <img src={user.AnhDaiDien} alt={`Avatar of ${user.Ho}`} />
                  </td>
                  <td className="actions space-y-2">
                    <button
                      onClick={() => handleDelete(user.MaND)}
                      className="btn-action btn-delete text-red-600 hover:underline block"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => openForm(user.MaND)}
                      className="btn-action btn-view text-green-600 hover:underline block"
                    >
                      Tạo Tài Khoản
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? 'Sửa Tài Khoản' : 'Thêm Tài Khoản'}
            </h2>
            <form onSubmit={handleSubmit}>
              {isEditMode && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Mã Tài Khoản</label>
                  <input
                    type="text"
                    name="MaTKND"
                    value={formData.MaTKND}
                    readOnly
                    className="mt-1 p-2 w-full border rounded bg-gray-100 text-gray-500"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
                <input
                  type="text"
                  name="MaND"
                  value={formData.MaND}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded bg-gray-100 text-gray-500"
                  readOnly={!isEditMode} // Chỉ được chỉnh khi tạo mới
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tên Đăng Nhập</label>
                <input
                  type="text"
                  name="TenDN"
                  value={formData.TenDN}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
                <input
                  type="password"
                  name="MatKhau"
                  value={formData.MatKhau}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Vai Trò</label>
                <select
                  name="VaiTro"
                  value={formData.VaiTro}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                >
                  <option value="">-- Chọn Vai Trò --</option>
                  <option value={RoleEnum.USER}>Người dùng</option>
                  <option value={RoleEnum.ADMIN}>Quản trị viên</option>
                </select>
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
    </div>
  );
}
