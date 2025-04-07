const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    // Basic Information
    height: {
      type: String,
      required: [true, 'Height is required']
    },
    maritalStatus: {
      type: String,
      required: [true, 'Marital status is required'],
      enum: ['Never Married', 'Divorced', 'Widowed', 'Separated']
    },
    religion: {
      type: String,
      required: [true, 'Religion is required']
    },
    caste: {
      type: String
    },
    motherTongue: {
      type: String
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    },
    
    // Education & Career
    education: {
      type: String,
      required: [true, 'Education is required']
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required']
    },
    company: {
      type: String
    },
    income: {
      type: String
    },
    
    // About & Lifestyle
    about: {
      type: String,
      required: [true, 'About section is required'],
      maxlength: [1000, 'About section cannot exceed 1000 characters']
    },
    interests: {
      type: [String]
    },
    
    // Family Details
    familyDetails: {
      fatherOccupation: String,
      motherOccupation: String,
      siblings: String,
      familyType: {
        type: String,
        enum: ['Joint', 'Nuclear']
      },
      familyValues: {
        type: String,
        enum: ['Traditional', 'Moderate', 'Liberal']
      }
    },
    
    // Partner Preferences
    partnerPreferences: {
      ageRange: {
        min: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        }
      },
      heightRange: {
        min: String,
        max: String
      },
      maritalStatus: {
        type: [String],
        default: ['Never Married']
      },
      education: String,
      occupation: String,
      religion: String,
      caste: String,
      location: String
    },
    
    // Profile Visibility
    profileVisibility: {
      type: String,
      enum: ['public', 'private', 'members'],
      default: 'members'
    },
    
    // Profile Photo
    profilePhoto: {
      type: String,
      default: 'default-profile.jpg'
    },
    
    // Additional Photos
    photos: {
      type: [String],
      default: []
    },
    
    // Profile Status
    isActive: {
      type: Boolean,
      default: true
    },
    
    // Verification Status
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
