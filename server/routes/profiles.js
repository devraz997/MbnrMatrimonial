const express = require('express');
const router = express.Router();
const { 
  createProfile, 
  getMyProfile, 
  getProfileById, 
  updateProfile, 
  searchProfiles,
  sendConnectionRequest,
  respondToConnectionRequest,
  getMyConnections
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

// Profile routes
router.post('/', protect, createProfile);
router.get('/me', protect, getMyProfile);
router.get('/search', protect, searchProfiles);
router.get('/:id', protect, getProfileById);
router.put('/', protect, updateProfile);

// Connection routes
router.post('/connect/:id', protect, sendConnectionRequest);
router.put('/connect/:id', protect, respondToConnectionRequest);
router.get('/connections/me', protect, getMyConnections);

module.exports = router;
