import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
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
  city: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  skills: {
    type: String,
    trim: true
  },
  expectedSalary: {
    type: String,
    trim: true
  },
  preferredLocation: {
    type: String,
    trim: true
  },
  currentCompany: {
    type: String,
    trim: true
  },
  resumeUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  notes: {
  type: String,
  trim: true
},

assignedTo: {
  type: String,
  trim: true
}
});

export default mongoose.model('Candidate', candidateSchema);
