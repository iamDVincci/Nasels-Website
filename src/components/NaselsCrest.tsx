import React from 'react';

interface NaselsCrestProps {
  className?: string;
  size?: number;
}

export const NaselsCrest: React.FC<NaselsCrestProps> = ({ className = '', size = 44 }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none overflow-hidden shadow-xs border border-[#083820]/20 bg-[#0E5C36] ${className}`}
      style={{ width: size, height: size }}
      title="Official NASELS UNIZIK Crest"
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Field */}
        <circle cx="50" cy="50" r="48" fill="#0E5C36" stroke="#FAF7EE" strokeWidth="2" />
        
        {/* Inner Border Ring */}
        <circle cx="50" cy="50" r="44" stroke="#F0EAD6" strokeWidth="1" strokeDasharray="2 1.5" />

        {/* Heraldic Ribbon at Base - Literary Plum/Purple */}
        <path 
          d="M20 78 C35 84, 65 84, 80 78 L75 88 C60 92, 40 92, 25 88 Z" 
          fill="#6B2361" 
          stroke="#FAF7EE" 
          strokeWidth="1"
        />

        {/* Laurel Wreath Branches (Gold/Cream) */}
        <path 
          d="M22 62 C18 48 24 35 34 26 C33 32 36 38 42 42 C36 48 30 55 34 65" 
          stroke="#FAF7EE" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          fill="none"
          opacity="0.8"
        />
        <path 
          d="M78 62 C82 48 76 35 66 26 C67 32 64 38 58 42 C64 48 70 55 66 65" 
          stroke="#FAF7EE" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          fill="none"
          opacity="0.8"
        />

        {/* Open Book - Academic Knowledge */}
        <g transform="translate(25, 34)">
          {/* Left Page */}
          <path 
            d="M25 6 C15 3 5 4 0 6 L0 26 C6 24 16 23 25 26 Z" 
            fill="#FAF7EE" 
            stroke="#141A16" 
            strokeWidth="1.2"
          />
          {/* Right Page */}
          <path 
            d="M25 6 C35 3 45 4 50 6 L50 26 C44 24 34 23 25 26 Z" 
            fill="#FAF7EE" 
            stroke="#141A16" 
            strokeWidth="1.2"
          />
          {/* Spine Divider */}
          <line x1="25" y1="5" x2="25" y2="27" stroke="#6B2361" strokeWidth="1.5" />
          {/* Text Lines Simulation on Pages */}
          <line x1="5" y1="12" x2="20" y2="10.5" stroke="#606C64" strokeWidth="1" opacity="0.6" />
          <line x1="5" y1="16" x2="20" y2="14.5" stroke="#606C64" strokeWidth="1" opacity="0.6" />
          <line x1="5" y1="20" x2="18" y2="18.5" stroke="#606C64" strokeWidth="1" opacity="0.6" />

          <line x1="30" y1="10.5" x2="45" y2="12" stroke="#606C64" strokeWidth="1" opacity="0.6" />
          <line x1="30" y1="14.5" x2="45" y2="16" stroke="#606C64" strokeWidth="1" opacity="0.6" />
          <line x1="32" y1="18.5" x2="45" y2="20" stroke="#606C64" strokeWidth="1" opacity="0.6" />
        </g>

        {/* Academic Quill Feather crossing diagonally */}
        <path 
          d="M62 20 C60 25, 48 40, 36 50 L34 52 L36 49 C42 41, 52 30, 58 21 C60 18, 63 17, 62 20 Z" 
          fill="#FAF7EE" 
          stroke="#6B2361" 
          strokeWidth="1" 
        />

        {/* Academic Acronym */}
        <text 
          x="50" 
          y="23" 
          textAnchor="middle" 
          fill="#FAF7EE" 
          fontSize="9" 
          fontFamily="'Cinzel', serif" 
          fontWeight="bold" 
          letterSpacing="1"
        >
          NASELS
        </text>

        {/* UNIZIK subtitle on bottom ribbon */}
        <text 
          x="50" 
          y="85" 
          textAnchor="middle" 
          fill="#FAF7EE" 
          fontSize="7" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          letterSpacing="1.2"
        >
          UNIZIK
        </text>
      </svg>
    </div>
  );
};
