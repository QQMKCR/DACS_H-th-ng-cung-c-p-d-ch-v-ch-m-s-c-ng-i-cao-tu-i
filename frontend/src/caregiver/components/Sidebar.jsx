import { FiUser, FiCalendar, FiClock, FiBell } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { path: "/caregiver/profile", text: "Hồ sơ nhân viên", icon: <FiUser /> },
    { path: "/caregiver/schedules", text: "Lịch làm việc", icon: <FiCalendar /> },
    { path: "/caregiver/workhistorys", text: "Lịch sử công việc", icon: <FiClock /> },
    { path: "/caregiver/notifications", text: "Thông báo", icon: <FiBell /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen shadow-md border border-gray-400">
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
