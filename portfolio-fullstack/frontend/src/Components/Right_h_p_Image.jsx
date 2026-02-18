import React from 'react'
import My_photo from '../assets/My_photo.png'

const Right_h_p_Image = () => {
  return (
    <div>
        
         {/* Image */}
        
        <div className="relative flex flex-col items-center text-center">
        
           {/* BACKGROUND HORIZONTAL LINE (RIGHT BOX ONLY) */}
          <div
                      className="
              absolute left-0 right-0
               top-1/2
               h-1
               bg-gradient-to-r
              from-transparent
                        via-green-400
               pointer-events-none
            "
           />
    
           <div className="w-30 h-30 relative shadow-[0_0_50px_rgba(34,197,94,0.6)] rounded mb-4 bg-black overflow-hidden">
                    
           {/* IMAGE */}
            <img
             src={My_photo}
                       alt=""
             className="w-full h-full object-cover object-center"
           />
        
            {/* THICK SCAN LINE */}
           <div
              className="
               absolute left-0 w-full h-8
               bg-gradient-to-b
               from-transparent
               via-green-400/80
                to-transparent
               blur-sm
             "
             style={{
                animation: "scanline 3s linear infinite",
              }}
           />
         </div>
        
         {/* name */}
        
          <h2 className="text-zinc-300 font-bold text-xl">
             Vansh chauhan
           </h2>
          <p className="text-green-400 text-sm">ID-CSE-root~</p>
         </div>
    </div>
  )
}

export default Right_h_p_Image