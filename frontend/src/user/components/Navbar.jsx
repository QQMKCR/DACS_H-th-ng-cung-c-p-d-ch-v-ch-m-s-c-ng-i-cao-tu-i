// client/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { value, setValue } = useAppContext();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/client/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        style={{
          width: '100px',
          height: 'auto',
          maxWidth: '100%',
          cursor: 'pointer',
        }}
      />
      <ul className="hidden md:flex items-start text-sky-950 gap-8 font-medium text-base">
        <NavLink to={'/'}>
          <div className="py-1 cursor-pointer">
            TRANG CHỦ
            <hr className="border-none outline-none rounded-2xl h-0.5 bg-primary w-7 m-auto hidden" />
          </div>
        </NavLink>

        <li className="relative group py-1">
          <div className="flex items-center gap-1 cursor-pointer">
            <span>DỊCH VỤ</span>
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown icon" />
          </div>
          <div className="absolute top-0 left-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
            <div className="min-w-64 bg-stone-100 rounded flex flex-col gap-2 p-4 text-sky-950">
              {services.length > 0 ? (
                services.map((service) => (
                  <NavLink
                    key={service.MaDV}
                    to={`/services/${service.MaDV}`}
                    className="hover:text-black cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {service.TenDV}
                  </NavLink>
                ))
              ) : (
                <p className="text-gray-500">Không có dịch vụ nào</p>
              )}
            </div>
          </div>
          <hr className="border-none outline-none rounded-2xl h-0.5 bg-primary w-7 m-auto hidden" />
        </li>

        <NavLink to={'/caregivers'}>
          <div className="py-1 cursor-pointer">
            NHÂN VIÊN CHĂM SÓC
            <hr className="border-none outline-none rounded-2xl h-0.5 bg-primary w-7 m-auto hidden" />
          </div>
        </NavLink>

        <NavLink to={'/about'}>
          <div className="py-1 cursor-pointer">
            VỀ CHÚNG TÔI
            <hr className="border-none outline-none rounded-2xl h-0.5 bg-primary w-7 m-auto hidden" />
          </div>
        </NavLink>

        <NavLink to={'/contact'}>
          <div className="py-1 cursor-pointer">
            LIÊN HỆ
            <hr className="border-none outline-none rounded-2xl h-0.5 bg-primary w-7 m-auto hidden" />
          </div>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {value.token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile picture" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown icon" />
            <div className="absolute top-0 right-0 pt-10 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 text-sky-950">
                <p onClick={() => navigate('/my-profile')} className="hover:text-black cursor-pointer">
                  Hồ sơ
                </p>
                <p onClick={() => navigate('/my-orders')} className="hover:text-black cursor-pointer">
                  Đơn đặt dịch vụ
                </p>
                <p onClick={() => {
                      setValue({ ...value, token: false });
                      navigate('/login');
                    }} className="hover:text-black cursor-pointer">
                  Đăng xuất
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-5 py-3 rounded-full font-sans md:block"
          >
            Đăng ký/Đăng nhập
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;