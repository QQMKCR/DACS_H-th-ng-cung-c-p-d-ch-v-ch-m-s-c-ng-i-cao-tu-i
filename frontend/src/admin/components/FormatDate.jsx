
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN'); // Hiển thị dạng dd/mm/yyyy
};

export default formatDate;