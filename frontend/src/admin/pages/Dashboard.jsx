import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import StatsCard from "../components/StatsCards";
import { FiUsers, FiUser, FiShoppingCart, FiDollarSign } from "react-icons/fi";

import orderDetailService from "../../services/orderDetailService.js";
import orderService from "../../services/orderService.js";
import employeeService from "../../services/employeeService.js";
import userService from "../../services/userService.js";
import invoiceService from "../../services/invoiceService.js";

const Dashboard = () => {
  const [pieData, setPieData] = useState([]);

  const [stats, setStats] = useState([
    {id: 1, amount: 0, name: "Đơn đặt dịch vụ", icon: <FiShoppingCart className="text-xl text-blue-600" />, },
    {id: 2, amount: 0, name: "Nhân viên", icon: <FiUser className="text-xl text-green-600" />, },
    {id: 3, amount: 0, name: "Người dùng", icon: <FiUsers className="text-xl text-purple-600" />, },
    {id: 4, amount: 0, name: "Tổng doanh thu", icon: <FiDollarSign className="text-xl text-yellow-600" />, },
  ]);

  const growthData = [
    { month: "1/2025", revenue: 12000000 },
    { month: "2/2025", revenue: 15000000 },
    { month: "3/2025", revenue: 18000000 },
    { month: "4/2025", revenue: 21000000 },
    { month: "5/2025", revenue: 24000000 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  const performanceData = [
    { subject: "Dịch vụ", A: 120 },
    { subject: "Phản hồi", A: 98 },
    { subject: "Chất lượng", A: 86 },
    { subject: "Thời gian", A: 99 },
    { subject: "Sự hài lòng", A: 85 },
  ];

  useEffect(() => {
    Promise.all([
      orderService.getOrderCount(),
      employeeService.getEmployeeCount(),
      userService.getUserCount(),
      invoiceService.getTotalRevenueAll(),
      orderDetailService.getOrderDetailsByMaLoai(),
    ])
      .then(([orderRes, employeeRes, userRes, invoiceRes, pieRes]) => {
        const newStats = [
          {
            id: 1,
            amount: orderRes.data?.count ?? orderRes.data ?? 0,
            name: "Đơn đặt dịch vụ",
            icon: <FiShoppingCart className="text-xl text-blue-600" />,
          },
          {
            id: 2,
            amount: employeeRes.data?.count ?? employeeRes.data ?? 0,
            name: "Nhân viên",
            icon: <FiUser className="text-xl text-green-600" />,
          },
          {
            id: 3,
            amount: userRes.data?.count ?? userRes.data ?? 0,
            name: "Người dùng",
            icon: <FiUsers className="text-xl text-purple-600" />,
          },
          {
            id: 4,
            amount: invoiceRes.data?.totalRevenue ?? invoiceRes.data ?? 0,
            name: "Tổng doanh thu",
            icon: <FiDollarSign className="text-xl text-yellow-600" />,
          },
        ];
        setStats(newStats);

        if (Array.isArray(pieRes.data)) {
          setPieData(pieRes.data);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy dữ liệu thống kê:", err);
      });
  }, []);

  return (
    <div className="h-full w-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            id={stat.id}
            amount={stat.amount}
            name={stat.name}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Biểu đồ tăng trưởng doanh thu
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Tỷ lệ dịch vụ sử dụng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, `Số lượng (${name})`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Tăng trưởng doanh thu tích lũy
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Hiệu suất các tiêu chí</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Chỉ số"
                dataKey="A"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
