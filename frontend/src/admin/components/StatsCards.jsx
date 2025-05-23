import React from 'react';

const StatsCard = ({ id, amount, name, icon }) => {
  return (
    <div
      key={id}
      className="w-full max-w-xs flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200"
    >
      <div className="p-4 bg-blue-100 text-blue-600 rounded-xl text-xl">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-gray-800">{amount}</span>
        <span className="text-sm text-gray-500">{name}</span>
      </div>
    </div>
  );
};

export default StatsCard;
