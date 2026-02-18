import api from '../utils/api';

export const messageService = {
  // Submit contact message (public)
  submit: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data;
  },

  // Get all messages (admin)
  getAll: async (params = {}) => {
    const response = await api.get('/messages', { params });
    return response.data;
  },

  // Get message by ID (admin)
  getById: async (id) => {
    const response = await api.get(`/messages/${id}`);
    return response.data;
  },

  // Update message status (admin)
  updateStatus: async (id, status) => {
    const response = await api.patch(`/messages/${id}/status`, { status });
    return response.data;
  },

  // Toggle star status (admin)
  toggleStar: async (id) => {
    const response = await api.patch(`/messages/${id}/star`);
    return response.data;
  },

  // Update admin notes (admin)
  updateNotes: async (id, adminNotes) => {
    const response = await api.put(`/messages/${id}/notes`, { adminNotes });
    return response.data;
  },

  // Delete message (admin)
  delete: async (id) => {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },

  // Bulk delete messages (admin)
  bulkDelete: async (ids) => {
    const response = await api.post('/messages/bulk/delete', { ids });
    return response.data;
  }
};

export default messageService;
