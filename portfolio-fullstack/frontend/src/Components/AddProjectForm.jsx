import React, { useState, useEffect } from "react";
import { Terminal, Save } from "lucide-react";

const AddProjectForm = ({ onClose, project, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    status: "draft",
    publishDate: "",
    coverImage: "",
    liveDemo: "",
    github: "",
    featured: false,
    sortOrder: 0,
    viewCount: 0,
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        shortDescription: project.shortDescription || "",
        status: project.status || "draft",
        publishDate: project.publishDate 
          ? new Date(project.publishDate).toISOString().split('T')[0] 
          : "",
        coverImage: project.coverImage || "",
        liveDemo: project.liveDemo || "",
        github: project.github || "",
        featured: project.featured || false,
        sortOrder: project.sortOrder || 0,
        viewCount: project.viewCount || 0,
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = project
        ? `http://localhost:3000/api/projects/${project._id}`
        : "http://localhost:3000/api/projects";

      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log(project ? "Updated:" : "Created:", data);
      alert(project ? "Project Updated Successfully 🚀" : "Project Added Successfully 🚀");

      // Call success callback to refresh parent
      if (onSuccess) {
        onSuccess(data.data);
      }

      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to ${project ? "update" : "add"} project ❌`);
    }
  };

  return (
    <div className="p-6 bg-[#111] text-white">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#00ff41]" />
          {project ? "Update Project" : "Initialize New Project"}
        </h2>
        <p className="text-[#8b8b8b] mt-2">
          {project 
            ? "Modify the parameters to update the project."
            : "Fill in the parameters to register a new project."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Parameters */}
        <div className="space-y-4 p-4 bg-[#151515] border border-[#2a2a2a] rounded-lg">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase">
            Core Parameters
          </h3>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded focus:border-[#00ff41] outline-none"
          />

          <input
            type="text"
            name="shortDescription"
            placeholder="Short Description"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded focus:border-[#00ff41] outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
            />
          </div>
        </div>

        {/* Network Links */}
        <div className="space-y-4 p-4 bg-[#151515] border border-[#2a2a2a] rounded-lg">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase">
            Network Links
          </h3>

          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="liveDemo"
              placeholder="Live Demo URL"
              value={formData.liveDemo}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
            />

            <input
              type="text"
              name="github"
              placeholder="GitHub URL"
              value={formData.github}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
            />
          </div>
        </div>

        {/* System Metadata */}
        <div className="space-y-4 p-4 bg-[#151515] border border-[#2a2a2a] rounded-lg">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase">
            System Metadata
          </h3>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="accent-[#00ff41]"
            />
            Featured Project
          </label>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="sortOrder"
              value={formData.sortOrder}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
              placeholder="Sort Order"
            />

            <input
              type="number"
              name="viewCount"
              value={formData.viewCount}
              onChange={handleChange}
              className="bg-[#0a0a0a] border border-[#2a2a2a] p-2 rounded"
              placeholder="View Count Offset"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#2a2a2a]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#2a2a2a] text-[#8b8b8b] hover:bg-[#151515]"
          >
            Abort
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-[#00ff41] text-black font-semibold hover:bg-[#00e63a]"
          >
            <Save size={16} />
            {project ? "Update Protocol" : "Execute Protocol"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;