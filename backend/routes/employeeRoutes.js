import express from 'express';
import {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByPosition,
    getEmployeeByDegree,
    getEmployeeCount,
    createEmployee,
    updateEmployee,
    detailEmployee,
    deleteEmployee
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/count', getEmployeeCount); // Lấy số lượng nhân viên   
router.get('/', getAllEmployees);
router.get('/detail/:MaNV', detailEmployee);
router.get('/position/:NgheNghiep', getEmployeeByPosition); 
router.get('/degree/:BangCap', getEmployeeByDegree);       
router.get('/:MaNV', getEmployeeById);                  
router.post('/', createEmployee);
router.put('/:MaNV', updateEmployee);
router.delete('/:MaNV', deleteEmployee);


export default router;
