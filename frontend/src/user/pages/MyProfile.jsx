import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { value, logout } = useAppContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    ho: '',
    ten: '',
    email: '',
    ngaySinh: '',
    gioiTinh: '',
    sdt: '',
    anhDaiDien: null,
  });
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = value.token || localStorage.getItem('token');
        if (!token) {
          setError('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
          return;
        }

        const response = await fetch('http://localhost:5000/api/client/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401 || response.status === 403) {
          setError('Không thể lấy thông tin. Token có thể hết hạn. Vui lòng đăng xuất và đăng nhập lại.');
          return;
        }

        if (!response.ok) {
          throw new Error('Không thể lấy thông tin người dùng');
        }

        const data = await response.json();
        const formattedNgaySinh = data.ngaySinh
          ? new Date(data.ngaySinh).toISOString().split('T')[0]
          : '';
        setUserData({
          ho: data.ho || '',
          ten: data.ten || '',
          email: data.email || '',
          ngaySinh: formattedNgaySinh,
          gioiTinh: data.gioiTinh || '',
          sdt: data.sdt || '',
          anhDaiDien: data.anhDaiDien || null,
        });
        setError(null);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [value.token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, anhDaiDien: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const token = value.token || localStorage.getItem('token');
      if (!token) {
        setError('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
        return;
      }

      const formData = new FormData();
      formData.append('ho', userData.ho);
      formData.append('ten', userData.ten);
      formData.append('ngaySinh', userData.ngaySinh);
      formData.append('gioiTinh', userData.gioiTinh);
      formData.append('email', userData.email);
      formData.append('sdt', userData.sdt);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput?.files[0]) {
        formData.append('anhDaiDien', fileInput.files[0]);
      }

      const response = await fetch('http://localhost:5000/api/client/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401 || response.status === 403) {
        setError('Không thể cập nhật thông tin. Token có thể hết hạn. Vui lòng đăng xuất và đăng nhập lại.');
        return;
      }

      if (!response.ok) {
        throw new Error('Không thể cập nhật thông tin');
      }

      const result = await response.json();
      console.log(result.message);
      setIsEdit(false);

      setUserData((prev) => ({
        ...prev,
        anhDaiDien: result.user.anhDaiDien,
      }));
      setError(null);
    } catch (error) {
      console.error('Lỗi khi cập nhật:', error);
      setError(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.'
    );
    if (!confirmDelete) return;

    try {
      const token = value.token || localStorage.getItem('token');
      if (!token) {
        setError('Bạn chưa đăng nhập. Vui lòng đăng nhập lại.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/client/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401 || response.status === 403) {
        setError('Không thể xóa tài khoản. Token có thể hết hạn. Vui lòng đăng xuất và đăng nhập lại.');
        return;
      }

      if (!response.ok) {
        throw new Error('Không thể xóa tài khoản');
      }

      const result = await response.json();
      console.log(result.message);
      logout(); // Sử dụng hàm logout từ context
      navigate('/');
    } catch (error) {
      console.error('Lỗi khi xóa tài khoản:', error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    logout(); // Sử dụng hàm logout từ context
    navigate('/');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {value.message && <p style={{ color: 'blue' }}>{value.message}</p>}

      <div>
        <button onClick={handleLogout} style={{ color: 'blue', marginBottom: '20px' }}>
          Đăng xuất
        </button>
      </div>

      <img src={userData.anhDaiDien || 'default-avatar.png'} alt="Ảnh đại diện" />

      {isEdit ? (
        <input
          type="text"
          value={`${userData.ho} ${userData.ten}`}
          onChange={(e) => {
            const [ho, ...tenParts] = e.target.value.split(' ');
            setUserData((prev) => ({
              ...prev,
              ho: ho || '',
              ten: tenParts.join(' ') || '',
            }));
          }}
        />
      ) : (
        <p>
          {userData.ho} {userData.ten}
        </p>
      )}

      <hr />

      <div>
        <p>THÔNG TIN CÁ NHÂN</p>
        <div>
          <p>Email:</p>
          <p>{userData.email}</p>
          <p>Số điện thoại:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.sdt}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, sdt: e.target.value }))
              }
            />
          ) : (
            <p>{userData.sdt}</p>
          )}
          <p>Giới Tính:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gioiTinh: e.target.value }))
              }
              value={userData.gioiTinh}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          ) : (
            <p>{userData.gioiTinh}</p>
          )}
          <p>Ngày sinh:</p>
          {isEdit ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, ngaySinh: e.target.value }))
              }
              value={userData.ngaySinh}
            />
          ) : (
            <p>
              {userData.ngaySinh
                ? new Date(userData.ngaySinh).toLocaleDateString('vi-VN')
                : ''}
            </p>
          )}
          {isEdit && (
            <div>
              <p>Ảnh đại diện:</p>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          )}
        </div>
      </div>

      <div>
        {isEdit ? (
          <button onClick={handleSave}>Lưu thông tin</button>
        ) : (
          <button onClick={() => setIsEdit(true)}>Cập nhật thông tin</button>
        )}
      </div>

      <div>
        <button onClick={handleDeleteAccount} style={{ color: 'red' }}>
          Xóa tài khoản
        </button>
      </div>
    </div>
  );
};

export default MyProfile;