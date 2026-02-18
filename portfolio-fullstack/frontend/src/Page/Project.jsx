import React, { useEffect, useState } from "react";
import ProjectCard from "../Components/Project_card";
import { Terminal, FolderOpen, AlertCircle, Loader2 } from "lucide-react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = '/api';

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching projects from:', `${API_URL}/projects`);
        
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();

        console.log('Projects response:', data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        // Only show published projects on frontend
        const publishedProjects = (data.data || []).filter(
          (project) => project.status === "published"
        );

        console.log('Published projects:', publishedProjects.length);
        setProjects(publishedProjects);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="min-h-screen bg-[#0a0e0f] px-6 py-16">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,52,54,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(45,52,54,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="relative z-10">
        {/* PAGE HEADER */}
        <div className="max-w-7xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-mono font-bold text-[#00ff41] flex items-center gap-3 mb-2">
            <Terminal className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-white">~/</span>projects
          </h1>
          <p className="text-[#808e87] mt-2 font-mono text-sm md:text-base ml-11 md:ml-14">
            Executable builds & experiments
          </p>
          {!loading && !error && projects.length > 0 && (
            <p className="text-[#00ff41] mt-1 font-mono text-xs md:text-sm ml-11 md:ml-14">
              {projects.length} {projects.length === 1 ? "project" : "projects"} available
            </p>
          )}
        </div>

        <div className="max-w-7xl mx-auto">
          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#00ff41] animate-spin mb-4" />
              <p className="text-[#00ff41] font-mono text-lg">
                Loading projects...
              </p>
              <p className="text-[#808e87] font-mono text-sm mt-2">
                Fetching data from server...
              </p>
            </div>
          )}

          {/* ERROR STATE */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-8 max-w-md">
                <div className="flex items-center gap-3 text-red-400 mb-4">
                  <AlertCircle className="w-6 h-6" />
                  <h3 className="font-mono text-lg font-semibold">Error Loading Projects</h3>
                </div>
                <p className="text-red-300 font-mono text-sm mb-2">{error}</p>
                <p className="text-red-400/70 font-mono text-xs mb-6">
                  Make sure the backend is running on http://localhost:3000
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-mono py-2 px-4 rounded transition"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="bg-[#151515] border-2 border-[#2a2a2a] rounded-lg p-12 max-w-md text-center">
                <FolderOpen className="w-16 h-16 text-[#808e87] mx-auto mb-4" />
                <h3 className="text-xl font-mono text-[#00ff41] mb-2">
                  No Published Projects Yet
                </h3>
                <p className="text-[#808e87] font-mono text-sm mb-4">
                  Projects will appear here once they are published.
                </p>
                <p className="text-[#6b6b6b] font-mono text-xs">
                  Note: Only projects with status "published" are shown
                </p>
              </div>
            </div>
          )}

          {/* PROJECT GRID */}
          {!loading && !error && projects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project._id || project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Project;