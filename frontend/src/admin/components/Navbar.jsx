import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Đường dẫn đến logo của bạn

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 shadow-md border-b border-gray-400">
        <div className="flex items-center space-x-6">
          <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
          <p className="text-2xl font-bold text-gray-800">PeaceCare</p>
          <div className="hidden md:flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full shadow-sm">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.387 0 4.61.555 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-700 font-medium">ADMIN</span>
          </div>
        </div>

        {/* Logout */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/logout')}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};