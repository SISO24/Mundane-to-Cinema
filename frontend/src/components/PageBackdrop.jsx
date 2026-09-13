export default function PageBackdrop() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="page-backdrop-svg"
      >
        <defs>
          <linearGradient id="heroWash" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#05060a" />
            <stop offset="45%" stopColor="#0a0710" />
            <stop offset="100%" stopColor="#1a0808" />
          </linearGradient>
          <radialGradient id="heroSpot" cx="72%" cy="8%" r="55%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="1600" height="1000" fill="url(#heroWash)" />
        <rect width="1600" height="1000" fill="url(#heroSpot)" />

        {/* drawn-back curtain, left edge only, fading into the dark */}
        <path
          d="M0 0 Q90 140 55 320 Q35 420 0 470 L0 0 Z"
          fill="#e63946"
          opacity="0.22"
        />
        <path
          d="M0 0 Q90 135 57 315"
          fill="none"
          stroke="#e63946"
          strokeWidth="2"
          opacity="0.35"
        />

        {/* spotlight cone */}
        <polygon
          points="1150,0 1000,620 1300,620"
          fill="#e63946"
          opacity="0.12"
        />

        {/* solitary figure, larger and more detailed, standing right-of-center */}
        <g transform="translate(1080,340)" opacity="0.92">
          <path
            d="M110 0 c-30 0 -52 26 -52 58 c0 26 14 46 32 55 l-9 32 c24 11 50 11 74 0 l-9 -32 c18 -9 32 -29 32 -55 c0 -32 -22 -58 -52 -58 Z"
            fill="#1c0a0d"
          />
          <path
            d="M50 150 c0 -22 28 -35 65 -35 c37 0 65 13 65 35 l16 230 c2 20 -11 35 -30 35 h-102 c-19 0 -32 -15 -30 -35 Z"
            fill="#1c0a0d"
          />
          <path
            d="M50 178 q-32 22 -37 76"
            stroke="#1c0a0d"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M195 178 q32 22 37 76"
            stroke="#1c0a0d"
            strokeWidth="15"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <ellipse
          cx="1195"
          cy="670"
          rx="150"
          ry="20"
          fill="#000"
          opacity="0.5"
        />

        {/* perspective floor lines converging toward the figure */}
        <g stroke="#e63946" strokeWidth="1.2" opacity="0.2">
          <line x1="700" y1="1000" x2="1195" y2="640" />
          <line x1="950" y1="1000" x2="1195" y2="640" />
          <line x1="1195" y1="1000" x2="1195" y2="640" />
          <line x1="1450" y1="1000" x2="1195" y2="640" />
          <line x1="1600" y1="950" x2="1195" y2="640" />
        </g>

        {/* drifting dust in the light */}
        <circle cx="1120" cy="230" r="2.5" fill="#e63946" opacity="0.55" />
        <circle cx="1210" cy="180" r="1.8" fill="#e63946" opacity="0.45" />
        <circle cx="1160" cy="280" r="2" fill="#e63946" opacity="0.5" />

        {/* grain */}
        <filter id="heroNoise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="1600"
          height="1000"
          opacity="0.05"
          filter="url(#heroNoise)"
        />
      </svg>
      <div className="page-backdrop-scrim" />
    </div>
  );
}
