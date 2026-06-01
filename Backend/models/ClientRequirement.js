import mongoose from 'mongoose';

const clientRequirementSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  hrName: {
    type: String,
    required: [true, 'HR name is required'],
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
    trim: true
  },
  jobRole: {
    type: String,
    trim: true
  },
  openings: {
    type: Number,
    default: 0
  },
  salary: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  employmentType: {
    type: String,
    trim: true
  },
  skillsRequired: {
    type: String,
    trim: true
  },
  joiningTimeline: {
    type: String,
    trim: true
  },
  jobDescription: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'cancelled'],
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

export default mongoose.model('ClientRequirement', clientRequirementSchema);
