import React from 'react'
import {Link} from 'react-router-dom'

const Right_Footer = () => {
  return (
    <div className='flex gap-6'>
      <div>
        <p class="text-green-400 font-extrabold mb-3">CONNECT</p>
      <ul class="space-y-2">
        <li>&gt; <a href="https://github.com/vasuchauhan0" target="_blank" rel="noopener noreferrer" class="hover:text-green-400">GitHub</a></li>
        <li>&gt; <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" class="hover:text-green-400">LinkedIn</a></li>
        <li>&gt; <a href="https://www.instagram.com/vanshchauhan5515/#" target="_blank" rel="noopener noreferrer" class="hover:text-green-400">Instagram</a></li>
      </ul>
      </div>
      <div>
      <p class="text-green-400 font-extrabold mb-3">NAVIGATION</p>
      <ul class="space-y-2">
        <li>&gt; <Link to="/" class="hover:text-green-400">Home</Link></li>
        <li>&gt; <Link to="/project" class="hover:text-green-400">Projects</Link></li>
        <li>&gt; <Link to="/contact" class="hover:text-green-400">Contact</Link></li>
      </ul>
    </div>
    </div>
    
  )
}

export default Right_Footer