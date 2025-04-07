const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    documentType: {
      type: String,
      enum: ['id_card', 'passport', 'driver_license', 'business_license', 'other'],
      required: true
    },
    documentNumber: {
      type: String,
      required: true
    },
    documentImage: {
      type: String, // URL to the uploaded document
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    rejectionReason: {
      type: String
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedAt: {
      type: Date
    },
    expiresAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = Verification;
