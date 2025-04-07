const express = require('express');
const router = express.Router();
const { 
  registerAsAgent,
  getAgents,
  getAgentById,
  updateAgentProfile,
  addAgentReview,
  getAgentClients,
  addClient
} = require('../controllers/agentController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getAgents);
router.get('/:id', getAgentById);

// Protected routes
router.post('/', protect, registerAsAgent);
router.put('/', protect, updateAgentProfile);
router.post('/:id/reviews', protect, addAgentReview);

// Agent-only routes
router.get('/clients', protect, getAgentClients);
router.post('/clients/:userId', protect, addClient);

module.exports = router;
