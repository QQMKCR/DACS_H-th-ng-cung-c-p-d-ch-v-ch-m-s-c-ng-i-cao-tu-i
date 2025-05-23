import express from 'express';
import {
  getAllEvaluations,
  getEvaluationCount,
  getEvaluationByOrderId,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from '../controllers/evaluationController.js';

const router = express.Router();

router.get('/', getAllEvaluations);
router.get('/count', getEvaluationCount);
router.get('/:MaDonDat', getEvaluationByOrderId);
router.post('/', createEvaluation);
router.put('/:MaDonDat', updateEvaluation);
router.delete('/:MaDonDat', deleteEvaluation);

export default router;
