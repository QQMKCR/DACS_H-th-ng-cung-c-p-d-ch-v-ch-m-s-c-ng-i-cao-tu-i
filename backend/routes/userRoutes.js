import express from 'express';
import {
  getAllUsers,
  getUserById,
  getUserCount,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/count/', getUserCount);
router.get('/', getAllUsers);
router.get('/:MaND', getUserById);
router.post('/', createUser);
router.put('/:MaND', updateUser);
router.delete('/:MaND', deleteUser);

export default router;