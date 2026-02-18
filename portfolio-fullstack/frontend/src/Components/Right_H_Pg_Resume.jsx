import React from 'react'
import { Download } from 'lucide-react'

const Right_H_Pg_Resume = () => {
  return (
    <a
      href="/cv.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="
        group inline-flex items-center gap-2
        px-6 py-3
        rounded-lg
        text-sm font-bold
        text-green-400
        border border-green-500/40
        bg-black/60
        hover:bg-green-500/10
        hover:border-green-400
        transition-all duration-300
        shadow-[0_0_15px_rgba(34,197,94,0.15)]
        hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]
      "
    >
      <Download color="#1ecc41" />
      Résumé
    </a>
  )
}

export default Right_H_Pg_Resume
