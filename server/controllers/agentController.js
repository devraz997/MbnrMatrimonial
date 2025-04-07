const Agent = require('../models/Agent');
const User = require('../models/User');
const Profile = require('../models/Profile');

// @desc    Register as an agent
// @route   POST /api/agents
// @access  Private
exports.registerAsAgent = async (req, res) => {
  try {
    // Check if user is already registered as an agent
    const existingAgent = await Agent.findOne({ user: req.user._id });
    
    if (existingAgent) {
      return res.status(400).json({ message: 'You are already registered as an agent' });
    }
    
    // Create new agent profile
    const agent = new Agent({
      user: req.user._id,
      ...req.body
    });
    
    await agent.save();
    
    // Update user type
    await User.findByIdAndUpdate(req.user._id, { userType: 'agent' });
    
    res.status(201).json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all agents
// @route   GET /api/agents
// @access  Public
exports.getAgents = async (req, res) => {
  try {
    const { 
      specialization, 
      location, 
      rating,
      verified,
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (specialization) {
      query.specialization = { $in: specialization.split(',') };
    }
    
    if (location) {
      query.servingAreas = { $in: location.split(',') };
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }
    
    if (verified === 'true') {
      query.isVerified = true;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const agents = await Agent.find(query)
      .populate('user', 'name')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rating: -1 });
    
    // Get total count for pagination
    const totalAgents = await Agent.countDocuments(query);
    
    res.json({
      agents,
      page: parseInt(page),
      pages: Math.ceil(totalAgents / parseInt(limit)),
      total: totalAgents
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get agent by ID
// @route   GET /api/agents/:id
// @access  Public
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id)
      .populate('user', 'name email')
      .populate('reviews.userId', 'name');
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.json(agent);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update agent profile
// @route   PUT /api/agents
// @access  Private (Agent only)
exports.updateAgentProfile = async (req, res) => {
  try {
    let agent = await Agent.findOne({ user: req.user._id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent profile not found' });
    }
    
    // Update agent profile
    agent = await Agent.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(agent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a review for an agent
// @route   POST /api/agents/:id/reviews
// @access  Private
exports.addAgentReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const agent = await Agent.findById(req.params.id);
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    
    // Check if user has already reviewed this agent
    const alreadyReviewed = agent.reviews.find(
      review => review.userId.toString() === req.user._id.toString()
    );
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this agent' });
    }
    
    // Add review
    const review = {
      userId: req.user._id,
      rating: Number(rating),
      comment,
      date: Date.now()
    };
    
    agent.reviews.push(review);
    
    // Calculate average rating
    agent.rating = agent.reviews.reduce((acc, item) => item.rating + acc, 0) / agent.reviews.length;
    
    await agent.save();
    
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get agent's clients
// @route   GET /api/agents/clients
// @access  Private (Agent only)
exports.getAgentClients = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user._id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent profile not found' });
    }
    
    // Get client profiles
    const clientProfiles = await Profile.find({ user: { $in: agent.clients } })
      .populate('user', 'name email gender dob');
    
    res.json(clientProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Add a client to agent
// @route   POST /api/agents/clients/:userId
// @access  Private (Agent only)
exports.addClient = async (req, res) => {
  try {
    const agent = await Agent.findOne({ user: req.user._id });
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent profile not found' });
    }
    
    const userId = req.params.userId;
    
    // Check if user exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is already a client
    if (agent.clients.includes(userId)) {
      return res.status(400).json({ message: 'User is already your client' });
    }
    
    // Add client
    agent.clients.push(userId);
    agent.clientCount = agent.clients.length;
    
    await agent.save();
    
    res.status(200).json({ message: 'Client added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
