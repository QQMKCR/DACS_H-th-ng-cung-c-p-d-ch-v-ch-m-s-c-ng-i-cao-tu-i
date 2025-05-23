import { NavLink } from 'react-router-dom';
import { FiUsers, FiUser, FiSettings, FiCalendar } from 'react-icons/fi';

export default function Sidebar() {
  const menuItems = [
    { path: "/pages/dashboard", text: "Dashboard", icon: <FiUser /> },
    { path: "/pages/accountusers", text: "Tài khoản", icon: <FiUser /> },
    { path: "/pages/users", text: "Người dùng", icon: <FiUsers /> },
    { path: "/pages/employees", text: "Nhân viên chăm sóc", icon: <FiUsers /> },
    { path: "/pages/careservice", text: "Dịch vụ chăm sóc", icon: <FiCalendar /> },
    { path: "/pages/promotions", text: "Khuyến mãi", icon: <FiCalendar /> },
    { path: "/pages/orders", text: "Đơn đặt dịch vụ", icon: <FiCalendar /> },
    { path: "/pages/invoices", text: "Hoá đơn", icon: <FiSettings /> },
    { path: "/pages/evaluations", text: "Đánh giá", icon: <FiSettings /> },
    { path: "/billingemployee", text: "Billing Employee", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen shadow-md border border-gray-400">
      <nav className="py-6">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-4 text-gray-700 ${isActive ? 'bg-blue-100 text-blue-600' : ''}  hover:border-r-4 hover:border-blue-600 hover:bg-blue-50`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-smooth">{item.text}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}