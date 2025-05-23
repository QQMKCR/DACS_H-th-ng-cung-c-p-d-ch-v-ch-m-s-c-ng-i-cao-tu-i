import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import accountUserService from '../../services/accountUserService';
import '../styles/table.css';

export default function AccountUser() {
  const [accountUsers, setAccountUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    MaTKND: '',
    MaND: '',
    TenDN: '',
    MatKhau: '',
    VaiTro: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    accountUserService
      .getAccountUsers()
      .then((res) => {
        setAccountUsers(res.data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (MaTKND) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản ${MaTKND}?`)) {
      accountUserService.deleteAccountUser(MaTKND)
        .then(() => {
          setAccountUsers((prev) => prev.filter((account) => account.MaTKND !== MaTKND));
        })
        .catch((err) => {
          alert('Lỗi khi xóa tài khoản: ' + (err.response?.data?.message || err.message));
        });
    }
  };

  const openEditForm = (account) => {
    setFormData({ ...account });
    setEditId(account.MaTKND);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await accountUserService.updateAccountUser(editId, formData);
      setAccountUsers((prev) =>
        prev.map((a) => (a.MaTKND === editId ? response.data : a))
      );
      closeForm();
    } catch (err) {
      alert('Lỗi khi gửi dữ liệu: ' + (err.response?.data?.message || err.message));
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({
      MaTKND: '',
      MaND: '',
      TenDN: '',
      MatKhau: '',
      VaiTro: ''
    });
    setEditId(null);
  };

  if (loading) return <div className="p-6 text-gray-600">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-6 text-red-600">Lỗi: {error.message || error.toString()}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Tài Khoản Người Dùng</h1>
          <button
            onClick={() => navigate('/pages/accountemployees')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            → Tài Khoản Nhân Viên
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Sửa Tài Khoản</h2>
              <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Mã Người Dùng</label>
                  <input
                    type="text"
                    name="MaND"
                    value={formData.MaND}
                    readOnly
                    className="mt-1 p-2 w-full border rounded bg-gray-100 text-gray-500"
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
                  <input
                    type="text"
                    name="VaiTro"
                    value={formData.VaiTro}
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
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã ND</th>
                <th>Tên Đăng Nhập</th>
                <th>Mật Khẩu</th>
                <th>Vai Trò</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {accountUsers.map((accountu) => (
                <tr key={accountu.MaTKND}>
                  <td>{accountu.MaND}</td>
                  <td>{accountu.TenDN}</td>
                  <td>{accountu.MatKhau}</td>
                  <td>{accountu.VaiTro}</td>
                  <td className="actions">
                    <button
                      onClick={() => openEditForm(accountu)}
                      className="btn-action btn-edit text-blue-600 hover:underline mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(accountu.MaTKND)}
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
}
