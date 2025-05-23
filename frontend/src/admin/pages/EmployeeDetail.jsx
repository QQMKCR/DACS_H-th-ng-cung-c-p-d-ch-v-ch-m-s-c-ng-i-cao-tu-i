// export default EmployeeDetail;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import formatDate from '../components/FormatDate';
import axios from 'axios';

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="h-screen w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Employee Not Found</h1>
          <button
            onClick={() => navigate('/pages/employees')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${employee.HoVaTenLot} ${employee.Ten}`;

  return (
    <div className="min-h-screen w-full bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 text-white p-6">
          <button
            onClick={() => navigate('/pages/employees')}
            className="text-sm font-medium hover:underline mb-4 inline-block"
          >
            ← Back to Employees
          </button>
          <div className="flex items-center">
            <img
              src={employee.HinhDaiDien || 'https://via.placeholder.com/150'}
              alt={fullName}
              className="w-24 h-24 rounded-full object-cover mr-4 border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold">{fullName}</h1>
              <p className="text-lg">{employee.NgheNghiep}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <p><span className="font-medium text-gray-700">Date of Birth:</span> {formatDate(employee.NgaySinh)}</p>
            <p><span className="font-medium text-gray-700">Degree:</span> {employee.BangCap}</p>
            <p><span className="font-medium text-gray-700">Experience:</span> {employee.KinhNghiem}</p>
            <p><span className="font-medium text-gray-700">Address:</span> {employee.DiaChi}</p>
            <p><span className="font-medium text-gray-700">Bank:</span> {employee.TenNH}</p>
            <p><span className="font-medium text-gray-700">Bank Account:</span> {employee.STK}</p>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><span className="font-medium">Email:</span> {employee.Email}</p>
            <p><span className="font-medium">Phone:</span> {employee.SDT}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => alert('Contact feature coming soon!')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Send Message
            </button>
            <button
              onClick={() => navigate('/pages/employees')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
