function Figure({ d, accent }) {
  return <path d={d} fill={accent} opacity="0.85" />;
}

// ---------- DRAMA ----------

function DramaSpotlight({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      <polygon points="150,10 90,260 210,260" fill={accent} opacity="0.08" />
      <Figure
        accent={accent}
        d="M150 150 c-10 0 -17 9 -17 20 c0 9 5 16 11 19 l-14 55 c-2 8 3 16 12 16 h16 c9 0 14 -8 12 -16 l-14 -55 c6 -3 11 -10 11 -19 c0 -11 -7 -20 -17 -20 Z"
      />
      <line
        x1="60"
        y1="262"
        x2="240"
        y2="262"
        stroke={accent}
        strokeWidth="1"
        opacity="0.25"
      />
      <circle cx="90" cy="240" r="2" fill={accent} opacity="0.3" />
      <circle cx="205" cy="250" r="1.5" fill={accent} opacity="0.2" />
    </svg>
  );
}

function DramaDeparture({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* two figures walking apart, dramatic light shafts between them */}
      <polygon points="150,15 120,270 180,270" fill={accent} opacity="0.06" />
      <Figure
        accent={accent}
        d="M95 170 c-8 0 -14 7 -14 15 c0 6 3 11 7 14 l-9 48 c-2 6 2 11 8 11 h12 c6 0 10 -5 8 -11 l-9 -48 c4 -3 7 -8 7 -14 c0 -8 -5 -15 -13 -15 Z"
      />
      <Figure
        accent={accent}
        d="M205 170 c-8 0 -14 7 -14 15 c0 6 3 11 7 14 l-9 48 c-2 6 2 11 8 11 h12 c6 0 10 -5 8 -11 l-9 -48 c4 -3 7 -8 7 -14 c0 -8 -5 -15 -13 -15 Z"
      />
      <line
        x1="60"
        y1="262"
        x2="240"
        y2="262"
        stroke={accent}
        strokeWidth="1"
        opacity="0.2"
      />
      <line
        x1="150"
        y1="40"
        x2="150"
        y2="230"
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="4 6"
        opacity="0.25"
      />
    </svg>
  );
}

// ---------- COMEDY ----------

function ComedyLaugh({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {[...Array(10)].map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const x2 = 150 + Math.cos(angle) * 110;
        const y2 = 150 + Math.sin(angle) * 110;
        return (
          <line
            key={i}
            x1="150"
            y1="150"
            x2={x2}
            y2={y2}
            stroke={accent}
            strokeWidth="2"
            opacity={0.12 + (i % 3) * 0.08}
          />
        );
      })}
      <Figure
        accent={accent}
        d="M120 210 c-9 0 -15 8 -15 17 c0 7 4 13 9 16 l-11 45 c-2 6 2 12 9 12 h14 c7 0 11 -6 9 -12 l-11 -45 c5 -3 9 -9 9 -16 c0 -9 -6 -17 -15 -17 Z"
      />
      <Figure
        accent={accent}
        d="M182 210 c-9 0 -15 8 -15 17 c0 7 4 13 9 16 l-11 45 c-2 6 2 12 9 12 h14 c7 0 11 -6 9 -12 l-11 -45 c5 -3 9 -9 9 -16 c0 -9 -6 -17 -15 -17 Z"
      />
      <line
        x1="112"
        y1="205"
        x2="95"
        y2="180"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <line
        x1="190"
        y1="205"
        x2="207"
        y2="180"
        stroke={accent}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="90" cy="130" r="3" fill={accent} opacity="0.5" />
      <circle cx="215" cy="120" r="2.5" fill={accent} opacity="0.4" />
      <circle cx="160" cy="100" r="2" fill={accent} opacity="0.3" />
    </svg>
  );
}

