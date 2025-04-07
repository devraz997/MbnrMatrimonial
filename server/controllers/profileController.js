const Profile = require('../models/Profile');
const User = require('../models/User');
const Connection = require('../models/Connection');

// @desc    Create or update user profile
// @route   POST /api/profiles
// @access  Private
exports.createProfile = async (req, res) => {
  try {
    // Check if profile already exists
    let profile = await Profile.findOne({ user: req.user._id });
    
    if (profile) {
      return res.status(400).json({ message: 'Profile already exists. Use PUT to update.' });
    }
    
    // Create new profile
    profile = new Profile({
      user: req.user._id,
      ...req.body
    });
    
    await profile.save();
    
    // Update user's isProfileComplete status
    await User.findByIdAndUpdate(req.user._id, { isProfileComplete: true });
    
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get current user's profile
// @route   GET /api/profiles/me
// @access  Private
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate('user', 'name email gender dob');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get profile by user ID
// @route   GET /api/profiles/:id
// @access  Private
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.id }).populate('user', 'name email gender dob');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    // Check if profile is public or if user is viewing their own profile
    if (profile.profileVisibility === 'private' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'This profile is private' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profiles
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found. Create a profile first.' });
    }
    
    // Update profile fields
    profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Search profiles
// @route   GET /api/profiles/search
// @access  Private
exports.searchProfiles = async (req, res) => {
  try {
    const {
      gender,
      ageMin,
      ageMax,
      religion,
      caste,
      maritalStatus,
      location,
      page = 1,
      limit = 10
    } = req.query;
    
    // Build query
    const query = {};
    
    // Only show profiles that are not private
    query.profileVisibility = { $ne: 'private' };
    
    // Filter by gender
    if (gender) {
      // Find users with the specified gender
      const users = await User.find({ gender }).select('_id');
      const userIds = users.map(user => user._id);
      query.user = { $in: userIds };
    }
    
    // Filter by religion
    if (religion) {
      query.religion = { $regex: religion, $options: 'i' };
    }
    
    // Filter by caste
    if (caste) {
      query.caste = { $regex: caste, $options: 'i' };
    }
    
    // Filter by marital status
    if (maritalStatus) {
      query.maritalStatus = maritalStatus;
    }
    
    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const profiles = await Profile.find(query)
      .populate('user', 'name gender dob')
      .skip(skip)
      .limit(parseInt(limit));
    
    // Filter by age if provided
    let filteredProfiles = profiles;
    
    if (ageMin || ageMax) {
      filteredProfiles = profiles.filter(profile => {
        const birthDate = new Date(profile.user.dob);
        const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        
        if (ageMin && ageMax) {
          return age >= parseInt(ageMin) && age <= parseInt(ageMax);
        } else if (ageMin) {
          return age >= parseInt(ageMin);
        } else if (ageMax) {
          return age <= parseInt(ageMax);
        }
        
        return true;
      });
    }
    
    // Get total count for pagination
    const totalProfiles = await Profile.countDocuments(query);
    
    res.json({
      profiles: filteredProfiles,
      page: parseInt(page),
      pages: Math.ceil(totalProfiles / parseInt(limit)),
      total: totalProfiles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Send connection request
// @route   POST /api/profiles/connect/:id
// @access  Private
exports.sendConnectionRequest = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    
    // Check if receiver exists
    const receiver = await User.findById(receiverId);
    
    if (!receiver) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if sender is trying to connect with themselves
    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: 'You cannot send a connection request to yourself' });
    }
    
    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    });
    
    if (existingConnection) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }
    
    // Create new connection
    const connection = new Connection({
      sender: senderId,
      receiver: receiverId,
      message: req.body.message || 'I would like to connect with you'
    });
    
    await connection.save();
    
    res.status(201).json(connection);
  } catch (error) {
    console.error(error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Connection request already sent' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Respond to connection request
// @route   PUT /api/profiles/connect/:id
// @access  Private
exports.respondToConnectionRequest = async (req, res) => {
  try {
    const connectionId = req.params.id;
    const { status } = req.body;
    
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be accepted or rejected' });
    }
    
    // Find connection
    const connection = await Connection.findById(connectionId);
    
    if (!connection) {
      return res.status(404).json({ message: 'Connection request not found' });
    }
    
    // Check if user is the receiver of the connection request
    if (connection.receiver.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to respond to this connection request' });
    }
    
    // Update connection status
    connection.status = status;
    await connection.save();
    
    res.json(connection);
  } catch (error) {
    console.error(error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Connection request not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get user's connections
// @route   GET /api/profiles/connections/me
// @access  Private
exports.getMyConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Find all connections where user is either sender or receiver
    const connections = await Connection.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ]
    })
      .populate('sender', 'name')
      .populate('receiver', 'name');
    
    // Separate connections by status
    const sent = connections.filter(conn => conn.sender.toString() === userId.toString() && conn.status === 'pending');
    const received = connections.filter(conn => conn.receiver.toString() === userId.toString() && conn.status === 'pending');
    const accepted = connections.filter(conn => conn.status === 'accepted');
    const rejected = connections.filter(conn => conn.receiver.toString() === userId.toString() && conn.status === 'rejected');
    
    res.json({
      sent,
      received,
      accepted,
      rejected
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
