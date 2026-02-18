import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools', 'Other'],
    default: 'Other'
  },
  proficiency: {
    type: Number,
    required: [true, 'Proficiency level is required'],
    min: [0, 'Proficiency cannot be less than 0'],
    max: [100, 'Proficiency cannot exceed 100'],
    default: 50
  },
  icon: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#00ff41'
  }
}, {
  timestamps: true
});

// Index for better query performance
skillSchema.index({ category: 1, order: 1 });
skillSchema.index({ isActive: 1 });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
