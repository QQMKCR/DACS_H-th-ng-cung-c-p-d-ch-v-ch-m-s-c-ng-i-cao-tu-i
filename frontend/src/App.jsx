import { Routes, Route } from 'react-router-dom';
import Sidebar from './admin/components/Sidebar';
import {Navbar} from './admin/components/Navbar';
import Dashboard from './admin/pages/Dashboard';
import Employees from './admin/pages/Employees';
import EmployeeDetail from './admin/pages/EmployeeDetail';
import Orders from './admin/pages/Orders';
import OrderDetail from './admin/pages/OrderDetail';
import Invoice from './admin/pages/Invoice';
import CareService from './admin/pages/CareService';
import Promotions from './admin/pages/Promotions';
import Users from './admin/pages/Users';
import BillingEmployee from './admin/pages/BillingEmployee';
import AccountUser from './admin/pages/AccountUser';
import AccountEmployee from './admin/pages/AccountEmployee';
import Evaluation from './admin/pages/Evaluation';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col p-0 m-0">
      <Navbar />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 bg-white p-6 overflow-y-auto">
          <Routes>
            <Route path="/pages/dashboard" element={<Dashboard />} />
            <Route path="/pages/employees" element={<Employees />} />
            <Route path="/pages/employee/:id" element={<EmployeeDetail />} />
            <Route path="/pages/orders" element={<Orders />} />
            <Route path="/pages/order/:orderId" element={<OrderDetail />} />
            <Route path="/pages/invoices" element={<Invoice />} />
            <Route path="/pages/accountusers" element={<AccountUser />} />
            <Route path="/pages/accountemployees" element={<AccountEmployee/>} />
            <Route path="/pages/careservice" element={<CareService />} />
            <Route path="/pages/promotions" element={<Promotions />} />
            <Route path="/pages/users" element={<Users />} />
            <Route path="/pages/evaluations" element={<Evaluation />} />
            <Route path="/billingemployee" element={<BillingEmployee />} />
            {/* Đường dẫn mặc định */}
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}