import { Routes, Route} from 'react-router-dom';
import Notification from './caregiver/pages/Notifications';
import Profile from './caregiver/pages/Profile';
import Schedule from './caregiver/pages/Schedule';
import WorkHistory from './caregiver/pages/WorkHistory';
import Sidebar from './caregiver/components/Sidebar';
import {Navbar} from './caregiver/components/Navbar';

export default function Caregiver(){
  return (
    <div className="min-h-screen flex flex-col p-0 m-0">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-white p-6 overflow-y-auto">
          <Routes>
            <Route path="/caregiver/workhistorys" element={<WorkHistory />} />
            <Route path="/caregiver/profile" element={<Profile />} />
            <Route path="/caregiver/schedules" element={<Schedule />} />
            <Route path="/caregiver/notifications" element={<Notification />} />
            {/* Đường dẫn mặc định */}
            <Route path="/" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