function ComedyPratfall({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* figure mid-slip, arms and legs flying, comedic motion lines */}
      <g
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      >
        <circle cx="150" cy="170" r="13" fill={accent} stroke="none" />
        <line x1="150" y1="183" x2="165" y2="215" />
        <line x1="165" y1="215" x2="195" y2="200" />
        <line x1="165" y1="215" x2="200" y2="245" />
        <line x1="150" y1="190" x2="115" y2="180" />
        <line x1="150" y1="190" x2="120" y2="225" />
      </g>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={165 + Math.cos(angle) * 30}
            y1={215 + Math.sin(angle) * 30}
            x2={165 + Math.cos(angle) * 55}
            y2={215 + Math.sin(angle) * 55}
            stroke={accent}
            strokeWidth="2"
            opacity="0.3"
          />
        );
      })}
      <ellipse
        cx="150"
        cy="255"
        rx="30"
        ry="7"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        opacity="0.4"
      />
    </svg>
  );
}

// ---------- HORROR ----------

function HorrorDoorway({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      <circle
        cx="235"
        cy="55"
        r="18"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M40 40 L60 70 M60 70 L50 95 M60 70 L78 88 M40 40 L30 65"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
        fill="none"
      />
      <path
        d="M110 100 L110 260 L190 260 L190 100 Q150 75 110 100 Z"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <Figure
        accent={accent}
        d="M150 150 c-9 0 -15 8 -15 17 c0 7 4 13 9 16 l-11 62 c-2 6 2 12 9 12 h16 c7 0 11 -6 9 -12 l-11 -62 c5 -3 9 -9 9 -16 c0 -9 -6 -17 -15 -17 Z"
      />
      <path
        d="M0 250 Q75 232 150 250 T300 250"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M0 265 Q75 247 150 265 T300 265"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.2"
      />
    </svg>
  );
}

function HorrorCandle({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* simple shapes only — the earlier bezier "skull" self-intersected into a
          tree-like blob, so this uses circles/rects instead for a clean read */}
      <circle
        cx="70"
        cy="60"
        r="14"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.35"
      />

      {/* skull: head circle + jaw + eye sockets (cut out using the bg color) */}
      <circle cx="150" cy="140" r="34" fill={accent} opacity="0.7" />
      <rect
        x="132"
        y="160"
        width="36"
        height="22"
        rx="8"
        fill={accent}
        opacity="0.7"
      />
      <circle cx="138" cy="135" r="7" fill="var(--bg)" />
      <circle cx="162" cy="135" r="7" fill="var(--bg)" />
      <rect
        x="146"
        y="148"
        width="8"
        height="10"
        fill="var(--bg)"
        opacity="0.8"
      />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={140 + i * 8}
          y1="172"
          x2={140 + i * 8}
          y2="178"
          stroke="var(--bg)"
          strokeWidth="2"
        />
      ))}

      {/* candle beside it */}
      <rect
        x="205"
        y="190"
        width="14"
        height="55"
        fill={accent}
        opacity="0.5"
      />
      <ellipse cx="212" cy="190" rx="7" ry="4" fill={accent} opacity="0.6" />
      <path
        d="M212 168 q4 -10 0 -18 q-4 8 0 18 Z"
        fill={accent}
        opacity="0.9"
      />
      <circle cx="212" cy="175" r="14" fill={accent} opacity="0.08" />

      <line
        x1="90"
        y1="245"
        x2="230"
        y2="245"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.3"
      />
      <path
        d="M0 260 Q75 242 150 260 T300 260"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.28"
      />
    </svg>
  );
}

// ---------- ROMANCE ----------

function RomanceLights({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      <path
        d="M60 90 Q150 40 240 90"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.35"
      />
      {[0.15, 0.3, 0.45, 0.55, 0.7, 0.85].map((t, i) => {
        const x = 60 + (240 - 60) * t;
        const y = 90 - Math.sin(t * Math.PI) * 50;
        return (
          <circle key={i} cx={x} cy={y + 5} r="3" fill={accent} opacity="0.5" />
        );
      })}
      <Figure
        accent={accent}
        d="M118 190 c-9 0 -15 8 -15 17 c0 7 4 13 9 16 l-10 50 c-2 6 2 12 9 12 h14 c7 0 11 -6 9 -12 l-10 -50 c5 -3 9 -9 9 -16 c0 -9 -6 -17 -15 -17 Z"
      />
      <Figure
        accent={accent}
        d="M182 190 c-9 0 -15 8 -15 17 c0 7 4 13 9 16 l-10 50 c-2 6 2 12 9 12 h14 c7 0 11 -6 9 -12 l-10 -50 c5 -3 9 -9 9 -16 c0 -9 -6 -17 -15 -17 Z"
      />
      <path
        d="M150 210 c-3 -6 -12 -6 -14 2 c-2 6 3 11 14 20 c11 -9 16 -14 14 -20 c-2 -8 -11 -8 -14 -2 Z"
        fill={accent}
        opacity="0.6"
      />
    </svg>
  );
}

