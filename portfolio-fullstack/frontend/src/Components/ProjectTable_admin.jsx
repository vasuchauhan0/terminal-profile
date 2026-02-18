import React, { useState } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";

const ProjectsTable = ({ projects, loading, error, onDelete, onEdit }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const getProjectId = (project) => {
    return project._id || project.id;
  };

  if (loading) {
    return (
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-md p-8">
        <div className="text-[#00ff41] font-mono animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-md p-8">
        <div className="text-red-500 font-mono">Error: {error}</div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

  console.log("=== RENDERING TABLE ===");
  console.log("Total projects:", projects.length);
  projects.forEach((p, i) => {
    const id = getProjectId(p);
    console.log(`Project ${i + 1}: ID=${id}, Title=${p.title}`);
  });

  return (
    <div className="bg-[#151515] border border-[#2a2a2a] rounded-md overflow-visible">
      {/* Simple Table */}
      <table className="w-full">
        <thead className="bg-[#1a1a1a] border-b border-[#2a2a2a]">
          <tr className="text-[#8b8b8b] text-sm text-left">
            <th className="p-4 w-16">#</th>
            <th className="p-4">Title</th>
            <th className="p-4 w-32">Status</th>
            <th className="p-4 w-24">Views</th>
            <th className="p-4 w-32">Date</th>
            <th className="p-4 w-32 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const projectId = getProjectId(project);
            const isOpen = openMenu === projectId;

            return (
              <tr
                key={projectId || index}
                className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
              >
                <td className="p-4 text-[#8b8b8b]">#{index + 1}</td>
                <td className="p-4 font-semibold text-white">
                  {project.title || "Untitled"}
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded uppercase ${
                      project.status === "published"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status || "draft"}
                  </span>
                </td>
                <td className="p-4 text-[#8b8b8b]">👁 {project.viewCount || 0}</td>
                <td className="p-4 text-[#8b8b8b] text-sm">
                  {project.publishDate
                    ? new Date(project.publishDate).toLocaleDateString()
                    : "—"}
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-2">
                    {/* DIRECT ACTION BUTTONS - ALWAYS VISIBLE */}
                    <button
                      onClick={() => {
                        console.log(`EDIT button clicked for project #${index + 1}:`, project);
                        onEdit(project);
                      }}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        console.log(`DELETE button clicked for project #${index + 1}:`, projectId);
                        onDelete(projectId);
                      }}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsTable;