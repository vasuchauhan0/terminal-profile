import api from '../utils/api';

export const skillService = {
  // Get all skills
  getAll: async (params = {}) => {
    const response = await api.get('/skills', { params });
    return response.data;
  },

  // Get skill by ID
  getById: async (id) => {
    const response = await api.get(`/skills/${id}`);
    return response.data;
  },

  // Create skill
  create: async (skillData) => {
    const response = await api.post('/skills', skillData);
    return response.data;
  },

  // Update skill
  update: async (id, skillData) => {
    const response = await api.put(`/skills/${id}`, skillData);
    return response.data;
  },

  // Delete skill
  delete: async (id) => {
    const response = await api.delete(`/skills/${id}`);
    return response.data;
  },

  // Toggle active status
  toggleActive: async (id) => {
    const response = await api.patch(`/skills/${id}/toggle-active`);
    return response.data;
  }
};

export default skillService;
