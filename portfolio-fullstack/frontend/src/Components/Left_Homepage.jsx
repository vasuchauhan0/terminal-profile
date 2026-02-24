import React from 'react'
import Left_h_p_buttons from './Left_h_p_buttons'


const Right_Homepage = () => {
  return (
    <div className="lg:col-span-2 shadow-[0_0_40px_rgba(34,197,94,0.35)] bg-black border border-green-500/30 rounded-lg ">
          
          {/* Terminal header */}
          <div className="flex w-full items-center bg-zinc-900 px-3 py-3 gap-2 mb-6">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          
          </div>

          <div className='px-4'>
            <p className="text-green-400 text-sm mb-2 flex items-center">
            root@portfolio:~$ whoami
              <span className="ml-1 inline-block w-3 h-4 bg-green-400"
              style={{
              animation: "blink 1s steps(1, end) infinite",
              }}></span>
           </p>



          <p className="text-zinc-500 text-xs">// SYSTEM RESPONSE</p>

          {/* Main text */}
          <h1 className="px-3  text-4xl md:text-5xl font-bold mt-4 leading-tight text-zinc-300">
            Hello, I&apos;m <br />
             <p className="relative text-5xl md:text-7xl font-bold group cursor-pointer select-none">


             {/* MAIN GREEN TEXT */}
              <span
              className="
                relative
                
               text-green-400
                transition-all duration-300
                 group-hover:scale-105
                 group-hover:drop-shadow-[0_0_8px_#22c55e]
                group-hover:drop-shadow-[2px_0_0_#22c55e]
                 "
                >

                 Vansh Chauhan.

                </span>
                </p>
          </h1>

          <p className="text-green-300 text-2xl mt-3">

            &gt;Backend Engineer
            
          </p>

          <p className="text-zinc-300 px-3  text-xl mt-6 max-w-2xl">
            Building secure, scalable backend systems focused on performance, reliability, and clean architecture.
          </p>

          {/* Buttons */}
          <Left_h_p_buttons/>

          {/* Footer */}
          <div className="flex justify-between items-center mt-7 mb-3 text-xs text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 shadow-[0_0_15px_#22c55e] animate-pulse"></span>
              <span className="text-green-400">INITIALIZING_SYSTEM…</span>
            </span>
          </div>

          </div>
        </div>
  )
}

export default Right_Homepage