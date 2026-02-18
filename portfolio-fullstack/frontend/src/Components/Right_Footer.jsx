import React from 'react'

const Right_Footer = () => {
  return (
    <div className='flex gap-6'>
      <div>
        <p class="text-green-400 font-extrabold mb-3">CONNECT</p>
      <ul class="space-y-2">
        <li>&gt; <a href="#" class="hover:text-green-400">GitHub</a></li>
        <li>&gt; <a href="#" class="hover:text-green-400">LinkedIn</a></li>
        <li>&gt; <a href="#" class="hover:text-green-400">Twitter</a></li>
      </ul>
      </div>
      <div>
      <p class="text-green-400 font-extrabold mb-3">NAVIGATION</p>
      <ul class="space-y-2">
        <li>&gt; <a href="#" class="hover:text-green-400">Home</a></li>
        <li>&gt; <a href="#" class="hover:text-green-400">Portfolio</a></li>
        <li>&gt; <a href="#" class="hover:text-green-400">Contact</a></li>
      </ul>
    </div>
    </div>
    
  )
}

export default Right_Footer