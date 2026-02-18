import express from 'express';
import { body, validationResult } from 'express-validator';
import Skill from '../models/Skill.model.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, isActive } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const skills = await Skill.find(query).sort({ category: 1, order: 1, name: 1 });

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: skills,
      grouped: groupedSkills
    });
  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/skills/:id
// @desc    Get skill by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    console.error('Get skill error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/skills
// @desc    Create new skill
// @access  Private (Admin only)
router.post('/', authenticate, isAdmin, [
  body('name').trim().notEmpty().withMessage('Skill name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('proficiency').isInt({ min: 0, max: 100 }).withMessage('Proficiency must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    // Check if skill already exists
    const existingSkill = await Skill.findOne({ name: req.body.name });
    if (existingSkill) {
      return res.status(400).json({ 
        success: false, 
        message: 'Skill already exists' 
      });
    }

    const skill = new Skill(req.body);
    await skill.save();

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: skill
    });
  } catch (error) {
    console.error('Create skill error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/skills/:id
// @desc    Update skill
// @access  Private (Admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    // Check if name is being changed and already exists
    if (req.body.name && req.body.name !== skill.name) {
      const existingSkill = await Skill.findOne({ name: req.body.name });
      if (existingSkill) {
        return res.status(400).json({ 
          success: false, 
          message: 'Skill name already exists' 
        });
      }
    }

    Object.assign(skill, req.body);
    await skill.save();

    res.json({
      success: true,
      message: 'Skill updated successfully',
      data: skill
    });
  } catch (error) {
    console.error('Update skill error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/skills/:id
// @desc    Delete skill
// @access  Private (Admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    await skill.deleteOne();

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    console.error('Delete skill error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PATCH /api/skills/:id/toggle-active
// @desc    Toggle active status
// @access  Private (Admin only)
router.patch('/:id/toggle-active', authenticate, isAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ 
        success: false, 
        message: 'Skill not found' 
      });
    }

    skill.isActive = !skill.isActive;
    await skill.save();

    res.json({
      success: true,
      message: `Skill ${skill.isActive ? 'activated' : 'deactivated'} successfully`,
      data: skill
    });
  } catch (error) {
    console.error('Toggle active error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;
