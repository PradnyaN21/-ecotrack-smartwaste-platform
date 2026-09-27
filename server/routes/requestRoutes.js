const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateStatus,
  getStatistics,
  getCollectionWaves,
  getCollectionWaveById,
} = require('../controllers/requestController');

router.post('/requests', createRequest);
router.get('/requests', getRequests);
router.get('/requests/:requestId', getRequestById);
router.patch('/requests/:requestId/status', updateStatus);

// EcoFlow Intelligence Routes
router.get('/waves', getCollectionWaves);
router.get('/waves/:waveId', getCollectionWaveById);
router.get('/statistics', getStatistics);

module.exports = router;