function RomanceDance({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* two figures mid-dance-spin, sparkles around them */}
      <g
        stroke={accent}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      >
        <circle cx="130" cy="165" r="12" fill={accent} stroke="none" />
        <line x1="130" y1="177" x2="130" y2="215" />
        <line x1="130" y1="190" x2="105" y2="175" />
        <line x1="130" y1="190" x2="168" y2="195" />
        <line x1="130" y1="215" x2="115" y2="255" />
        <line x1="130" y1="215" x2="145" y2="255" />

        <circle cx="185" cy="160" r="12" fill={accent} stroke="none" />
        <line x1="185" y1="172" x2="185" y2="212" />
        <line x1="185" y1="186" x2="163" y2="197" />
        <line x1="185" y1="186" x2="210" y2="170" />
        <line x1="185" y1="212" x2="170" y2="253" />
        <line x1="185" y1="212" x2="200" y2="253" />
      </g>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const cx = 157 + Math.cos(angle) * 85;
        const cy = 165 + Math.sin(angle) * 85;
        return (
          <circle key={i} cx={cx} cy={cy} r="2" fill={accent} opacity="0.4" />
        );
      })}
    </svg>
  );
}

// ---------- THRILLER ----------

function ThrillerRunning({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {[...Array(9)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={40 + i * 22}
          width="300"
          height="10"
          fill={accent}
          opacity={0.05 + (i % 2) * 0.04}
        />
      ))}
      <g
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      >
        <circle cx="168" cy="150" r="13" fill={accent} stroke="none" />
        <line x1="168" y1="163" x2="150" y2="205" />
        <line x1="150" y1="205" x2="120" y2="200" />
        <line x1="150" y1="205" x2="128" y2="255" />
        <line x1="128" y1="255" x2="108" y2="258" />
        <line x1="150" y1="205" x2="185" y2="230" />
        <line x1="185" y1="230" x2="190" y2="262" />
        <line x1="168" y1="172" x2="140" y2="185" />
        <line x1="140" y1="185" x2="128" y2="165" />
        <line x1="168" y1="172" x2="198" y2="178" />
      </g>
      <circle
        cx="230"
        cy="70"
        r="22"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <line
        x1="230"
        y1="40"
        x2="230"
        y2="58"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="230"
        y1="82"
        x2="230"
        y2="100"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="200"
        y1="70"
        x2="218"
        y2="70"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="242"
        y1="70"
        x2="260"
        y2="70"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.5"
      />
    </svg>
  );
}

function ThrillerCorner({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* figure peeking around a wall corner, single spotlight beam */}
      <rect
        x="0"
        y="60"
        width="150"
        height="210"
        fill={accent}
        opacity="0.06"
      />
      <line
        x1="150"
        y1="60"
        x2="150"
        y2="270"
        stroke={accent}
        strokeWidth="1.5"
        opacity="0.4"
      />
      <g
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      >
        <circle cx="168" cy="160" r="13" fill={accent} stroke="none" />
        <line x1="168" y1="173" x2="168" y2="215" />
        <line x1="168" y1="185" x2="150" y2="200" />
        <line x1="168" y1="215" x2="158" y2="258" />
        <line x1="168" y1="215" x2="180" y2="258" />
      </g>
      <polygon
        points="235,50 260,50 300,250 220,250"
        fill={accent}
        opacity="0.05"
      />
    </svg>
  );
}

// ---------- SPORTS ----------

