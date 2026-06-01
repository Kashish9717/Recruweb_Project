import Message from '../models/Message.js';

export const saveMessage = async (req, res) => {
  try {
    const { sessionId, role, content, metadata } = req.body;

    const message = await Message.create({
      sessionId,
      role,
      content,
      metadata
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to save message',
      error: error.message
    });
  }
};

export const getMessagesBySession = async (req, res) => {
  try {
    const messages = await Message.find({ sessionId: req.params.sessionId })
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
      error: error.message
    });
  }
};

export const clearSessionMessages = async (req, res) => {
  try {
    await Message.deleteMany({ sessionId: req.params.sessionId });
    res.status(200).json({
      success: true,
      message: 'Session messages cleared'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to clear messages',
      error: error.message
    });
  }
};
