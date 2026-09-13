function Drama({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* drawn-back velvet curtains, top corners */}
      <path
        d="M0 0 Q40 60 20 140 Q10 180 0 200 L0 0 Z"
        fill={accent}
        opacity="0.18"
      />
      <path
        d="M300 0 Q260 60 280 140 Q290 180 300 200 L300 0 Z"
        fill={accent}
        opacity="0.18"
      />
      <path
        d="M0 0 Q40 55 22 135"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M300 0 Q260 55 278 135"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.3"
      />
      {/* stage floor perspective lines converging to a vanishing point */}
      <g stroke={accent} strokeWidth="1" opacity="0.2">
        <line x1="0" y1="290" x2="150" y2="235" />
        <line x1="60" y1="292" x2="150" y2="235" />
        <line x1="150" y1="292" x2="150" y2="235" />
        <line x1="240" y1="292" x2="150" y2="235" />
        <line x1="300" y1="290" x2="150" y2="235" />
      </g>
      {/* drifting dust in the light */}
      <circle cx="110" cy="120" r="1.5" fill={accent} opacity="0.4" />
      <circle cx="175" cy="95" r="1" fill={accent} opacity="0.3" />
      <circle cx="140" cy="150" r="1.2" fill={accent} opacity="0.35" />
    </svg>
  );
}

function Comedy({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* sunburst from the corner */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * (Math.PI / 2) - Math.PI / 4;
        return (
          <line
            key={i}
            x1="300"
            y1="0"
            x2={300 - Math.cos(angle) * 220}
            y2={Math.sin(angle) * 220 + 40}
            stroke={accent}
            strokeWidth="3"
            opacity="0.08"
          />
        );
      })}
      {/* carnival tent skyline along the bottom */}
      <g opacity="0.22">
        {[0, 1, 2, 3, 4].map((i) => (
          <polygon
            key={i}
            points={`${i * 65},280 ${i * 65 + 32},220 ${i * 65 + 64},280`}
            fill={accent}
          />
        ))}
      </g>
      {/* pennant flag string above */}
      <path
        d="M0 60 Q150 20 300 60"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        opacity="0.3"
      />
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((t, i) => {
        const x = t * 300;
        const y = 60 - Math.sin(t * Math.PI) * 40;
        return (
          <polygon
            key={i}
            points={`${x - 6},${y} ${x + 6},${y} ${x},${y + 12}`}
            fill={accent}
            opacity="0.4"
          />
        );
      })}
    </svg>
  );
}

function Horror({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle
        cx="245"
        cy="45"
        r="20"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* bat silhouettes */}
      <path
        d="M60 50 q8 -8 8 4 q0 -12 8 -4 M180 30 q6 -6 6 3 q0 -9 6 -3"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
        opacity="0.35"
      />
      {/* jagged bare tree line + tombstones along the horizon */}
      <g opacity="0.3" stroke={accent} strokeWidth="1.5" fill="none">
        <path d="M10 260 L10 200 L2 220 M10 210 L20 225" />
        <path d="M270 265 L270 195 L280 215 M270 205 L258 218" />
      </g>
      <g fill={accent} opacity="0.22">
        <rect x="30" y="245" width="20" height="30" rx="4" />
        <rect x="230" y="250" width="18" height="25" rx="4" />
        <rect x="60" y="255" width="14" height="20" rx="3" />
      </g>
      {/* heavy ground fog */}
      <path
        d="M0 270 Q75 250 150 270 T300 270"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.35"
      />
      <path
        d="M0 282 Q75 262 150 282 T300 282"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.25"
      />
    </svg>
  );
}

function Romance({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="235" cy="55" r="26" fill={accent} opacity="0.12" />
      <circle
        cx="235"
        cy="55"
        r="16"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.35"
      />
      {[...Array(10)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 37 + 15) % 300}
          cy={20 + ((i * 53) % 90)}
          r="1.2"
          fill={accent}
          opacity="0.3"
        />
      ))}
      {/* rooftop skyline with a few lit windows */}
      <g opacity="0.25">
        <rect x="10" y="220" width="40" height="70" fill={accent} />
        <rect x="55" y="195" width="34" height="95" fill={accent} />
        <rect x="215" y="205" width="36" height="85" fill={accent} />
        <rect x="255" y="230" width="38" height="60" fill={accent} />
      </g>
      <g fill={accent} opacity="0.55">
        <rect x="18" y="235" width="6" height="6" />
        <rect x="34" y="250" width="6" height="6" />
        <rect x="65" y="215" width="6" height="6" />
        <rect x="225" y="225" width="6" height="6" />
      </g>
    </svg>
  );
}

function Thriller({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* noir city skyline */}
      <g opacity="0.28" fill={accent}>
        <rect x="0" y="210" width="35" height="80" />
        <rect x="40" y="180" width="28" height="110" />
        <rect x="75" y="225" width="30" height="65" />
        <rect x="220" y="195" width="32" height="95" />
        <rect x="258" y="215" width="42" height="75" />
      </g>
      {/* crossing searchlight beams */}
      <polygon
        points="30,290 90,290 170,20 150,20"
        fill={accent}
        opacity="0.06"
      />
      <polygon
        points="270,290 220,290 140,20 165,20"
        fill={accent}
        opacity="0.06"
      />
      {/* rain */}
      {[...Array(14)].map((_, i) => (
        <line
          key={i}
          x1={(i * 23 + 5) % 300}
          y1={(i * 41) % 260}
          x2={((i * 23 + 5) % 300) - 8}
          y2={((i * 41) % 260) + 22}
          stroke={accent}
          strokeWidth="1"
          opacity="0.2"
        />
      ))}
    </svg>
  );
}

function Sports({ accent }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="genre-backdrop"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* stadium arc silhouette */}
      <path
        d="M-20 290 Q150 170 320 290"
        fill="none"
        stroke={accent}
        strokeWidth="10"
        opacity="0.15"
      />
      {/* floodlight towers */}
      <g opacity="0.3" stroke={accent} strokeWidth="2" fill="none">
        <line x1="25" y1="290" x2="25" y2="180" />
        <line x1="275" y1="290" x2="275" y2="180" />
      </g>
      <g fill={accent} opacity="0.25">
        <rect x="10" y="165" width="30" height="16" />
        <rect x="260" y="165" width="30" height="16" />
      </g>
      {/* light beams down onto the field */}
      <polygon points="25,181 5,290 60,290" fill={accent} opacity="0.06" />
      <polygon points="275,181 240,290 295,290" fill={accent} opacity="0.06" />
      {/* track lines on the ground */}
      <g stroke={accent} strokeWidth="1" opacity="0.2">
        <line x1="0" y1="278" x2="300" y2="278" />
        <line x1="0" y1="286" x2="300" y2="286" />
      </g>
    </svg>
  );
}

const BACKDROPS = { Drama, Comedy, Horror, Romance, Thriller, Sports };

export default function GenreBackdrop({ genre, accent }) {
  const BackdropComponent = BACKDROPS[genre] || Drama;
  return <BackdropComponent accent={accent} />;
}
