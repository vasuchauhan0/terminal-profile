import React, { useState, useEffect } from "react";
import { 
  Terminal, 
  Folder, 
  Eye, 
  TrendingUp, 
  AlertCircle,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    publishedProjects: 0,
    draftProjects: 0,
    totalViews: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch projects");
        }

        const projects = data.data || [];

        // Calculate stats
        const published = projects.filter((p) => p.status === "published").length;
        const draft = projects.filter((p) => p.status === "draft").length;
        const totalViews = projects.reduce((sum, p) => sum + (p.viewCount || 0), 0);

        setStats({
          totalProjects: projects.length,
          publishedProjects: published,
          draftProjects: draft,
          totalViews: totalViews,
        });

        // Get recent 5 projects
        const recent = projects
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .slice(0, 5);
        
        setRecentProjects(recent);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        <div className="flex items-center justify-center h-64">
          <div className="text-[#00ff41] font-mono animate-pulse text-lg">
            ⚡ Loading dashboard...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-white">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">Error Loading Dashboard</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Terminal className="w-8 h-8 text-[#00ff41]" />
          Admin Dashboard
        </h1>
        <p className="text-[#8b8b8b] mt-2">
          Welcome back! Here's your project overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Projects */}
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#00ff41] transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#00ff41]/10 p-3 rounded-lg">
              <Folder className="w-6 h-6 text-[#00ff41]" />
            </div>
            <span className="text-[#00ff41] text-sm font-semibold">TOTAL</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalProjects}</h3>
          <p className="text-[#8b8b8b] text-sm">Total Projects</p>
        </div>

        {/* Published */}
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-6 hover:border-green-500 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Rocket className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-sm font-semibold">LIVE</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.publishedProjects}</h3>
          <p className="text-[#8b8b8b] text-sm">Published</p>
        </div>

        {/* Draft */}
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-6 hover:border-yellow-500 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-500/10 p-3 rounded-lg">
              <Terminal className="w-6 h-6 text-yellow-400" />
            </div>
            <span className="text-yellow-400 text-sm font-semibold">WIP</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.draftProjects}</h3>
          <p className="text-[#8b8b8b] text-sm">In Draft</p>
        </div>

        {/* Total Views */}
        <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-6 hover:border-blue-500 transition-colors duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-blue-400 text-sm font-semibold">VIEWS</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">{stats.totalViews}</h3>
          <p className="text-[#8b8b8b] text-sm">Total Views</p>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#2a2a2a] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#00ff41]" />
              Recent Projects
            </h2>
            <p className="text-[#8b8b8b] text-sm mt-1">
              {recentProjects.length > 0 
                ? `Your latest ${recentProjects.length} projects` 
                : "No projects yet"}
            </p>
          </div>
          <Link
            to="/admin/projects_management"
            className="text-[#00ff41] hover:text-[#00e63a] text-sm font-semibold transition"
          >
            View All →
          </Link>
        </div>

        {/* No Projects State */}
        {recentProjects.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-block p-4 bg-[#1a1a1a] rounded-full mb-4">
              <Folder className="w-12 h-12 text-[#8b8b8b]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#8b8b8b]">
              No Projects Available
            </h3>
            <p className="text-[#6b6b6b] mb-6 max-w-md mx-auto">
              You haven't created any projects yet. Start by initializing your first project to see it here.
            </p>
            <Link
              to="/admin/projects_management"
              className="inline-flex items-center gap-2 bg-[#00ff41] text-black px-6 py-3 rounded-md font-semibold hover:bg-[#00e63a] transition"
            >
              <Terminal className="w-5 h-5" />
              Create Your First Project
            </Link>
          </div>
        ) : (
          /* Projects List */
          <div className="divide-y divide-[#2a2a2a]">
            {recentProjects.map((project, index) => (
              <div
                key={project._id || project.id || index}
                className="p-4 hover:bg-[#1a1a1a] transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold">
                        {project.title || "Untitled Project"}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded font-medium uppercase ${
                          project.status === "published"
                            ? "bg-green-500/20 text-green-400"
                            : project.status === "draft"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {project.status || "draft"}
                      </span>
                    </div>
                    <p className="text-[#8b8b8b] text-sm">
                      {project.shortDescription || "No description provided"}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-2 text-[#8b8b8b] text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{project.viewCount || 0}</span>
                    </div>
                    {project.publishDate && (
                      <div className="text-xs text-[#6b6b6b] mt-1">
                        {new Date(project.publishDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions (Optional) */}
      {stats.totalProjects > 0 && (
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Link
            to="/admin/projects_management"
            className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#00ff41] transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#00ff41]/10 p-2 rounded">
                <Folder className="w-5 h-5 text-[#00ff41]" />
              </div>
              <div>
                <h4 className="font-semibold">Manage Projects</h4>
                <p className="text-[#8b8b8b] text-sm">View all projects</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/projects_management"
            className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4 hover:border-[#00ff41] transition-colors duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#00ff41]/10 p-2 rounded">
                <Terminal className="w-5 h-5 text-[#00ff41]" />
              </div>
              <div>
                <h4 className="font-semibold">New Project</h4>
                <p className="text-[#8b8b8b] text-sm">Create new project</p>
              </div>
            </div>
          </Link>

          <div className="bg-[#151515] border border-[#2a2a2a] rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/10 p-2 rounded">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold">Analytics</h4>
                <p className="text-[#8b8b8b] text-sm">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;