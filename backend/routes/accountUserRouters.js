import express from 'express';
import{
    getAllAccountUsers,
    getAccountUserById,
    getAccountUserCount,
    createAccountUser,
    updateAccountUser,
    deleteAccountUser
} from '../controllers/accountUserController.js';

const router = express.Router();

router.get('/count', getAccountUserCount);
router.get('/', getAllAccountUsers);
router.get('/:MaTKND', getAccountUserById);
router.post('/', createAccountUser);
router.put('/:MaTKND', updateAccountUser);
router.delete('/:MaTKND', deleteAccountUser);

export default router;