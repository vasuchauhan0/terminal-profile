import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.model.js';
import { authenticate, isAdmin } from '../middleware/auth.middleware.js';
import { upload } from '../config/s3.config.js';

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects (public can see published, admin sees all)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { status, featured, category, limit, page = 1 } = req.query;
    
    let query = {};
    
    // If not admin, only show published projects
    if (!req.headers.authorization) {
      query.status = 'published';
    } else {
      if (status) query.status = status;
    }
    
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;

    const limitNum = parseInt(limit) || 0;
    const skip = (parseInt(page) - 1) * limitNum;

    const projects = await Project.find(query)
      .sort({ order: 1, publishDate: -1 })
      .limit(limitNum)
      .skip(skip);

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      data: projects,
      pagination: limitNum ? {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      } : null
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    // Increment view count
    project.viewCount += 1;
    await project.save();

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin only)
router.post('/', authenticate, isAdmin, upload.single('thumbnail'), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('fullDescription').trim().notEmpty().withMessage('Full description is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }

    const projectData = {
      ...req.body,
      technologies: req.body.technologies ? JSON.parse(req.body.technologies) : [],
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      images: req.body.images ? JSON.parse(req.body.images) : []
    };

    if (req.file) {
  // S3 URL is in req.file.location when using multer-s3
  projectData.thumbnailImage = req.file.location;
}

    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/:id', authenticate, isAdmin, upload.single('thumbnail'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    const updateData = {
      ...req.body
    };

    // Parse JSON fields if they exist
    if (req.body.technologies) {
      updateData.technologies = JSON.parse(req.body.technologies);
    }
    if (req.body.tags) {
      updateData.tags = JSON.parse(req.body.tags);
    }
    if (req.body.images) {
      updateData.images = JSON.parse(req.body.images);
    }

    if (req.file) {
  updateData.thumbnailImage = req.file.location;  // ← CORRECT variable name
}

    Object.assign(project, updateData);
    await project.save();

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    await project.deleteOne();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   PATCH /api/projects/:id/toggle-featured
// @desc    Toggle featured status
// @access  Private (Admin only)
router.patch('/:id/toggle-featured', authenticate, isAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: project
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

export default router;
