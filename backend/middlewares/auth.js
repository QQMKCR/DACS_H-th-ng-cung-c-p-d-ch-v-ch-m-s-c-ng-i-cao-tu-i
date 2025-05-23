
import { expressjwt } from 'express-jwt';

export const authJwt = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
}).unless({ path: ['/accountUsers/login', '/accountUsers/register', '/accountEmployees/register'] });

export const checkRole = (allowedRoles) => (req, res, next) => {
  const userRole = req.user?.role;
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Cấm truy cập: Quyền không đủ' });
  }
  next();
};

export const checkAccountType = (allowedTypes) => (req, res, next) => {
  const accountType = req.user?.type;
  if (!allowedTypes.includes(accountType)) {
    return res.status(403).json({ message: 'Cấm truy cập: Loại tài khoản không hợp lệ' });
  }
  next();
};