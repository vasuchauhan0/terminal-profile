import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  RefreshCcw,
  Terminal,
  Wrench
} from "lucide-react";
import { toast } from 'react-toastify';
import skillService from '../services/skill.service';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 50,
    description: '',
    yearsOfExperience: 0,
    icon: '',
    color: '#00ff41',
    isActive: true
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Tools', 'Other'];

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillService.getAll();
      if (response.success) {
        setSkills(response.data);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingSkill) {
        await skillService.update(editingSkill._id, formData);
        toast.success('Skill updated successfully');
      } else {
        await skillService.create(formData);
        toast.success('Skill created successfully');
      }

      fetchSkills();
      closeForm();
    } catch (error) {
      console.error('Error saving skill:', error);
      toast.error(error.response?.data?.message || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      description: skill.description || '',
      yearsOfExperience: skill.yearsOfExperience || 0,
      icon: skill.icon || '',
      color: skill.color || '#00ff41',
      isActive: skill.isActive !== undefined ? skill.isActive : true
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    try {
      await skillService.delete(id);
      setSkills(skills.filter(skill => skill._id !== id));
      toast.success('Skill deleted successfully');
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const handleToggleActive = async (skill) => {
    try {
      await skillService.toggleActive(skill._id);
      setSkills(skills.map(s =>
        s._id === skill._id ? { ...s, isActive: !s.isActive } : s
      ));
      toast.success(`Skill ${!skill.isActive ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update skill');
    }
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Frontend',
      proficiency: 50,
      description: '',
      yearsOfExperience: 0,
      icon: '',
      color: '#00ff41',
      isActive: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-[#00ff41] font-mono animate-pulse text-lg">
          Loading skills...
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      
      {/* Header with Add Button - ALWAYS VISIBLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-5 h-5 text-[#00ff41]" />
            <span className="text-sm text-[#00ff41] uppercase tracking-widest font-mono">
              Skills Management
            </span>
          </div>
          <h2 className="text-3xl font-bold text-[#e8e8e8]">
            Technical Skills
          </h2>
          <p className="text-[#8b8b8b] mt-1">
            Manage your technical proficiencies and expertise
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchSkills}
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
            Add Skill
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
          <p className="text-xs text-[#8b8b8b] mb-1">Total Skills</p>
          <p className="text-2xl font-bold">{skills.length}</p>
        </div>
        <div className="bg-[#151515] border border-green-400/30 rounded-lg p-4">
          <p className="text-xs text-green-400 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-400">
            {skills.filter(s => s.isActive).length}
          </p>
        </div>
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
          <p className="text-xs text-[#8b8b8b] mb-1">Categories</p>
          <p className="text-2xl font-bold">{Object.keys(groupedSkills).length}</p>
        </div>
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
          <p className="text-xs text-[#8b8b8b] mb-1">Avg Proficiency</p>
          <p className="text-2xl font-bold">
            {skills.length > 0
              ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length)
              : 0}%
          </p>
        </div>
      </div>

      {/* Empty State OR Skills List */}
      {Object.keys(groupedSkills).length === 0 ? (
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-12 text-center">
          <Wrench className="w-16 h-16 mx-auto mb-4 text-[#8b8b8b]" />
          <h3 className="text-xl font-semibold mb-2 text-[#8b8b8b]">
            No skills added yet
          </h3>
          <p className="text-[#6b6b6b] mb-6">
            Start by adding your first skill using the button above
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff41] text-black rounded-md font-bold hover:bg-[#00d936] transition"
          >
            <Plus size={20} />
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden">
              <div className="bg-[#1a1a1a] px-6 py-3 border-b border-[#2a2a2a]">
                <h3 className="font-bold text-lg">{category}</h3>
                <p className="text-sm text-[#8b8b8b]">{categorySkills.length} skills</p>
              </div>

              <div className="divide-y divide-[#2a2a2a]">
                {categorySkills.map((skill) => (
                  <div
                    key={skill._id}
                    className={`p-4 hover:bg-[#1a1a1a] transition ${
                      !skill.isActive ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-white text-lg">
                            {skill.name}
                          </h4>
                          {!skill.isActive && (
                            <span className="px-2 py-0.5 text-xs bg-gray-500/20 text-gray-400 rounded border border-gray-500/30">
                              INACTIVE
                            </span>
                          )}
                        </div>

                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#8b8b8b]">Proficiency</span>
                            <span className="text-[#00ff41] font-mono font-bold">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                            <div
                              className="bg-[#00ff41] h-2 rounded-full transition-all"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>

                        {skill.description && (
                          <p className="text-sm text-[#8b8b8b] mb-2">{skill.description}</p>
                        )}

                        <div className="flex items-center gap-4 text-xs text-[#6b6b6b]">
                          {skill.yearsOfExperience > 0 && (
                            <span>{skill.yearsOfExperience} years experience</span>
                          )}
                          <span>Added {new Date(skill.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(skill)}
                          className={`px-3 py-1 text-sm rounded transition ${
                            skill.isActive
                              ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500/20'
                              : 'bg-green-500/10 text-green-500 border border-green-500/30 hover:bg-green-500/20'
                          }`}
                        >
                          {skill.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-2 hover:bg-[#00ff41]/10 text-[#00ff41] rounded transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(skill._id)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={closeForm}
        >
          <div
            className="bg-[#151515] border-2 border-[#00ff41] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#2a2a2a] px-6 py-4 border-b border-[#00ff41] flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#00ff41]">
                {editingSkill ? '✏️ Edit Skill' : '➕ Add New Skill'}
              </h3>
              <button
                onClick={closeForm}
                className="text-[#8b8b8b] hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 focus:border-[#00ff41] outline-none text-white"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 focus:border-[#00ff41] outline-none text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Proficiency * ({formData.proficiency}%)
                  </label>
                  <input
                    type="range"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full h-2 bg-[#2a2a2a] rounded-lg appearance-none cursor-pointer accent-[#00ff41]"
                  />
                  <div className="flex justify-between text-xs text-[#8b8b8b] mt-1">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 focus:border-[#00ff41] outline-none text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Color
                  </label>
                  <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full h-12 bg-[#0a0a0a] border border-[#2a2a2a] rounded cursor-pointer"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 focus:border-[#00ff41] outline-none resize-none text-white"
                    placeholder="Brief description of your experience with this skill"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-[#00ff41]">
                    Icon URL (optional)
                  </label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0a] border border-[#2a2a2a] rounded px-4 py-3 focus:border-[#00ff41] outline-none text-white"
                    placeholder="https://..."
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3 p-4 bg-[#0a0a0a] rounded border border-[#2a2a2a]">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 accent-[#00ff41]"
                  />
                  <div>
                    <label className="text-sm font-medium text-white cursor-pointer">
                      Active (show on frontend)
                    </label>
                    <p className="text-xs text-[#8b8b8b]">
                      Uncheck to hide this skill from visitors
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#2a2a2a]">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#00ff41] hover:bg-[#00d936] text-black px-6 py-3 rounded font-bold transition"
                >
                  <Save size={18} />
                  {editingSkill ? 'Update Skill' : 'Create Skill'}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white rounded font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;