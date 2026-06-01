import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  logo: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    required: [true, 'Industry is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  website: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
    required: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  founded: {
    type: Number
  },
  specialties: [{
    type: String
  }],
  hiringFor: [{
    type: String
  }],
  activeJobs: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

companySchema.index({ name: 'text', description: 'text', industry: 'text' });

export default mongoose.model('Company', companySchema);
