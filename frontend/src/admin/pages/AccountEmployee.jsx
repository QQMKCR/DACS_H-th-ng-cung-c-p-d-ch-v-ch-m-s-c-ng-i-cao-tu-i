import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import accountEmployeeService from '../../services/accountEmployeeService';
import employeeService from '../../services/employeeService';
import '../styles/table.css';

export default function AccountEmployee() {
  const [accountEmployees, setAccountEmployee] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ MaNV: '', TenDN: '', MatKhau: '' });
  const navigate = useNavigate();


  const togglePasswordVisibility = (id) => {
  setVisiblePasswords((prev) => ({
    ...prev,
    [id]: !prev[id],
  }));
  };

  const handleDelete = (MaTKNV) => {
    if (window.confirm(`Bạn có chắc muốn xóa tài khoản ${MaTKNV}?`)) {
      accountEmployeeService.deleteAccount(MaTKNV)
        .then(() => {
          setAccountEmployee((prev) => prev.filter((account) => account.MaTKNV !== MaTKNV));
        })
        .catch((err) => {
          alert('Lỗi khi xóa tài khoản: ' + (err.response?.data?.message || err.message));
        });
    }
  };

  const handleCreate = () => {
    if (!form.MaNV || !form.TenDN || !form.MatKhau) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    accountEmployeeService.createAccountEmployee(form)
      .then((res) => {
        setAccountEmployee((prev) => [...prev, res.data]);
        setForm({ MaNV: '', TenDN: '', MatKhau: '' });
      })
      .catch((err) => {
        alert('Lỗi khi tạo tài khoản: ' + (err.response?.data?.message || err.message));
      });
  };

  useEffect(() => {
    accountEmployeeService.getAccountEmployees()
      .then((res) => {
        setAccountEmployee(res.data);
        setError(null);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));

    employeeService.getEmployees()
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error('Lỗi khi tải nhân viên:', err));
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Đang tải dữ liệu...</div>;
  if (error) return <div className="p-6 text-red-600">Lỗi: {error.message || error.toString()}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Danh Sách Tài Khoản Nhân Viên</h1>
          <button
            onClick={() => navigate('/pages/accountusers')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ← Chuyển sang Tài Khoản Người Dùng
          </button>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Tạo Tài Khoản Nhân Viên</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border px-3 py-2 rounded"
              value={form.MaNV}
              onChange={(e) => setForm({ ...form, MaNV: e.target.value })}
            >
              <option value="">-- Chọn Nhân Viên --</option>
              {employees.map((nv) => (
                <option key={nv.MaNV} value={nv.MaNV}>
                  {nv.MaNV} - {nv.HoVaTenLot} {nv.Ten}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="border px-3 py-2 rounded"
              placeholder="Tên đăng nhập"
              value={form.TenDN}
              onChange={(e) => setForm({ ...form, TenDN: e.target.value })}
            />

            <input
              type="password"
              className="border px-3 py-2 rounded"
              placeholder="Mật khẩu"
              value={form.MatKhau}
              onChange={(e) => setForm({ ...form, MatKhau: e.target.value })}
            />
          </div>

          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Tạo Tài Khoản
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Mã TKNV</th>
                <th>Mã NV</th>
                <th>Tên Đăng Nhập</th>
                <th>Mật Khẩu</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {accountEmployees.map((accounte) => (
                <tr key={accounte.MaTKNV}>
                  <td>{accounte.MaTKNV}</td>
                  <td
                    className="text-red-800 hover:underline cursor-pointer"
                    onClick={() => navigate(`/employee/${accounte.MaNV}`)}
                  >
                    {accounte.MaNV}
                  </td>
                  <td>{accounte.TenDN}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>
                        {visiblePasswords[accounte.MaTKNV] ? accounte.MatKhau : '••••••••'}
                      </span>
                    </div>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => handleDelete(accounte.MaTKNV)}
                      className="btn-action btn-delete text-red-600 hover:underline"
                    >
                      Xóa
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => togglePasswordVisibility(accounte.MaTKNV)}
                        className="btn-action btn-view text-blue-600 hover:underline text-sm"
                      >
                        {visiblePasswords[accounte.MaTKNV] ? 'Ẩn' : 'Hiện'}
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
