import mongoose from "mongoose";

const getStartedSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },

  // ✅ IMPORTANT FIX
  employees: {
    type: String,
    required: true
  },

  services: [
    {
      type: String
    }
  ],

  message: {
    type: String
  },

  status: {
    type: String,
    enum: ["new", "contacted", "in-progress", "completed", "cancelled"],
    default: "new"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("GetStarted", getStartedSchema);