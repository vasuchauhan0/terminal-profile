import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  RefreshCcw,
  Terminal,
  FolderOpen,
  Eye,
  Star,
  Upload,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { toast } from 'react-toastify';
import authService from '../services/auth.service';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    technologies: [],
    category: 'Web Development',
    thumbnailImage: '',
    liveUrl: '',
    githubUrl: '',
    status: 'draft',
    featured: false,
    tags: []
  });
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const categories = ['Web Development', 'Mobile App', 'Desktop App', 'AI/ML', 'Data Science', 'Other'];
  const statuses = ['draft', 'published', 'archived'];

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    fetchProjects();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/projects`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!formData.shortDescription.trim()) {
      toast.error('Short description is required');
      return;
    }
    if (!formData.fullDescription.trim()) {
      toast.error('Full description is required');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        toast.error('You must be logged in to add projects');
        return;
      }

      const url = editingProject
        ? `${API_URL}/projects/${editingProject._id}`
        : `${API_URL}/projects`;

      const method = editingProject ? 'PUT' : 'POST';

      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('fullDescription', formData.fullDescription);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('featured', formData.featured);
      
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      
      if (formData.liveUrl) formDataToSend.append('liveUrl', formData.liveUrl);
      if (formData.githubUrl) formDataToSend.append('githubUrl', formData.githubUrl);
      
      if (thumbnailFile) {
        formDataToSend.append('thumbnail', thumbnailFile);
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save project');
      }

      toast.success(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
      fetchProjects();
      closeForm();
    } catch (error) {
      console.error('Error saving project:', error);
      setSubmitError(error.message);
      toast.error(error.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      technologies: project.technologies || [],
      category: project.category || 'Web Development',
      thumbnailImage: project.thumbnailImage || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      status: project.status || 'draft',
      featured: project.featured || false,
      tags: project.tags || []
    });
    setThumbnailFile(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
      }

      setProjects(projects.filter(project => project._id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error(error.message || 'Failed to delete project');
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/projects/${project._id}/toggle-featured`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update project');
      }

      setProjects(projects.map(p =>
        p._id === project._id ? { ...p, featured: !p.featured } : p
      ));
      toast.success(`Project ${!project.featured ? 'featured' : 'unfeatured'}`);
    } catch (error) {
      toast.error(error.message || 'Failed to update project');
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      technologies: [],
      category: 'Web Development',
      thumbnailImage: '',
      liveUrl: '',
      githubUrl: '',
      status: 'draft',
      featured: false,
      tags: []
    });
    setTechInput('');
    setTagInput('');
    setThumbnailFile(null);
    setSubmitError('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index)
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setThumbnailFile(file);
      toast.success('File selected: ' + file.name);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'draft': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'archived': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const isLoggedIn = authService.isAuthenticated();

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-white text-xl mb-2">Authentication Required</p>
          <p className="text-[#8b8b8b]">Please login to access project management</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00ff41] font-mono animate-pulse text-lg">
          Loading projects...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5 text-[#00ff41]" />
            <span className="text-sm text-[#00ff41] uppercase tracking-widest font-mono">
              Projects Management
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#e8e8e8]">
            Portfolio Projects
          </h2>
          <p className="text-[#8b8b8b] mt-1">
            Manage your project portfolio and showcase your work
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchProjects}
            className="flex items-center gap-2 px-4 py-2 border border-[#2a2a2a] hover:bg-[#2a2a2a] text-white rounded-md transition"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-6 py-2 bg-[#00ff41] hover:bg-[#00d936] text-black rounded-md font-bold transition shadow-lg"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
          <p className="text-xs text-[#8b8b8b] mb-1">Total Projects</p>
          <p className="text-2xl font-bold">{projects.length}</p>
        </div>
        <div className="bg-[#151515] border border-green-400/30 rounded-lg p-4">
          <p className="text-xs text-green-400 mb-1">Published</p>
          <p className="text-2xl font-bold text-green-400">
            {projects.filter(p => p.status === 'published').length}
          </p>
        </div>
        <div className="bg-[#151515] border border-yellow-400/30 rounded-lg p-4">
          <p className="text-xs text-yellow-400 mb-1">Draft</p>
          <p className="text-2xl font-bold text-yellow-400">
            {projects.filter(p => p.status === 'draft').length}
          </p>
        </div>
        <div className="bg-[#151515] border border-[#00ff41]/30 rounded-lg p-4">
          <p className="text-xs text-[#00ff41] mb-1">Featured</p>
          <p className="text-2xl font-bold text-[#00ff41]">
            {projects.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-12 text-center">
          <FolderOpen className="w-16 h-16 mx-auto mb-4 text-[#8b8b8b]" />
          <h3 className="text-xl font-semibold mb-2 text-[#8b8b8b]">
            No projects yet
          </h3>
          <p className="text-[#6b6b6b] mb-6">
            Start by adding your first project using the button above
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff41] text-black rounded-md font-bold hover:bg-[#00d936] transition"
          >
            <Plus size={20} />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden hover:border-[#00ff41] transition-colors"
            >
              {project.thumbnailImage ? (
                <div className="aspect-video bg-[#1a1a1a] relative">
                  <img
                    src={`http://localhost:3000${project.thumbnailImage}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-5 h-5 fill-[#00ff41] text-[#00ff41]" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center relative">
                  <ImageIcon className="w-12 h-12 text-[#8b8b8b]" />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <Star className="w-5 h-5 fill-[#00ff41] text-[#00ff41]" />
                    </div>
                  )}
                </div>
              )}

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-white line-clamp-1 flex-1">
                    {project.title}
                  </h3>
                  <span className={`px-2 py-0.5 text-xs rounded border font-mono uppercase ml-2 whitespace-nowrap ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-[#8b8b8b] mb-3 line-clamp-2">
                  {project.shortDescription}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 text-xs bg-[#00ff41]/10 text-[#00ff41] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-[#8b8b8b]/10 text-[#8b8b8b] rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-[#6b6b6b] mb-3">
                  <span className="flex items-center gap-1">
                    <Eye size={12} />
                    {project.viewCount || 0}
                  </span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#2a2a2a]">
                  <button
                    onClick={() => handleToggleFeatured(project)}
                    className={`flex-1 px-3 py-1.5 text-xs rounded transition ${
                      project.featured
                        ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30'
                        : 'bg-[#2a2a2a] text-white border border-[#2a2a2a] hover:bg-[#3a3a3a]'
                    }`}
                  >
                    {project.featured ? 'Featured ⭐' : 'Feature'}
                  </button>
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1.5 hover:bg-[#00ff41]/10 text-[#00ff41] rounded transition"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-1.5 hover:bg-red-500/10 text-red-500 rounded transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FIXED MODAL - Proper Layout with No Overlap */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0e0f] border-2 border-[#00ff41] rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
            
            {/* Header - Fixed, Not Scrolling */}
            <div className="flex-shrink-0 bg-[#1a1f1e] px-6 py-4 border-b-2 border-[#00ff41] flex items-center justify-between rounded-t-lg">
              <h3 className="text-xl font-bold text-[#00ff41] flex items-center gap-2">
                {editingProject ? (
                  <>
                    <Edit size={20} />
                    Edit Project
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Add New Project
                  </>
                )}
              </h3>
              <button
                onClick={closeForm}
                className="p-2 hover:bg-[#2a2a2a] rounded-full transition text-[#8b8b8b] hover:text-white"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error Message - Outside Scroll Area */}
            {submitError && (
              <div className="flex-shrink-0 mx-6 mt-4 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-500 font-semibold">Error</p>
                  <p className="text-red-400 text-sm mt-1">{submitError}</p>
                </div>
              </div>
            )}

            {/* Form Content - Scrollable Area */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-5">
                  
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength="100"
                      className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                      placeholder="e.g., E-commerce Platform"
                    />
                  </div>

                  {/* Short Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Short Description <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleChange}
                      required
                      maxLength="200"
                      className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                      placeholder="One-line summary"
                    />
                    <p className="text-xs text-[#6b6b6b] mt-1">
                      {formData.shortDescription.length}/200
                    </p>
                  </div>

                  {/* Full Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Full Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="fullDescription"
                      value={formData.fullDescription}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none resize-none text-white"
                      placeholder="Detailed description..."
                    />
                  </div>

                  {/* Category & Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                      >
                        <option value="draft">DRAFT</option>
                        <option value="published">PUBLISHED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Technologies Used
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                        className="flex-1 bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-2.5 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                        placeholder="e.g., React, Node.js, MongoDB (press Enter or click Add)"
                      />
                      <button
                        type="button"
                        onClick={addTechnology}
                        className="px-5 py-2.5 bg-[#00ff41] text-black rounded-lg hover:bg-[#00d936] font-semibold whitespace-nowrap"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#00ff41]/10 text-[#00ff41] rounded-lg flex items-center gap-2 text-sm border border-[#00ff41]/30"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTechnology(index)}
                            className="hover:text-red-400 font-bold text-lg leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      {formData.technologies.length === 0 && (
                        <p className="text-xs text-[#6b6b6b]">No technologies added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Tags (for SEO)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-2.5 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                        placeholder="e.g., fullstack, ecommerce"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-5 py-2.5 bg-[#2a2a2a] text-white rounded-lg hover:bg-[#3a3a3a] whitespace-nowrap"
                      >
                        + Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-[#2a2a2a] text-white rounded-lg flex items-center gap-2 text-sm"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-red-400 font-bold text-lg leading-none"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                      Thumbnail Image (optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2.5 bg-[#2a2a2a] text-white rounded-lg cursor-pointer hover:bg-[#3a3a3a]">
                        <Upload size={16} />
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {thumbnailFile && (
                        <span className="text-sm text-[#00ff41]">✓ {thumbnailFile.name}</span>
                      )}
                    </div>
                    <p className="text-xs text-[#6b6b6b] mt-1">Max 5MB. JPG, PNG, GIF, WebP</p>
                  </div>

                  {/* URLs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                        Live Demo URL (optional)
                      </label>
                      <input
                        type="url"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                        placeholder="https://myproject.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#00ff41]">
                        GitHub Repository (optional)
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="w-full bg-[#151b1e] border-2 border-[#2a2a2a] rounded-lg px-4 py-3 focus:border-[#00ff41] focus:ring-2 focus:ring-[#00ff41]/20 outline-none text-white"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  </div>

                  {/* Featured */}
                  <div className="flex items-center gap-3 p-4 bg-[#151b1e] rounded-lg border-2 border-[#2a2a2a]">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 accent-[#00ff41]"
                      id="featured-check"
                    />
                    <label htmlFor="featured-check" className="text-sm font-medium text-white cursor-pointer">
                      ⭐ Feature this project on homepage
                    </label>
                  </div>

                </div>

                {/* Buttons - Inside Form but at bottom */}
                <div className="flex gap-3 mt-6 pt-6 border-t-2 border-[#2a2a2a]">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#00ff41] hover:bg-[#00d936] text-black px-6 py-3.5 rounded-lg font-bold"
                  >
                    <Save size={18} />
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="px-8 py-3.5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;