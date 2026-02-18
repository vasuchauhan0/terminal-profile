import React from 'react'
import Left_footer from './Left_footer'
import Right_Footer from './Right_Footer'

const Footer = () => {
  return (
    <footer className=' w-full bg-zinc-900 border-t border-zinc-700 text-zinc-400 font-mono text-sm'>
        <div className='flex justify-between px-5 py-7  gap-6'>
            <Left_footer/>
            <Right_Footer/>
        </div>
        {/* bottom line */}
         <div className="border-t border-zinc-800 px-6 py-4 text-xs flex flex-col md:flex-row justify-between items-center relative z-10">
    <p>
      Built with passion, caffeine, and clean code.
    </p>
  </div>
    </footer>
  )
}

export default Footer