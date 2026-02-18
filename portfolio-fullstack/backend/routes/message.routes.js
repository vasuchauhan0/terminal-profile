import express from 'express';
import { body, validationResult } from 'express-validator';
import Message from '../models/Message.model.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST /api/messages
// @desc    Submit contact form message
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const messageData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    };

    const message = new Message(messageData);
    await message.save();

    // TODO: Send email notification to admin
    // You can implement email sending here using nodemailer

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        id: message._id
      }
    });
  } catch (error) {
    console.error('Submit message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// @route   GET /api/messages
// @desc    Get all messages
// @access  Private (Admin only)
router.get('/', authenticate, isAdmin, async (req, res) => {
  try {
    const { status, isStarred, page = 1, limit = 20 } = req.query;
    
    let query = {};
    
    if (status) query.status = status;
    if (isStarred === 'true') query.isStarred = true;

    const limitNum = parseInt(limit);
    const skip = (parseInt(page) - 1) * limitNum;

    const messages = await Message.find(query)
      .sort({ isStarred: -1, createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Message.countDocuments(query);

    // Get stats
    const stats = {
      total: await Message.countDocuments(),
      unread: await Message.countDocuments({ status: 'unread' }),
      read: await Message.countDocuments({ status: 'read' }),
      replied: await Message.countDocuments({ status: 'replied' }),
      archived: await Message.countDocuments({ status: 'archived' }),
      starred: await Message.countDocuments({ isStarred: true })
    };

    res.json({
      success: true,
      data: messages,
      stats,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/messages/:id
// @desc    Get message by ID
// @access  Private (Admin only)
router.get('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    // Mark as read if unread
    if (message.status === 'unread') {
      message.status = 'read';
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PATCH /api/messages/:id/status
// @desc    Update message status
// @access  Private (Admin only)
router.patch('/:id/status', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.status = status;
    await message.save();

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: message
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PATCH /api/messages/:id/star
// @desc    Toggle star status
// @access  Private (Admin only)
router.patch('/:id/star', authenticate, isAdmin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.isStarred = !message.isStarred;
    await message.save();

    res.json({
      success: true,
      message: `Message ${message.isStarred ? 'starred' : 'unstarred'} successfully`,
      data: message
    });
  } catch (error) {
    console.error('Toggle star error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/messages/:id/notes
// @desc    Update admin notes
// @access  Private (Admin only)
router.put('/:id/notes', authenticate, isAdmin, async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    message.adminNotes = adminNotes;
    await message.save();

    res.json({
      success: true,
      message: 'Notes updated successfully',
      data: message
    });
  } catch (error) {
    console.error('Update notes error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/messages/:id
// @desc    Delete message
// @access  Private (Admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    await message.deleteOne();

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/messages/bulk
// @desc    Bulk delete messages
// @access  Private (Admin only)
router.post('/bulk/delete', authenticate, isAdmin, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid message IDs' 
      });
    }

    await Message.deleteMany({ _id: { $in: ids } });

    res.json({
      success: true,
      message: `${ids.length} message(s) deleted successfully`
    });
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;
