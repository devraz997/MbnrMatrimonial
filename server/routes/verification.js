const express = require('express');
const router = express.Router();
const { 
  submitVerification,
  getVerificationStatus,
  getPendingVerifications,
  processVerification
} = require('../controllers/verificationController');
const { protect, admin } = require('../middleware/auth');

// User routes
router.post('/', protect, submitVerification);
router.get('/status', protect, getVerificationStatus);

// Admin routes
router.get('/pending', protect, admin, getPendingVerifications);
router.put('/:id', protect, admin, processVerification);

module.exports = router;
