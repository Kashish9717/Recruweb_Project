import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema);
