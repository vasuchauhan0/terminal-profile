import React from 'react'
import { ShieldCheck } from "lucide-react";
import Right_Loader from './Right_Loader'
import Right_h_p_socialmedia from './Right_h_p_socialmedia';
import Right_h_p_Image from './Right_h_p_Image';
import Right_H_Pg_Resume from './Right_H_Pg_Resume';


const Right_Homepage = () => {
  return (
    <div className="relative bg-zinc-900 border border-green-500/40 rounded-lg mt-6 shadow-lg overflow-hidden">


          <div className="flex bg-zinc-950 items-center py-2 px-2 justify-between mb-4">
            <span className="text-zinc-300 flex gap-2 text-sm font-semibold">
            <ShieldCheck color="#49caa4" />ACCESS GRANTED
            </span>
            <span>
              <span className="text-green-400 animate-pulse text-xs font-bold inline-block  px-1">Status:~Active</span>
            </span>
          </div>

          <Right_h_p_Image/>


          <div className="grid px-3 py-3 grid-cols-2 gap-4 mt-6 text-xs">
            <div className="border border-green-400/30 rounded p-3">
              <p className="text-zinc-500">DEPARTMENT</p>
              <p className="text-green-400 font-semibold">ENGINEERING</p>
            </div>

            <div className="border border-green-400/30 rounded p-3">
              <p className="text-zinc-500">VALID THRU</p>
              <p className="text-green-400 font-semibold">PERMANENT</p>
            </div>
          </div>

          <Right_h_p_socialmedia/>

          

          <div>
            <Right_Loader/>
          </div>

          <div className='px-25 py-3'>
            <Right_H_Pg_Resume/>
          </div>
          
          
        </div>
  )
}

export default Right_Homepage