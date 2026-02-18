import { useEffect, useState } from "react";

export default function Loader() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(false);
    requestAnimationFrame(() => setStart(true)); // restart on refresh
  }, []);

  return (
    <div className="flex items-center gap-4">
        

      {/* Circular indicator */}
      <div className="relative w-14 h-14 rounded-full border-4 border-zinc-700">
        <div className="absolute inset-1 rounded-full border-3 border-green-400 animate-spin-slow"></div>
        <span className="absolute inset-0 flex items-center justify-center text-green-400 text-xs font-mono">
          80%
        </span>
      </div>

      {/* LOADING BAR */}
      <div className="relative w-64 h-6 bg-zinc-900 border border-green-400/40 rounded overflow-hidden">

        {/* FILL */}
        <div
          className={`
            absolute inset-0
            bg-green-300
            ${start ? "animate-[fill_2.5s_ease-out_forwards]" : ""}
          `}
        />

        {/* SEGMENTED BARS */}
        <div
          className={`
            absolute inset-0
            bg-[repeating-linear-gradient(
              90deg,
              #22c55e 0,
              #22c55e 10px,
              transparent 10px,
              transparent 14px
            )]
            shadow-[0_0_15px_#22c55e]
            ${start ? "animate-[fill_2.5s_ease-out_forwards]" : ""}
          `}
        />
      </div>

      <span className="text-green-400 font-mono text-xs tracking-widest">
        LOADING…
      </span>
    </div>
  );
}
