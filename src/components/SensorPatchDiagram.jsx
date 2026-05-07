export default function SensorPatchDiagram() {
  const cyan   = '#7EC8E3'
  const pink   = '#F472B6'
  const violet = '#8B7CF6'
  const fg     = '#EDE9FF'
  const rot    = -17.2

  // ── Pipe geometry ─────────────────────────────────────────────
  // A=(88,392)  B=(874,148)  r=68
  // top offset = (-20.1, -64.9)   bottom offset = (20.1, 64.9)
  // Pipe corners:  TL(67.9,327.1) TR(853.9,83.1)  BL(108.1,456.9) BR(894.1,212.9)
  //
  // Patch: 38%–65% along pipe
  //   PL=(387,299)  PR=(599,233)
  //   PTL(366.9,234.1) PTR(578.9,168.1)  PBL(407.1,363.9) PBR(619.1,297.9)
  //
  // Patch layer boundaries (1/3 and 2/3 from top):
  //   B1: (380,277) → (592,211)    B2: (394,321) → (606,255)

  const outerArrows = [
    [127,380],[182,363],[237,346],[292,329],[347,312],
    [615,229],[670,212],[717,197],[772,181],[827,163],
  ]
  const innerArrows = [
    [418,290],[473,272],[528,255],[575,241],
  ]

  return (
    <svg viewBox="0 0 1000 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Pipe metallic gradient (perpendicular axis) */}
        <linearGradient id="spd-pipe" gradientUnits="userSpaceOnUse"
          x1="461" y1="205" x2="501" y2="335">
          <stop offset="0%"   stopColor="#676B78" />
          <stop offset="8%"   stopColor="#80848E" />
          <stop offset="22%"  stopColor="#484C5A" />
          <stop offset="55%"  stopColor="#2C2F3E" />
          <stop offset="82%"  stopColor="#191B26" />
          <stop offset="100%" stopColor="#0B0D15" />
        </linearGradient>
        <radialGradient id="spd-cap-l" cx="34%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#7C808C" />
          <stop offset="52%"  stopColor="#373A48" />
          <stop offset="100%" stopColor="#0B0D15" />
        </radialGradient>

        {/* Layer gradients */}
        <linearGradient id="spd-l1" gradientUnits="userSpaceOnUse"
          x1="461" y1="205" x2="480" y2="277">
          <stop offset="0%"   stopColor="#C4B8FF" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#A090F5" stopOpacity="0.60" />
        </linearGradient>
        <linearGradient id="spd-l2" gradientUnits="userSpaceOnUse"
          x1="480" y1="277" x2="494" y2="321">
          <stop offset="0%"   stopColor="#5040D8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4535C8" stopOpacity="0.80" />
        </linearGradient>
        <linearGradient id="spd-l3" gradientUnits="userSpaceOnUse"
          x1="494" y1="321" x2="501" y2="335">
          <stop offset="0%"   stopColor="#5BAED4" stopOpacity="0.70" />
          <stop offset="100%" stopColor="#4898C0" stopOpacity="0.60" />
        </linearGradient>

        <filter id="spd-glow" x="-130%" y="-130%" width="360%" height="360%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── PIPE ─────────────────────────────────────────────── */}
      <path d="M 67.9,327.1 L 853.9,83.1 L 894.1,212.9 L 108.1,456.9 Z"
        fill="url(#spd-pipe)" />
      <line x1="67.9" y1="327.1" x2="853.9" y2="83.1"
        stroke="white" strokeWidth="1.2" strokeOpacity="0.18" />
      <line x1="108.1" y1="456.9" x2="894.1" y2="212.9"
        stroke="#050710" strokeWidth="2.5" />

      {/* Right end cap */}
      <ellipse cx="874" cy="148" rx="20" ry="68" transform={`rotate(${rot},874,148)`} fill="#191B26"/>
      <ellipse cx="874" cy="148" rx="20" ry="54" transform={`rotate(${rot},874,148)`} fill="#5BAED4" fillOpacity="0.22"/>
      <ellipse cx="874" cy="148" rx="20" ry="42" transform={`rotate(${rot},874,148)`} fill="#4535C8" fillOpacity="0.30"/>
      <ellipse cx="874" cy="148" rx="20" ry="30" transform={`rotate(${rot},874,148)`} fill="#292C3C"/>
      <ellipse cx="874" cy="148" rx="13" ry="18" transform={`rotate(${rot},874,148)`} fill="#0E1018"/>
      <ellipse cx="874" cy="148" rx="7"  ry="9"  transform={`rotate(${rot},874,148)`} fill="#070911"/>

      {/* Left end cap */}
      <ellipse cx="88" cy="392" rx="20" ry="68" transform={`rotate(${rot},88,392)`} fill="url(#spd-cap-l)"/>
      <ellipse cx="88" cy="392" rx="12" ry="54" transform={`rotate(${rot},88,392)`} fill="#0E1018" fillOpacity="0.88"/>
      <ellipse cx="88" cy="392" rx="6"  ry="42" transform={`rotate(${rot},88,392)`} fill="#070911"/>

      {/* Wave arrows */}
      {outerArrows.map(([cx, cy], i) => (
        <g key={`oa${i}`} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <path d="M-7,5 L0,0 L-7,-5" stroke={fg} strokeWidth="1.2" strokeOpacity="0.22" />
        </g>
      ))}
      {innerArrows.map(([cx, cy], i) => (
        <g key={`ia${i}`} transform={`translate(${cx},${cy}) rotate(${rot})`}>
          <path d="M-7,5 L0,0 L-7,-5" stroke={fg} strokeWidth="1.2" strokeOpacity="0.08" />
        </g>
      ))}

      {/* ── SENSOR PATCH (3 distinct layers) ────────────────── */}

      {/* Layer 3 — Coupling/Adhesive (bottom, cyan-blue) */}
      <path d="M 394,321 L 606,255 L 619.1,297.9 L 407.1,363.9 Z" fill="url(#spd-l3)" />

      {/* Layer 2 — PLLA Piezoelectric (middle, deep violet-blue) */}
      <path d="M 380,277 L 592,211 L 606,255 L 394,321 Z" fill="url(#spd-l2)" />
      {/* PLLA diagonal crystal texture lines */}
      {[0,1,2,3,4,5,6,7].map(i => {
        const ox = i * 28
        return (
          <line key={i}
            x1={380 + ox} y1={277 - ox * 0.31}
            x2={394 + ox} y2={321 - ox * 0.31}
            stroke="white" strokeWidth="0.6" strokeOpacity="0.10"
          />
        )
      })}

      {/* Layer 1 — Thin-film Antenna (top, light violet) */}
      <path d="M 366.9,234.1 L 578.9,168.1 L 592,211 L 380,277 Z" fill="url(#spd-l1)" />
      {/* Antenna dot-grid pattern */}
      {[0,1,2,3,4,5,6].map(col =>
        [0,1].map(row => {
          const cx = 378 + col * 33 + row * 7
          const cy = 272 - col * 10.3 + row * (-21)
          return (
            <circle key={`${col}-${row}`} cx={cx} cy={cy} r="1.5"
              fill="white" fillOpacity="0.22" />
          )
        })
      )}

      {/* Patch borders */}
      <line x1="366.9" y1="234.1" x2="578.9" y2="168.1"
        stroke="white" strokeWidth="0.8" strokeOpacity="0.30" />
      <line x1="366.9" y1="234.1" x2="578.9" y2="168.1"
        stroke="#C4B8FF" strokeWidth="1.6" strokeOpacity="0.85" />
      <line x1="380" y1="277" x2="592" y2="211"
        stroke="#5040D8" strokeWidth="0.8" strokeOpacity="0.55" />
      <line x1="394" y1="321" x2="606" y2="255"
        stroke="#5BAED4" strokeWidth="0.8" strokeOpacity="0.50" />
      <line x1="407.1" y1="363.9" x2="619.1" y2="297.9"
        stroke="#4898C0" strokeWidth="1.2" strokeOpacity="0.50" />

      {/* Left patch cap — shows cross-section layers */}
      <ellipse cx="387" cy="299" rx="20" ry="68" transform={`rotate(${rot},387,299)`}
        fill="#C4B8FF" fillOpacity="0.35" stroke="#C4B8FF" strokeWidth="1.5" strokeOpacity="0.75" />
      <ellipse cx="387" cy="299" rx="20" ry="56" transform={`rotate(${rot},387,299)`}
        fill="#5040D8" fillOpacity="0.55" stroke="#5040D8" strokeWidth="1" strokeOpacity="0.50" />
      <ellipse cx="387" cy="299" rx="20" ry="44" transform={`rotate(${rot},387,299)`}
        fill="#5BAED4" fillOpacity="0.45" stroke="#5BAED4" strokeWidth="1" strokeOpacity="0.45" />
      <ellipse cx="387" cy="299" rx="20" ry="30" transform={`rotate(${rot},387,299)`}
        fill="#2A2D3C" />
      <ellipse cx="387" cy="299" rx="12" ry="18" transform={`rotate(${rot},387,299)`}
        fill="#0E1018" />
      <ellipse cx="387" cy="299" rx="6"  ry="9"  transform={`rotate(${rot},387,299)`}
        fill="#070911" />

      {/* Right patch cap */}
      <ellipse cx="599" cy="233" rx="20" ry="68" transform={`rotate(${rot},599,233)`}
        fill="#C4B8FF" fillOpacity="0.22" stroke="#C4B8FF" strokeWidth="1.5" strokeOpacity="0.55" />
      <ellipse cx="599" cy="233" rx="20" ry="56" transform={`rotate(${rot},599,233)`}
        fill="#5040D8" fillOpacity="0.40" stroke="#5040D8" strokeWidth="1" strokeOpacity="0.35" />
      <ellipse cx="599" cy="233" rx="20" ry="44" transform={`rotate(${rot},599,233)`}
        fill="#5BAED4" fillOpacity="0.30" stroke="#5BAED4" strokeWidth="1" strokeOpacity="0.30" />
      <ellipse cx="599" cy="233" rx="20" ry="30" transform={`rotate(${rot},599,233)`}
        fill="#1A1C26" />
      <ellipse cx="599" cy="233" rx="13" ry="18" transform={`rotate(${rot},599,233)`}
        fill="#0E1018" />
      <ellipse cx="599" cy="233" rx="7"  ry="9"  transform={`rotate(${rot},599,233)`}
        fill="#070911" />

      {/* ── LAYER LABELS inside patch ─────────────────────────── */}
      {/* These sit inside the patch to label each visible band */}
      <text x="476" y="192" fill="#EDE9FF" fontSize="8.5"
        fontFamily="'IBM Plex Mono',monospace" textAnchor="middle"
        letterSpacing="1.5" opacity="0.70">ANTENNA LAYER</text>
      <text x="490" y="243" fill="#EDE9FF" fontSize="8.5"
        fontFamily="'IBM Plex Mono',monospace" textAnchor="middle"
        letterSpacing="1.5" opacity="0.70">PLLA PIEZOELECTRIC</text>
      <text x="506" y="296" fill="#EDE9FF" fontSize="8.5"
        fontFamily="'IBM Plex Mono',monospace" textAnchor="middle"
        letterSpacing="1.5" opacity="0.65">COUPLING LAYER</text>

      {/* ── ANNOTATION LINES (L-shaped: diagonal + horizontal) ── */}
      {/*
        Left side (2 annotations):
          1. Thin-film Antenna  → elbow (170, 84)
          2. Battery-Free Power → elbow (170, 174)
        Right side (3 annotations):
          3. Total Thickness    → elbow (830, 108)
          4. Guided Wave        → elbow (830, 248)
          5. Flexible Design    → elbow (830, 388)
      */}

      {/* — 1 Thin-film Antenna (cyan) — */}
      <path d={`M 473,201 L 170,84 L 15,84`}
        stroke={cyan} strokeWidth="1.4" strokeOpacity="0.70" fill="none"/>
      <circle cx="473" cy="201" r="4" fill={cyan} filter="url(#spd-glow)" />
      <text x="18" y="78" fill={cyan} fontSize="13"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="1.0">
        Integrated Thin-film Antenna
      </text>
      <text x="18" y="97" fill={cyan} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="0.65">
        (Antenna Interface)
      </text>

      {/* — 2 Battery-Free Power (pink) — */}
      <path d={`M 387,299 L 170,174 L 15,174`}
        stroke={pink} strokeWidth="1.4" strokeOpacity="0.70" fill="none"/>
      <circle cx="387" cy="299" r="4" fill={pink} filter="url(#spd-glow)" />
      <text x="18" y="168" fill={pink} fontSize="13"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="1.0">
        Battery-Free Power
      </text>
      <text x="18" y="187" fill={pink} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="0.65">
        (915 MHz RF Harvesting)
      </text>

      {/* — 3 Total Thickness (violet) — */}
      <path d={`M 599,233 L 830,108 L 985,108`}
        stroke={violet} strokeWidth="1.4" strokeOpacity="0.70" fill="none"/>
      <circle cx="599" cy="233" r="4" fill={violet} filter="url(#spd-glow)" />
      <text x="840" y="102" fill={violet} fontSize="13"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="1.0">
        Total Thickness
      </text>
      <text x="840" y="121" fill={violet} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="0.65">
        (~200 μm / 0.2 mm)
      </text>

      {/* — 4 Guided Wave (cyan) — */}
      <path d={`M 717,197 L 830,248 L 985,248`}
        stroke={cyan} strokeWidth="1.4" strokeOpacity="0.70" fill="none"/>
      <circle cx="717" cy="197" r="4" fill={cyan} filter="url(#spd-glow)" />
      <text x="840" y="242" fill={cyan} fontSize="13"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="1.0">
        Guided Wave
      </text>
      <text x="840" y="261" fill={cyan} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="0.65">
        Propagation Path →
      </text>

      {/* — 5 Flexible Design (pink) — */}
      <path d={`M 513,331 L 830,388 L 985,388`}
        stroke={pink} strokeWidth="1.4" strokeOpacity="0.70" fill="none"/>
      <circle cx="513" cy="331" r="4" fill={pink} filter="url(#spd-glow)" />
      <text x="840" y="382" fill={pink} fontSize="13"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="1.0">
        Flexible Design
      </text>
      <text x="840" y="401" fill={pink} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" letterSpacing="0.3" opacity="0.65">
        All-Solid-State
      </text>

      {/* ── TITLE ─────────────────────────────────────────────── */}
      <text x="500" y="34" fill={fg} fontSize="11"
        fontFamily="'IBM Plex Mono',monospace" textAnchor="middle"
        letterSpacing="2.5" opacity="0.45">
        PLLA-BASED SELF-POWERED SENSOR PATCH
      </text>
    </svg>
  )
}
