const EmployeeCard = ({ employee, onClick }) => {
  const { HoVaTenLot, Ten, NgheNghiep, HinhDaiDien } = employee;
  const fullName = `${HoVaTenLot} ${Ten}`;

  return (
    <div
      onClick={onClick}
      className="border border-blue-200 bg-white flex flex-col items-center p-4 rounded-2xl shadow hover:shadow-lg transition-all cursor-pointer"
      style={{ width: '220px', height: '300px' }}
    >
      <div className="w-28 h-28 mb-3 rounded-full overflow-hidden shadow-sm">
        <img
          src={HinhDaiDien || 'https://via.placeholder.com/150'}
          alt={`${fullName}'s profile`}
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-center text-base font-semibold text-gray-800 leading-tight mb-1 line-clamp-2">
        {fullName}
      </h2>
      <p className="text-center text-sm text-gray-500">{NgheNghiep}</p>
    </div>
  );
};

export default EmployeeCard;
