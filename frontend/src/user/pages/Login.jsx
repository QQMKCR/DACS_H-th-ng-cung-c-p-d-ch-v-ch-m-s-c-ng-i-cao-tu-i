import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ho, setHo] = useState('');
  const [ten, setTen] = useState('');
  const [ngaySinh, setNgaySinh] = useState('');
  const [gioiTinh, setGioiTinh] = useState('');
  const [sdt, setSdt] = useState('');
  const [tenDN, setTenDN] = useState('');
  const navigate = useNavigate();

  const { login } = useAppContext(); // Sử dụng hàm login từ context

  const SubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {
      const formattedNgaySinh = ngaySinh ? `${ngaySinh} 00:00:00` : '';
      const body = { ho, ten, email, password, ngaySinh: formattedNgaySinh, gioiTinh, sdt, tenDN, anhDaiDien: null };
      console.log('Dữ liệu đăng ký:', body);

      const response = await fetch('http://localhost:5000/api/client/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Đăng ký thành công', { autoClose: 5000 });
        await handleLogin(); // Đăng nhập tự động sau khi đăng ký
      } else {
        toast.error(data.message || 'Đăng ký thất bại', { autoClose: 5000 });
      }
    } else {
      await handleLogin();
    }
  };

  const handleLogin = async () => {
    const body = { tenDN, password };
    console.log('Dữ liệu đăng nhập:', { tenDN, password: '***' });

    const response = await fetch('http://localhost:5000/api/client/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success('Đăng nhập thành công', { autoClose: 5000 });
      login(data.token, data.user); // Lưu token và user vào context

      const role = 'user'; // Có thể lấy role từ data.user nếu có
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } else {
      toast.error(data.message || 'Đăng nhập thất bại', { autoClose: 5000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-5xl w-full rounded-2xl shadow-xl overflow-hidden">
        {/* Bên trái */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/image/login.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bên phải: */}
        <div className="w-full md:w-1/2 bg-white/70 backdrop-blur-lg p-8 min-h-[600px] transition-all duration-300">
          <form onSubmit={SubmitHandler}>
            <h2 className="text-3xl font-bold text-blue-900 text-center mb-4">
              {state === 'Sign Up' ? 'Tạo tài khoản' : 'Đăng nhập'}
            </h2>
            <p className="text-gray-700 text-center mb-6">
              Hãy {state === 'Sign Up' ? 'đăng ký' : 'đăng nhập'} để đặt dịch vụ chăm sóc
            </p>

            {state === 'Sign Up' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Họ</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="text" onChange={(e) => setHo(e.target.value)} value={ho} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Ngày sinh</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="date" onChange={(e) => setNgaySinh(e.target.value)} value={ngaySinh} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Số điện thoại</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="text" onChange={(e) => setSdt(e.target.value)} value={sdt} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Tên</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="text" onChange={(e) => setTen(e.target.value)} value={ten} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Giới tính</label>
                    <select className="w-full border-gray-400 p-2 border rounded-lg" onChange={(e) => setGioiTinh(e.target.value)} value={gioiTinh} required>
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="text" onChange={(e) => setTenDN(e.target.value)} value={tenDN} required />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                    <input className="w-full border-gray-400 p-2 border rounded-lg" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Tên đăng nhập</label>
                  <input className="w-full border-gray-400 p-2 border rounded-lg" type="text" onChange={(e) => setTenDN(e.target.value)} value={tenDN} required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                  <input className="w-full border-gray-400 p-2 border rounded-lg" type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button
                className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-950 transition-colors duration-300 mt-4"
                type="submit"
              >
                {state === 'Sign Up' ? 'Đăng ký' : 'Đăng nhập'}
              </button>
            </div>

            <p className="text-lg text-center text-gray-600 mt-4">
              {state === 'Sign Up' ? (
                <>
                  Đã có tài khoản?{' '}
                  <span onClick={() => setState('Login')} className="text-blue-950 underline cursor-pointer">
                    Đăng nhập
                  </span>
                </>
              ) : (
                <>
                  Chưa có tài khoản?{' '}
                  <span onClick={() => setState('Sign Up')} className="text-blue-950 underline cursor-pointer">
                    Ấn để đăng ký
                  </span>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;