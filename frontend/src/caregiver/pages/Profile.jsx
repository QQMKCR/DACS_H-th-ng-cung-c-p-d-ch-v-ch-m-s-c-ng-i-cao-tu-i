import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaVenusMars,
  FaCalendarAlt,
  FaIdBadge,
  FaInfoCircle,
} from "react-icons/fa";

const Profile = () => {
  const initialData = {
    MaNV: "NV001",
    HoVaTenLot: "Nguyễn Văn",
    Ten: "A",
    NgheNghiep: "Nhân viên chăm sóc",
    GioiTinh: "Nam",
    NgaySinh: "1990-01-01",
    HinhDaiDien: "https://via.placeholder.com/300",
    Email: "nguyenvana@example.com",
    SDT: "0123 456 789",
  };

  const [data, setData] = useState(initialData);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9\s]+$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isChanged = () =>
    Object.keys(form).some((key) => form[key] !== data[key]);

  const validateForm = () => {
    let errs = {};
    if (!form.HoVaTenLot.trim()) errs.HoVaTenLot = "Họ và tên lót không được để trống";
    if (!form.Ten.trim()) errs.Ten = "Tên không được để trống";
    if (!validateEmail(form.Email)) errs.Email = "Email không hợp lệ";
    if (!validatePhone(form.SDT)) errs.SDT = "Số điện thoại không hợp lệ";
    if (!form.NgheNghiep.trim()) errs.NgheNghiep = "Nghề nghiệp không được để trống";
    if (!form.GioiTinh) errs.GioiTinh = "Vui lòng chọn giới tính";
    if (!form.NgaySinh) errs.NgaySinh = "Ngày sinh không được để trống";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setData(form);
      setEditMode(false);
      setSuccessMsg("Cập nhật thông tin thành công!");
      setTimeout(() => setSuccessMsg(""), 3500);
    }
  };

  const handleCancel = () => {
    setForm(data);
    setErrors({});
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-purple-100 p-12 flex justify-center items-start">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl ring-1 ring-indigo-300 p-12 flex flex-col md:flex-row gap-12">
        {/* Avatar */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={data.HinhDaiDien}
            alt={`Ảnh đại diện của ${data.HoVaTenLot} ${data.Ten}`}
            className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-indigo-400"
          />
          <h2 className="mt-6 text-4xl font-extrabold text-indigo-700 select-text">
            {data.HoVaTenLot} {data.Ten}
          </h2>
          <p className="text-md mt-2 text-gray-600 italic text-center md:text-left select-text">
            {data.NgheNghiep}
          </p>
        </div>

        {/* Info */}
        <div className="flex-1">
          {successMsg && (
            <div className="mb-8 p-5 bg-green-100 text-green-900 rounded-xl font-semibold shadow-md text-center text-lg">
              {successMsg}
            </div>
          )}

          {!editMode ? (
            <>
              <div className="space-y-6 text-lg">
                <InfoRow icon={<FaIdBadge />} label="Mã nhân viên" value={data.MaNV} />
                <InfoRow icon={<FaUserTie />} label="Nghề nghiệp" value={data.NgheNghiep} />
                <InfoRow icon={<FaEnvelope />} label="Email" value={data.Email} href={`mailto:${data.Email}`} />
                <InfoRow icon={<FaPhone />} label="SĐT" value={data.SDT} href={`tel:${data.SDT.replace(/\s+/g, "")}`} />
                <InfoRow icon={<FaVenusMars />} label="Giới tính" value={data.GioiTinh} />
                <InfoRow icon={<FaCalendarAlt />} label="Ngày sinh" value={data.NgaySinh} />
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-full font-semibold text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Chỉnh sửa thông tin
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-8"
              noValidate
            >
              {[
                { name: "HoVaTenLot", label: "Họ và tên lót", type: "text" },
                { name: "Ten", label: "Tên", type: "text" },
                { name: "Email", label: "Email", type: "email" },
                { name: "SDT", label: "Số điện thoại", type: "text" },
                { name: "NgheNghiep", label: "Nghề nghiệp", type: "text" },
                { name: "GioiTinh", label: "Giới tính", type: "text" },
                { name: "NgaySinh", label: "Ngày sinh", type: "date" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="block text-indigo-700 font-bold mb-2 text-xl flex items-center gap-2"
                  >
                    <FaInfoCircle className="text-indigo-400" />
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    className={`w-full border rounded-2xl px-6 py-4 text-lg font-medium placeholder-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition ${
                      errors[name] ? "border-red-500 ring-red-400" : "border-indigo-300"
                    }`}
                  />
                  {errors[name] && (
                    <p className="mt-1 text-red-600 text-base font-semibold">
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-8 mt-12">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-14 py-4 rounded-full bg-gray-200 text-gray-800 font-semibold text-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={!isChanged()}
                  className={`px-14 py-4 rounded-full text-white font-semibold text-lg transition-transform active:scale-95 ${
                    isChanged()
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-indigo-300 cursor-not-allowed"
                  }`}
                >
                  Lưu
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, href }) => (
  <div className="flex items-center gap-4">
    <div className="text-indigo-500 text-2xl">{icon}</div>
    <div className="text-gray-700 text-lg font-semibold min-w-[140px]">{label}:</div>
    {href ? (
      <a
        href={href}
        className="text-indigo-700 hover:underline text-lg font-medium select-text break-all"
        target="_blank"
        rel="noreferrer"
      >
        {value}
      </a>
    ) : (
      <div className="text-gray-900 text-lg font-medium select-text">{value}</div>
    )}
  </div>
);

export default Profile;
