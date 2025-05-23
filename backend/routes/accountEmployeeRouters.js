import express from 'express';
import {
  getAllAccountEmployees,
  getAccountEmployeeById,
  getAccountEmployeeCount,
  createAccountEmployee,
  updateAccountEmployee,
  deleteAccountEmployee
} from '../controllers/accountEmployeeController.js';

const router = express.Router();

router.get('/count', getAccountEmployeeCount); // Lấy số lượng tài khoản nhân viên
router.get('/', getAllAccountEmployees);
router.get('/:MaTKNV', getAccountEmployeeById);
router.post('/', createAccountEmployee);
router.put('/:MaTKNV', updateAccountEmployee);
router.delete('/:MaTKNV', deleteAccountEmployee);

export default router;
