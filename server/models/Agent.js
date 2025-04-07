const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    businessName: {
      type: String,
      required: [true, 'Business name is required']
    },
    experience: {
      type: Number,
      required: [true, 'Years of experience is required']
    },
    specialization: {
      type: [String],
      default: []
    },
    servingAreas: {
      type: [String],
      required: [true, 'At least one serving area is required']
    },
    contactInfo: {
      phone: {
        type: String,
        required: [true, 'Contact phone is required']
      },
      email: {
        type: String,
        required: [true, 'Contact email is required']
      },
      address: {
        type: String
      }
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    clientCount: {
      type: Number,
      default: 0
    },
    successfulMatches: {
      type: Number,
      default: 0
    },
    verificationDocuments: {
      type: [String],
      default: []
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5
        },
        comment: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
