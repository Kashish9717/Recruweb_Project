import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  jobType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
    required: true
  },
  experience: {
    type: String,
    enum: ['fresher', '1-2 years', '3-5 years', '5-10 years', '10+ years'],
    required: true
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'INR' }
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  requirements: [{
    type: String
  }],
  responsibilities: [{
    type: String
  }],
  skills: [{
    type: String
  }],
  qualifications: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  openings: {
    type: Number,
    default: 1
  },
  department: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  applyUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
});

jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

export default mongoose.model('Job', jobSchema);
