const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled'],
      default: 'pending'
    },
    message: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Ensure a user can't send multiple connection requests to the same person
connectionSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;
