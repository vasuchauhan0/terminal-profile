import api from '../utils/api';

export const projectService = {
  // Get all projects
  getAll: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get project by ID
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Create project
  create: async (projectData) => {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else if (projectData[key] !== null && projectData[key] !== undefined) {
        formData.append(key, projectData[key]);
      }
    });

    const response = await api.post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Update project
  update: async (id, projectData) => {
    const formData = new FormData();
    
    Object.keys(projectData).forEach(key => {
      if (Array.isArray(projectData[key])) {
        formData.append(key, JSON.stringify(projectData[key]));
      } else if (projectData[key] !== null && projectData[key] !== undefined) {
        formData.append(key, projectData[key]);
      }
    });

    const response = await api.put(`/projects/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Delete project
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Toggle featured
  toggleFeatured: async (id) => {
    const response = await api.patch(`/projects/${id}/toggle-featured`);
    return response.data;
  }
};

export default projectService;
