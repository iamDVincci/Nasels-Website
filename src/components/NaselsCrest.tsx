import React, { useState } from 'react';

interface NaselsCrestProps {
  className?: string;
  size?: number;
  variant?: 'square' | 'rounded' | 'badge';
  interactive?: boolean;
}

export const NaselsCrest: React.FC<NaselsCrestProps> = ({ 
  className = '', 
  size = 46,
  variant = 'square',
  interactive = true
}) => {
  const [showModal, setShowModal] = useState(false);

  const radiusClass = variant === 'rounded' 
    ? 'rounded-full' 
    : variant === 'badge' 
      ? 'rounded-xl' 
      : 'rounded-[6px]';

  return (
    <>
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 select-none overflow-hidden shadow-xs ${radiusClass} ${interactive ? 'cursor-pointer hover:shadow-md hover:scale-105 transition-all' : ''} ${className}`}
        style={{ width: size, height: size }}
        onClick={(e) => {
          if (interactive) {
            e.stopPropagation();
            setShowModal(true);
          }
        }}
        title="Official NASELS UNIZIK Departmental Logo (Click to expand)"
      >
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Background Cream Parchment */}
          <rect 
            x="4" 
            y="4" 
            width="192" 
            height="192" 
            rx="4" 
            fill="#FAF3BA" 
            stroke="#0A5930" 
            strokeWidth="8" 
          />

          {/* Inner hairline border */}
          <rect 
            x="11" 
            y="11" 
            width="178" 
            height="178" 
            rx="2" 
            fill="none" 
            stroke="#0A5930" 
            strokeWidth="1.2" 
            opacity="0.35" 
          />

          {/* LOWER PURPLE WINGS / PEAKING RIBBONS (Behind books and bottom banner) */}
          <g fill="#7A1C64" stroke="#480E3A" strokeWidth="1.2" strokeLinejoin="round">
            {/* Left Lower Leaf/Ribbon Tip */}
            <path d="M52 122 C48 136, 62 146, 78 144 C70 137, 65 128, 68 120 Z" />
            {/* Right Lower Leaf/Ribbon Tip */}
            <path d="M148 122 C152 136, 138 146, 122 144 C130 137, 135 128, 132 120 Z" />
          </g>

          {/* FLANKING VERTICAL PURPLE RIBBONS */}
          <g fill="#7A1C64" stroke="#480E3A" strokeWidth="1.2" strokeLinejoin="round">
            {/* Left Undulating Ribbon */}
            <path d="
              M59 42 
              L65 52 
              C60 62, 53 72, 60 84 
              C66 94, 69 104, 53 112 
              L56 102 
              C68 96, 62 86, 57 78 
              C52 68, 56 56, 53 43 
              Z" 
            />
            {/* Left Ribbon Upper Fork / Swallowtail Tip */}
            <path d="M53 43 L59 42 L64 50 L59 47 L54 55 Z" fill="#7A1C64" />

            {/* Right Undulating Ribbon */}
            <path d="
              M141 42 
              L135 52 
              C140 62, 147 72, 140 84 
              C134 94, 131 104, 147 112 
              L144 102 
              C132 96, 138 86, 143 78 
              C148 68, 144 56, 147 43 
              Z" 
            />
            {/* Right Ribbon Upper Fork / Swallowtail Tip */}
            <path d="M147 43 L141 42 L136 50 L141 47 L146 55 Z" fill="#7A1C64" />
          </g>

          {/* CENTRAL UPRIGHT BOOKS (English Language & Literary Studies) */}
          <g id="central-books">
            {/* Top Perspective Edge of Back/Left Book */}
            <path 
              d="M74 44 L92 27 L114 34 L96 51 Z" 
              fill="#181818" 
              stroke="#111111" 
              strokeWidth="2.5" 
              strokeLinejoin="round" 
            />
            {/* Top Perspective Paper Block (Cream/White Pages) */}
            <path 
              d="M78 43 L94 28 L110 34 L94 48 Z" 
              fill="#FFFEE8" 
              stroke="#181818" 
              strokeWidth="1.2" 
            />
            {/* Top Page Layer Lines */}
            <path d="M82 40 L97 29 M86 42 L101 31 M90 44 L105 33" stroke="#C8C090" strokeWidth="0.8" />

            {/* Top Perspective Edge of Front/Right Book */}
            <path 
              d="M94 51 L110 35 L127 41 L111 57 Z" 
              fill="#181818" 
              stroke="#111111" 
              strokeWidth="2.2" 
              strokeLinejoin="round" 
            />
            <path 
              d="M98 50 L112 37 L124 41 L110 55 Z" 
              fill="#FFFEE8" 
              stroke="#181818" 
              strokeWidth="1" 
            />

            {/* LEFT BOOK BODY (White/Cream Page Face Facing Left) */}
            {/* Left black outer spine/cover */}
            <path 
              d="M71 44 L70 144 L76 144 L77 48 Z" 
              fill="#181818" 
              stroke="#111111" 
              strokeWidth="1" 
            />
            {/* Left book face - white pages */}
            <path 
              d="M76 48 L75 144 L101 144 L102 53 Z" 
              fill="#FFFFFF" 
              stroke="#111111" 
              strokeWidth="2.2" 
              strokeLinejoin="round" 
            />
            {/* Page texture lines on left book */}
            <line x1="88" y1="88" x2="94" y2="88" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="88" y1="94" x2="94" y2="94" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="88" y1="112" x2="94" y2="112" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="88" y1="118" x2="94" y2="118" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />

            {/* RIGHT BOOK BODY (Spine & Front facing forward right) */}
            {/* Golden Cream Spine */}
            <path 
              d="M102 53 L101 144 L114 144 L116 57 Z" 
              fill="#FAF0A6" 
              stroke="#111111" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />
            {/* Horizontal Spine Ribbing / Binding Bands */}
            <line x1="102" y1="67" x2="115" y2="69" stroke="#111111" strokeWidth="2.5" />
            <line x1="102" y1="71" x2="115" y2="73" stroke="#111111" strokeWidth="1.5" />

            <line x1="101" y1="92" x2="115" y2="94" stroke="#111111" strokeWidth="2.5" />
            <line x1="101" y1="96" x2="115" y2="98" stroke="#111111" strokeWidth="1.5" />

            <line x1="101" y1="116" x2="114" y2="118" stroke="#111111" strokeWidth="2.5" />
            <line x1="101" y1="120" x2="114" y2="122" stroke="#111111" strokeWidth="1.5" />

            {/* Right book side cover in black */}
            <path 
              d="M116 57 L114 144 L127 144 L128 62 Z" 
              fill="#181818" 
              stroke="#111111" 
              strokeWidth="2.2" 
              strokeLinejoin="round" 
            />
            {/* White pages strip on right book edge */}
            <path 
              d="M124 64 L122 144 L125 144 L127 65 Z" 
              fill="#FFFFFF" 
            />
          </g>

          {/* BOTTOM GREEN HERALDIC BANNER WITH "NASELS" */}
          <g id="banner-group">
            {/* Left Banner Swallowtail End */}
            <path 
              d="M26 120 L48 122 L46 148 L24 146 L33 133 Z" 
              fill="#0A5930" 
              stroke="#06381D" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Left Banner Rear Fold Shadow */}
            <path 
              d="M48 122 L46 148 L54 154 L54 128 Z" 
              fill="#052E17" 
            />

            {/* Right Banner Swallowtail End */}
            <path 
              d="M174 120 L152 122 L154 148 L176 146 L167 133 Z" 
              fill="#0A5930" 
              stroke="#06381D" 
              strokeWidth="1.5" 
              strokeLinejoin="round" 
            />
            {/* Right Banner Rear Fold Shadow */}
            <path 
              d="M152 122 L154 148 L146 154 L146 128 Z" 
              fill="#052E17" 
            />

            {/* Main Center Curved Banner (Dropping curve / Rocker ribbon) */}
            <path 
              d="
                M26 122 
                C65 119, 135 119, 174 122 
                C184 145, 174 165, 160 167 
                C124 174, 76 174, 40 167 
                C26 165, 16 145, 26 122 
                Z" 
              fill="#0A5930" 
              stroke="#06381D" 
              strokeWidth="2" 
              strokeLinejoin="round" 
            />

            {/* Banner Top Highlight Curve */}
            <path 
              d="M32 125 C68 122, 132 122, 168 125" 
              stroke="#137743" 
              strokeWidth="1.5" 
              fill="none" 
            />

            {/* "NASELS" TEXT IN BOLD CRISP WHITE ALL-CAPS */}
            <text 
              x="100" 
              y="153" 
              textAnchor="middle" 
              fill="#FFFFFF" 
              fontSize="24" 
              fontFamily="system-ui, -apple-system, sans-serif" 
              fontWeight="900" 
              letterSpacing="2.5"
              style={{ filter: 'drop-shadow(0px 1px 1.5px rgba(0,0,0,0.5))' }}
            >
              NASELS
            </text>
          </g>
        </svg>
      </div>

      {/* Enlarged Modal Preview on click */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-[#FAF7EE] border border-[#F0EAD6] p-6 rounded-2xl max-w-sm w-full text-center shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#F0EAD6]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E5C36]">
                Official Departmental Emblem
              </span>
              <button 
                onClick={() => setShowModal(false)}
                className="text-xs text-[#525D56] hover:text-[#141A16] px-2 py-0.5 rounded cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <div className="w-56 h-56 mx-auto rounded-lg overflow-hidden shadow-md border-2 border-[#0A5930]">
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Base Background Cream Parchment */}
                <rect x="4" y="4" width="192" height="192" rx="4" fill="#FAF3BA" stroke="#0A5930" strokeWidth="8" />
                <rect x="11" y="11" width="178" height="178" rx="2" fill="none" stroke="#0A5930" strokeWidth="1.2" opacity="0.35" />

                {/* Lower Purple Wings */}
                <g fill="#7A1C64" stroke="#480E3A" strokeWidth="1.2" strokeLinejoin="round">
                  <path d="M52 122 C48 136, 62 146, 78 144 C70 137, 65 128, 68 120 Z" />
                  <path d="M148 122 C152 136, 138 146, 122 144 C130 137, 135 128, 132 120 Z" />
                </g>

                {/* Flanking Purple Ribbons */}
                <g fill="#7A1C64" stroke="#480E3A" strokeWidth="1.2" strokeLinejoin="round">
                  <path d="M59 42 L65 52 C60 62, 53 72, 60 84 C66 94, 69 104, 53 112 L56 102 C68 96, 62 86, 57 78 C52 68, 56 56, 53 43 Z" />
                  <path d="M53 43 L59 42 L64 50 L59 47 L54 55 Z" fill="#7A1C64" />
                  <path d="M141 42 L135 52 C140 62, 147 72, 140 84 C134 94, 131 104, 147 112 L144 102 C132 96, 138 86, 143 78 C148 68, 144 56, 147 43 Z" />
                  <path d="M147 43 L141 42 L136 50 L141 47 L146 55 Z" fill="#7A1C64" />
                </g>

                {/* Upright Books */}
                <g id="modal-books">
                  <path d="M74 44 L92 27 L114 34 L96 51 Z" fill="#181818" stroke="#111111" strokeWidth="2.5" strokeLinejoin="round" />
                  <path d="M78 43 L94 28 L110 34 L94 48 Z" fill="#FFFEE8" stroke="#181818" strokeWidth="1.2" />
                  <path d="M82 40 L97 29 M86 42 L101 31 M90 44 L105 33" stroke="#C8C090" strokeWidth="0.8" />

                  <path d="M94 51 L110 35 L127 41 L111 57 Z" fill="#181818" stroke="#111111" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M98 50 L112 37 L124 41 L110 55 Z" fill="#FFFEE8" stroke="#181818" strokeWidth="1" />

                  <path d="M71 44 L70 144 L76 144 L77 48 Z" fill="#181818" stroke="#111111" strokeWidth="1" />
                  <path d="M76 48 L75 144 L101 144 L102 53 Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2.2" strokeLinejoin="round" />
                  <line x1="88" y1="88" x2="94" y2="88" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="88" y1="94" x2="94" y2="94" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="88" y1="112" x2="94" y2="112" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="88" y1="118" x2="94" y2="118" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" />

                  <path d="M102 53 L101 144 L114 144 L116 57 Z" fill="#FAF0A6" stroke="#111111" strokeWidth="2" strokeLinejoin="round" />
                  <line x1="102" y1="67" x2="115" y2="69" stroke="#111111" strokeWidth="2.5" />
                  <line x1="102" y1="71" x2="115" y2="73" stroke="#111111" strokeWidth="1.5" />
                  <line x1="101" y1="92" x2="115" y2="94" stroke="#111111" strokeWidth="2.5" />
                  <line x1="101" y1="96" x2="115" y2="98" stroke="#111111" strokeWidth="1.5" />
                  <line x1="101" y1="116" x2="114" y2="118" stroke="#111111" strokeWidth="2.5" />
                  <line x1="101" y1="120" x2="114" y2="122" stroke="#111111" strokeWidth="1.5" />

                  <path d="M116 57 L114 144 L127 144 L128 62 Z" fill="#181818" stroke="#111111" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M124 64 L122 144 L125 144 L127 65 Z" fill="#FFFFFF" />
                </g>

                {/* Banner */}
                <g id="modal-banner">
                  <path d="M26 120 L48 122 L46 148 L24 146 L33 133 Z" fill="#0A5930" stroke="#06381D" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M48 122 L46 148 L54 154 L54 128 Z" fill="#052E17" />
                  <path d="M174 120 L152 122 L154 148 L176 146 L167 133 Z" fill="#0A5930" stroke="#06381D" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M152 122 L154 148 L146 154 L146 128 Z" fill="#052E17" />
                  <path 
                    d="
                      M26 122 
                      C65 119, 135 119, 174 122 
                      C184 145, 174 165, 160 167 
                      C124 174, 76 174, 40 167 
                      C26 165, 16 145, 26 122 
                      Z" 
                    fill="#0A5930" 
                    stroke="#06381D" 
                    strokeWidth="2" 
                    strokeLinejoin="round" 
                  />
                  <path d="M32 125 C68 122, 132 122, 168 125" stroke="#137743" strokeWidth="1.5" fill="none" />
                  <text 
                    x="100" 
                    y="153" 
                    textAnchor="middle" 
                    fill="#FFFFFF" 
                    fontSize="24" 
                    fontFamily="system-ui, -apple-system, sans-serif" 
                    fontWeight="900" 
                    letterSpacing="2.5"
                    style={{ filter: 'drop-shadow(0px 1px 1.5px rgba(0,0,0,0.5))' }}
                  >
                    NASELS
                  </text>
                </g>
              </svg>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#141A16] font-editorial">
                NASELS UNIZIK Crest
              </h4>
              <p className="text-[11px] text-[#525D56] leading-relaxed">
                National Association of Students of English and Literary Studies, Department of English Language & Literature, Faculty of Arts, Nnamdi Azikiwe University, Awka.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

