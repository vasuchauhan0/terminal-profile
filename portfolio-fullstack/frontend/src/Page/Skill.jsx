import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import skillService from '../services/skill.service';

const Skill = () => {
  const [skills, setSkills] = useState([]);
  const [groupedSkills, setGroupedSkills] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await skillService.getAll({ isActive: true });
      
      if (response.success) {
        setSkills(response.data);
        setGroupedSkills(response.grouped || {});
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-[#0a0e0f] text-[#e8f5e9] flex items-center justify-center">
        <div className="text-[#00ff41] font-mono animate-pulse text-lg">
          Loading skills...
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-[#0a0e0f] text-[#e8f5e9] overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,52,54,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(45,52,54,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 py-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="font-mono text-[#00ff41] text-sm mb-4">
            &gt;_ SYSTEM CONFIGURATION
          </div>

          <h2 className="text-5xl font-bold tracking-tight mb-6">
            <span className="text-white">Technical </span>
            <span className="text-[#9aa7a1]">Proficiency</span>
          </h2>

          <p className="text-[#9aa7a1] max-w-2xl mx-auto leading-relaxed">
            A structured overview of my technical capabilities, visualized as
            a raw configuration object. This dataset represents the core
            dependencies of my development stack.
          </p>
        </div>

        {/* Skills Display */}
        {Object.keys(groupedSkills).length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-12">
              <p className="text-[#808e87] font-mono mb-4">
                No skills data available
              </p>
              <p className="text-[#6b6b6b] text-sm">
                Skills will appear here once they're added
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Terminal-style Skills Display */}
            <div className="bg-[#151b1e] border-2 border-[#2d3436] rounded-xl shadow-[0_0_40px_rgba(0,255,65,0.08)] overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#1b2225] border-b border-[#2d3436]">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff3b30]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffcc00]" />
                  <span className="w-3 h-3 rounded-full bg-[#00ff41]" />
                </div>
                <span className="text-xs font-mono text-[#9aa7a1]">
                  ~/portfolio/config/skills.json
                </span>
                <div className="w-16" />
              </div>

              {/* Terminal Body */}
              <div className="p-6 font-mono text-sm overflow-x-auto">
                <div className="text-[#e8f5e9]">
                  <span className="text-[#808e87]">{'{'}</span>
                  <br />
                  
                  {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
                    <div key={category} className="ml-4">
                      <span className="text-[#00ff41]">"{category}"</span>
                      <span className="text-[#808e87]">: {'{'}</span>
                      <br />

                      {categorySkills.map((skill, skillIndex) => (
                        <div key={skill._id} className="ml-4">
                          <span className="text-[#4fc3f7]">"{skill.name}"</span>
                          <span className="text-[#808e87]">: </span>
                          <span className="text-[#ffeb3b]">"{skill.proficiency}%"</span>
                          {skillIndex < categorySkills.length - 1 && (
                            <span className="text-[#808e87]">,</span>
                          )}
                          <br />
                        </div>
                      ))}

                      <span className="text-[#808e87]">{'}'}</span>
                      {categoryIndex < Object.keys(groupedSkills).length - 1 && (
                        <span className="text-[#808e87]">,</span>
                      )}
                      <br />
                    </div>
                  ))}

                  <span className="text-[#808e87]">{'}'}</span>
                </div>
              </div>
            </div>

            {/* Visual Skills Grid */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category} className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-6 hover:border-[#00ff41] transition-colors">
                  <h3 className="text-[#00ff41] font-mono font-bold mb-4 text-lg">
                    {category}
                  </h3>
                  
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill._id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#e8f5e9] text-sm">{skill.name}</span>
                          <span className="text-[#00ff41] font-mono text-xs font-bold">
                            {skill.proficiency}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-[#2d3436] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#00ff41] to-[#00d936] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>

                        {skill.description && (
                          <p className="text-[#808e87] text-xs mt-1">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-4 text-center">
                <p className="text-[#808e87] text-xs mb-1 font-mono">TOTAL SKILLS</p>
                <p className="text-2xl font-bold text-[#00ff41]">{skills.length}</p>
              </div>
              
              <div className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-4 text-center">
                <p className="text-[#808e87] text-xs mb-1 font-mono">CATEGORIES</p>
                <p className="text-2xl font-bold text-[#00ff41]">
                  {Object.keys(groupedSkills).length}
                </p>
              </div>
              
              <div className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-4 text-center">
                <p className="text-[#808e87] text-xs mb-1 font-mono">AVG PROFICIENCY</p>
                <p className="text-2xl font-bold text-[#00ff41]">
                  {skills.length > 0
                    ? Math.round(skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length)
                    : 0}%
                </p>
              </div>
              
              <div className="bg-[#151b1e] border border-[#2d3436] rounded-lg p-4 text-center">
                <p className="text-[#808e87] text-xs mb-1 font-mono">TOP SKILL</p>
                <p className="text-lg font-bold text-[#00ff41] truncate">
                  {skills.length > 0
                    ? skills.reduce((max, s) => s.proficiency > max.proficiency ? s : max, skills[0]).name
                    : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skill;