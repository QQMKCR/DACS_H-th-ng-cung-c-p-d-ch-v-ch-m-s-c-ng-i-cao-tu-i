import express from 'express';
import{
    getAllInvoices,
    updateInvoiceForOrder,
    createInvoiceForOrder,
    getTotalRevenue
} from '../controllers/invoiceController.js';

const router = express.Router();

router.get('/total', getTotalRevenue);
router.get('/total/:MaDonDat', getTotalRevenue)
router.get('/',getAllInvoices);
router.post('/:MaDonDat',createInvoiceForOrder);
router.put('/:MaDonDat', updateInvoiceForOrder);

export default router;