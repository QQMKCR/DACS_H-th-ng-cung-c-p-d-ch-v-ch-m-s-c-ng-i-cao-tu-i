import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const evaluationRouters = {
  getEvaluationCount() {
    return apiClient.get('/evaluations/count');
  },
    getEvaluations() {
        return apiClient.get('/evaluations');
  },
    getEvaluation(MaDonDat) {
        return apiClient.get(`/evaluations/${MaDonDat}`);
    },
    createEvaluation(evaluation) {
        return apiClient.post('/evaluations', evaluation);
    },
    updateEvaluation(MaDonDat, evaluation) {
        return apiClient.put(`/evaluations/${MaDonDat}`, evaluation);
    },
    deleteEvaluation(MaDonDat) {
        return apiClient.delete(`/evaluations/${MaDonDat}`);
    }
};

export default evaluationRouters;
