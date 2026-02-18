import express from 'express';
import { body, validationResult } from 'express-validator';
import Profile from '../models/Profile.model.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';
import { upload } from '../config/s3.config.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Get profile (public)
// @access  Public
router.get('/', async (req, res) => {
  try {
    let profile = await Profile.findOne({ isActive: true });

    if (!profile) {
      // Create default profile if none exists
      profile = new Profile({
        fullName: 'Your Name',
        title: 'Full Stack Developer',
        email: 'your.email@example.com',
        bio: 'Your bio here...',
        about: 'About yourself here...'
      });
      await profile.save();
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private (Admin only)
router.put('/', authenticate, isAdmin, upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 }
]), async (req, res) => {
  try {
    let profile = await Profile.findOne();

    const updateData = { ...req.body };

    // Parse JSON fields if they exist
    if (req.body.socialLinks) {
      updateData.socialLinks = JSON.parse(req.body.socialLinks);
    }
    if (req.body.experience) {
      updateData.experience = JSON.parse(req.body.experience);
    }
    if (req.body.education) {
      updateData.education = JSON.parse(req.body.education);
    }
    if (req.body.seoKeywords) {
      updateData.seoKeywords = JSON.parse(req.body.seoKeywords);
    }

    // Handle file uploads
    if (req.files) {
      if (req.files.profileImage) {
        updateData.profileImage = `/uploads/profiles/${req.files.profileImage[0].filename}`;
      }
      if (req.files.coverImage) {
        updateData.coverImage = `/uploads/profiles/${req.files.coverImage[0].filename}`;
      }
      if (req.files.resume) {
        updateData.resumeUrl = `/uploads/resumes/${req.files.resume[0].filename}`;
      }
    }

    if (!profile) {
      // Create new profile
      profile = new Profile(updateData);
      await profile.save();
    } else {
      // Update existing profile
      Object.assign(profile, updateData);
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/profile/experience
// @desc    Add experience entry
// @access  Private (Admin only)
router.post('/experience', authenticate, isAdmin, [
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('position').trim().notEmpty().withMessage('Position is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    profile.experience.push(req.body);
    await profile.save();

    res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: profile
    });
  } catch (error) {
    console.error('Add experience error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/profile/experience/:id
// @desc    Update experience entry
// @access  Private (Admin only)
router.put('/experience/:id', authenticate, isAdmin, async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    const experience = profile.experience.id(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
    }

    Object.assign(experience, req.body);
    await profile.save();

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/profile/experience/:id
// @desc    Delete experience entry
// @access  Private (Admin only)
router.delete('/experience/:id', authenticate, isAdmin, async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    profile.experience.id(req.params.id).deleteOne();
    await profile.save();

    res.json({
      success: true,
      message: 'Experience deleted successfully',
      data: profile
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/profile/education
// @desc    Add education entry
// @access  Private (Admin only)
router.post('/education', authenticate, isAdmin, [
  body('institution').trim().notEmpty().withMessage('Institution name is required'),
  body('degree').trim().notEmpty().withMessage('Degree is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    profile.education.push(req.body);
    await profile.save();

    res.status(201).json({
      success: true,
      message: 'Education added successfully',
      data: profile
    });
  } catch (error) {
    console.error('Add education error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/profile/education/:id
// @desc    Update education entry
// @access  Private (Admin only)
router.put('/education/:id', authenticate, isAdmin, async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    const education = profile.education.id(req.params.id);
    
    if (!education) {
      return res.status(404).json({ 
        success: false, 
        message: 'Education not found' 
      });
    }

    Object.assign(education, req.body);
    await profile.save();

    res.json({
      success: true,
      message: 'Education updated successfully',
      data: profile
    });
  } catch (error) {
    console.error('Update education error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/profile/education/:id
// @desc    Delete education entry
// @access  Private (Admin only)
router.delete('/education/:id', authenticate, isAdmin, async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({ 
        success: false, 
        message: 'Profile not found' 
      });
    }

    profile.education.id(req.params.id).deleteOne();
    await profile.save();

    res.json({
      success: true,
      message: 'Education deleted successfully',
      data: profile
    });
  } catch (error) {
    console.error('Delete education error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;
