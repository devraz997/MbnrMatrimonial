const Verification = require('../models/Verification');
const User = require('../models/User');
const Agent = require('../models/Agent');

// @desc    Submit verification documents
// @route   POST /api/verification
// @access  Private
exports.submitVerification = async (req, res) => {
  try {
    // Check if user already has a pending verification
    const existingVerification = await Verification.findOne({
      user: req.user._id,
      status: 'pending'
    });
    
    if (existingVerification) {
      return res.status(400).json({ 
        message: 'You already have a pending verification request' 
      });
    }
    
    // Create new verification request
    const verification = new Verification({
      user: req.user._id,
      ...req.body
    });
    
    await verification.save();
    
    res.status(201).json({
      message: 'Verification documents submitted successfully',
      verification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user's verification status
// @route   GET /api/verification/status
// @access  Private
exports.getVerificationStatus = async (req, res) => {
  try {
    const verifications = await Verification.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(verifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all pending verifications
// @route   GET /api/verification/pending
// @access  Private/Admin
exports.getPendingVerifications = async (req, res) => {
  try {
    const verifications = await Verification.find({ status: 'pending' })
      .populate('user', 'name email userType')
      .sort({ createdAt: 1 });
    
    res.json(verifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Approve or reject verification
// @route   PUT /api/verification/:id
// @access  Private/Admin
exports.processVerification = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const verification = await Verification.findById(req.params.id);
    
    if (!verification) {
      return res.status(404).json({ message: 'Verification request not found' });
    }
    
    if (verification.status !== 'pending') {
      return res.status(400).json({ 
        message: `Verification has already been ${verification.status}` 
      });
    }
    
    // Update verification status
    verification.status = status;
    verification.verifiedBy = req.user._id;
    verification.verifiedAt = Date.now();
    
    if (status === 'rejected' && rejectionReason) {
      verification.rejectionReason = rejectionReason;
    }
    
    await verification.save();
    
    // If approved, update user's verification status
    if (status === 'approved') {
      await User.findByIdAndUpdate(verification.user, { isVerified: true });
      
      // If user is an agent, update agent verification status
      const agent = await Agent.findOne({ user: verification.user });
      if (agent) {
        agent.isVerified = true;
        await agent.save();
      }
    }
    
    res.json({
      message: `Verification ${status} successfully`,
      verification
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