function SportsJump({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      <polygon points="260,20 60,110 100,130" fill={accent} opacity="0.07" />
      <polygon points="260,20 130,90 155,120" fill={accent} opacity="0.07" />
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={30 + i * 14}
          y1={225 + i * 12}
          x2={110 + i * 14}
          y2={210 + i * 12}
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          opacity={0.55 - i * 0.12}
        />
      ))}
      <g
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      >
        <circle cx="175" cy="140" r="13" fill={accent} stroke="none" />
        <line x1="175" y1="153" x2="168" y2="195" />
        <line x1="168" y1="195" x2="140" y2="175" />
        <line x1="168" y1="195" x2="205" y2="180" />
        <line x1="168" y1="195" x2="178" y2="248" />
        <line x1="178" y1="248" x2="200" y2="258" />
        <line x1="168" y1="195" x2="145" y2="235" />
        <line x1="145" y1="235" x2="150" y2="262" />
      </g>
      <circle
        cx="90"
        cy="255"
        r="8"
        fill="none"
        stroke={accent}
        strokeWidth="2"
        opacity="0.5"
      />
    </svg>
  );
}

function SportsVictory({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* triumphant figure, arms raised, fireworks/confetti burst */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r1 = 70;
        const r2 = 105;
        return (
          <line
            key={i}
            x1={150 + Math.cos(angle) * r1}
            y1={130 + Math.sin(angle) * r1}
            x2={150 + Math.cos(angle) * r2}
            y2={130 + Math.sin(angle) * r2}
            stroke={accent}
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.15 + (i % 4) * 0.08}
          />
        );
      })}
      <g
        stroke={accent}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.88"
      >
        <circle cx="150" cy="170" r="13" fill={accent} stroke="none" />
        <line x1="150" y1="183" x2="150" y2="225" />
        <line x1="150" y1="195" x2="120" y2="165" />
        <line x1="150" y1="195" x2="180" y2="165" />
        <line x1="150" y1="225" x2="132" y2="262" />
        <line x1="150" y1="225" x2="168" y2="262" />
      </g>
    </svg>
  );
}

const GENRE_ART = {
  Drama: [DramaSpotlight, DramaDeparture],
  Comedy: [ComedyLaugh, ComedyPratfall],
  Horror: [HorrorDoorway, HorrorCandle],
  Romance: [RomanceLights, RomanceDance],
  Thriller: [ThrillerRunning, ThrillerCorner],
  Sports: [SportsJump, SportsVictory],
  Blocked: [BlockedStamp, BlockedBarrier],
};

function BlockedStamp({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* a stamped "restricted" seal, rotated slightly like a rubber stamp */}
      <g transform="rotate(-12 150 150)">
        <circle
          cx="150"
          cy="150"
          r="80"
          fill="none"
          stroke={accent}
          strokeWidth="6"
          opacity="0.8"
        />
        <circle
          cx="150"
          cy="150"
          r="68"
          fill="none"
          stroke={accent}
          strokeWidth="2"
          opacity="0.5"
        />
        <line
          x1="150"
          y1="90"
          x2="150"
          y2="120"
          stroke={accent}
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="150" cy="145" r="6" fill={accent} opacity="0.85" />
      </g>
    </svg>
  );
}

function BlockedBarrier({ accent }) {
  return (
    <svg viewBox="0 0 300 300" className="genre-art">
      {/* a barricade / "do not cross" bar across the scene */}
      <g transform="rotate(-6 150 150)">
        <rect
          x="30"
          y="128"
          width="240"
          height="44"
          rx="6"
          fill={accent}
          opacity="0.8"
        />
        {[...Array(6)].map((_, i) => (
          <rect
            key={i}
            x={40 + i * 38}
            y="128"
            width="18"
            height="44"
            fill="var(--bg)"
            opacity="0.9"
          />
        ))}
      </g>
      <circle
        cx="150"
        cy="150"
        r="95"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        opacity="0.3"
      />
      <line
        x1="80"
        y1="80"
        x2="220"
        y2="220"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="220"
        y1="80"
        x2="80"
        y2="220"
        stroke={accent}
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export default function GenreArt({ genre, accent, variantIndex = 0 }) {
  const variants = GENRE_ART[genre] || GENRE_ART.Drama;
  const ArtComponent = variants[variantIndex % variants.length];
  return <ArtComponent accent={accent} />;
}
