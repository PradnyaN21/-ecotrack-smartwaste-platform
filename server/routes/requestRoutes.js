const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateStatus,
  getStatistics,
} = require('../controllers/requestController');

router.post('/requests', createRequest);
router.get('/requests', getRequests);
router.get('/requests/:requestId', getRequestById);
router.patch('/requests/:requestId/status', updateStatus);
router.get('/statistics', getStatistics);

module.exports = router;
