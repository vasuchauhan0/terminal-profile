import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  fullDescription: {
    type: String,
    required: [true, 'Full description is required'],
    trim: true
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    enum: ['Web Development', 'Mobile App', 'Desktop App', 'AI/ML', 'Data Science', 'Other'],
    default: 'Web Development'
  },
  images: [{
    url: String,
    alt: String
  }],
  thumbnailImage: {
    type: String,
    default: ''
  },
  liveUrl: {
    type: String,
    trim: true,
    default: ''
  },
  githubUrl: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  viewCount: {
    type: Number,
    default: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ status: 1, publishDate: -1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ tags: 1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;
