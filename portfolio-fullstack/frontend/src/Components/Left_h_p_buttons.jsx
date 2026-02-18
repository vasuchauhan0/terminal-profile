import React from 'react'
import PortfolioIcon from '../assets/Portfolio_svg.svg'
import {Link} from 'react-router-dom'

const Left_h_p_buttons = () => {
  return (
    <div className="flex border-t-2 border-zinc-700 py-4 px-6 flex-wrap gap-4 mt-8">
                <Link to='/project' className="bg-green-400 active:scale-95 flex gap-1 text-black px-6 py-3 rounded hover:bg-green-300 transition">
                 <img src={PortfolioIcon} alt="" /> PROJECTS
                </Link>
    
                <Link to='/contact' className="border active:scale-95 border-green-400 text-green-400 px-6 py-3 rounded hover:bg-green-400 hover:text-black transition">
                  ⚙ EXECUTE_CONTACT
                </Link>
              </div>
  )
}

export default Left_h_p_buttons