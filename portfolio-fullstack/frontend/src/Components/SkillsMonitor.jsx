export default function SkillsMonitor() {
  return (
    <section className="container mx-auto px-8 py- relative z-10">

      {/* ================= HEADER ================= */}
      


      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* ================= CARD ================= */}
        <SkillCard title="Frontend Arsenal" id="001">
          <Skill name="React.js" value={95} />
          <Skill name="TypeScript" value={90} />
          <Skill name="Tailwind CSS" value={98} />
          <Skill name="Next.js" value={88} />
        </SkillCard>


        <SkillCard title="Backend Core" id="002">
          <Skill name="Node.js" value={92} />
          <Skill name="PostgreSQL" value={85} />
          <Skill name="Rust" value={75} />
          <Skill name="GraphQL" value={80} />
        </SkillCard>


        <SkillCard title="DevOps & Tools" id="003">
          <Skill name="Docker" value={85} />
          <Skill name="Kubernetes" value={70} />
          <Skill name="Linux" value={90} />
          <Skill name="Git" value={99} />
        </SkillCard>

      </div>


      {/* ================= FOOTER ================= */}
      <div className="mt-20 border-t border-[#2a2a2a] pt-4 flex justify-between items-center text-[10px] font-mono text-[#444]">
        <span>// END_OF_SECTION</span>
        <span className="hidden sm:inline">MEMORY_ALLOCATION: 0x442A</span>
      </div>

    </section>
  );
}


/* ================= CARD COMPONENT ================= */
function SkillCard({ title, id, children }) {
  return (
    <div className="h-full bg-[#0a0a0a] border border-[#2a2a2a] hover:border-[#00ff41] transition-colors duration-300 relative overflow-hidden group">

      {/* corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff41] opacity-50 group-hover:opacity-100"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ff41] opacity-50 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ff41] opacity-50 group-hover:opacity-100"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff41] opacity-50 group-hover:opacity-100"></div>

      {/* header */}
      <div className="p-4 border-b border-[#2a2a2a] bg-[#151515] flex items-center justify-between">
        <h3 className="text-[#e8e8e8] uppercase tracking-wider font-bold">
          {title}
        </h3>
        <span className="border border-[#00ff41] text-[#00ff41] font-mono text-xs px-2">
          SYS.ID: {id}
        </span>
      </div>

      <div className="p-6">{children}</div>
    </div>
  );
}


/* ================= SKILL BAR ================= */
function Skill({ name, value }) {
  return (
    <div className="mb-6 last:mb-0 group">

      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[#00ff41] text-xs font-mono">{">"}</span>
          <span className="text-[#e8e8e8] group-hover:text-[#00ff41] transition-colors">
            {name}
          </span>
        </div>

        <span className="font-mono text-[#00ff41] text-xs">{value}%</span>
      </div>

      <div className="h-2 w-full bg-[#151515] border border-[#2a2a2a] relative overflow-hidden">
        <div
          className="h-full bg-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.4)] relative"
          style={{ width: `${value}%` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#e8e8e8] shadow-[0_0_8px_#e8e8e8]"></div>
        </div>
      </div>

    </div>
  );
}
