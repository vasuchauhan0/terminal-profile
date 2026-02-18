import React from "react";
import { ExternalLink, Github, Folder } from "lucide-react";

const ProjectCard = ({ project }) => {
  // Get the correct image URL
  const getImageUrl = () => {
    if (project.thumbnailImage) {
      // If it starts with http, use as is, otherwise prepend the backend URL
      if (project.thumbnailImage.startsWith('http')) {
        return project.thumbnailImage;
      }
      return project.thumbnailImage;
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="project-card group flex flex-col h-full bg-[#151b1e] border-2 border-[#2d3436] hover:border-[#00ff41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] transition-all duration-300 rounded-sm overflow-hidden">

      {/* Terminal Header */}
      <div className="h-8 bg-[#2d3436] flex items-center justify-between px-3 border-b border-[#151b1e] group-hover:bg-[#00ff41] transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff3b30] group-hover:bg-[#0a0e0f] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] group-hover:bg-[#0a0e0f] transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41] group-hover:bg-[#0a0e0f] transition-colors" />
        </div>

        <div className="text-[10px] text-[#808e87] font-mono group-hover:text-[#0a0e0f] font-bold truncate max-w-[150px] transition-colors">
          user@portfolio:~/{project.title?.toLowerCase().replace(/\s+/g, "_")}
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0a0e0f]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 ease-out grayscale group-hover:grayscale-0"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('flex', 'items-center', 'justify-center');
              e.target.parentElement.innerHTML = '<div class="flex flex-col items-center justify-center w-full h-full"><svg class="w-16 h-16 text-[#2d3436]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><p class="text-[#808e87] text-xs mt-2 font-mono">No image</p></div>';
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Folder className="w-16 h-16 text-[#2d3436]" />
            <p className="text-[#808e87] text-xs mt-2 font-mono">No thumbnail</p>
          </div>
        )}

        {/* Hover Overlay with Buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-3">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="w-full bg-[#00ff41] text-[#0a0e0f] hover:bg-[#00d936] font-bold rounded-sm h-9 text-xs flex items-center justify-center transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    LIVE DEMO
                  </button>
                </a>
              )}

              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button className="w-full bg-transparent border-2 border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41]/20 rounded-sm h-9 text-xs flex items-center justify-center transition-colors font-bold">
                    <Github className="w-3.5 h-3.5 mr-2" />
                    SOURCE
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow border-t border-[#2d3436] bg-[#151b1e]">
        <h3 className="text-[#e8f5e9] text-lg font-semibold mb-2 group-hover:text-[#00ff41] transition-colors line-clamp-1">
          {project.title}
        </h3>

        <p className="text-[#808e87] text-sm line-clamp-2 mb-4 flex-grow min-h-[2.5rem]">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#2d3436]/50">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="bg-[#0a0e0f] text-[#00ff41] border border-[#2d3436] rounded-sm px-2 py-1 text-[10px] font-mono hover:border-[#00ff41] transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="bg-[#0a0e0f] text-[#808e87] border border-[#2d3436] rounded-sm px-2 py-1 text-[10px] font-mono">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Category Badge */}
        {project.category && (
          <div className="mt-3 pt-3 border-t border-[#2d3436]/30">
            <span className="inline-block text-[9px] font-mono text-[#808e87] uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;