import {
  Users,
  MessageSquare,
  FolderGit2,
  FileText,
  Activity,
} from "lucide-react";

const metrics = [
  {
    title: "Total Views",
    value: "23,508",
    description: "Aggregate views across all content",
    icon: Users,
  },
  {
    title: "Messages",
    value: "8",
    description: "Inquiries from contact form",
    icon: MessageSquare,
  },
  {
    title: "Projects",
    value: "8",
    description: "Portfolio items in database",
    icon: FolderGit2,
  },
  {
    title: "Skills",
    value: "5",
    description: "Ability",
    icon: FileText,
  },
];

export default function CoreMetricsGrid() {
  return (
    <div className="px-8 py-10">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-6 h-6 text-[#00ff41]" />
        <h2 className="text-2xl font-bold text-white uppercase">
          System Overview
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="group p-6 bg-[#151515] border border-[#2a2a2a] rounded hover:border-[#00ff41] hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 text-[#00ff41]" />
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-gray-400 uppercase mb-1">
                  {item.title}
                </h3>
                <span className="text-3xl font-bold text-white font-mono">
                  {item.value}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-[#2a2a2a]">
                <p className="text-xs text-gray-400 group-hover:text-white transition">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Status */}
      <div className="mt-6 flex justify-end items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute h-full w-full rounded-full bg-[#00ff41] opacity-75"></span>
          <span className="relative rounded-full h-2 w-2 bg-[#00ff41]"></span>
        </span>
        <span className="text-xs text-gray-400 font-mono">
          SYSTEM OPERATIONAL
        </span>
      </div>
    </div>
  );
}
