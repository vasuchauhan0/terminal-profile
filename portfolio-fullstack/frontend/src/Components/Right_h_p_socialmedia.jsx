import React from 'react'
import { Github, Linkedin, Instagram } from "lucide-react";

const Right_h_p_socialmedia = () => {
  return (
    <div className="flex justify-center gap-6 mt-6 text-zinc-500">
  
  <a
    href="https://github.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-400 transition"
  >
    <Github className="w-5 h-5" />
  </a>

  <a
    href="https://linkedin.com/in/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-400 transition"
  >
    <Linkedin className="w-5 h-5" />
  </a>

  <a
    href="https://instagram.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-green-400 transition"
  >
    <Instagram className="w-5 h-5" />
  </a>

</div>

  )
}

export default Right_h_p_socialmedia