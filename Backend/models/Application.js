import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  resume: {
    type: String,
    trim: true
  },
  linkedIn: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  currentCompany: {
    type: String,
    trim: true
  },
  currentPosition: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'interview', 'offered', 'rejected'],
    default: 'new'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Application', applicationSchema);
