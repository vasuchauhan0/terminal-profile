import api from '../utils/api';

export const profileService = {
  // Get profile (public)
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  // Update profile (admin)
  update: async (profileData) => {
    const formData = new FormData();
    
    Object.keys(profileData).forEach(key => {
      if (key === 'socialLinks' || key === 'experience' || key === 'education' || key === 'seoKeywords') {
        formData.append(key, JSON.stringify(profileData[key]));
      } else if (profileData[key] !== null && profileData[key] !== undefined) {
        formData.append(key, profileData[key]);
      }
    });

    const response = await api.put('/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Add experience (admin)
  addExperience: async (experienceData) => {
    const response = await api.post('/profile/experience', experienceData);
    return response.data;
  },

  // Update experience (admin)
  updateExperience: async (id, experienceData) => {
    const response = await api.put(`/profile/experience/${id}`, experienceData);
    return response.data;
  },

  // Delete experience (admin)
  deleteExperience: async (id) => {
    const response = await api.delete(`/profile/experience/${id}`);
    return response.data;
  },

  // Add education (admin)
  addEducation: async (educationData) => {
    const response = await api.post('/profile/education', educationData);
    return response.data;
  },

  // Update education (admin)
  updateEducation: async (id, educationData) => {
    const response = await api.put(`/profile/education/${id}`, educationData);
    return response.data;
  },

  // Delete education (admin)
  deleteEducation: async (id) => {
    const response = await api.delete(`/profile/education/${id}`);
    return response.data;
  }
};

export default profileService;
