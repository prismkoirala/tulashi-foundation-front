export function Mountains({ className = '' }) {
  return (
    <svg
      className={`hero-mountains ${className}`}
      viewBox="0 0 1440 190"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 190 L0 120 L140 40 L260 110 L380 20 L520 130 L640 60 L780 140 L900 30 L1040 120 L1160 55 L1300 130 L1440 70 L1440 190 Z"
        fill="rgba(255,255,255,0.08)"
      />
      <path
        d="M0 190 L0 150 L180 80 L340 150 L500 70 L660 155 L840 90 L1000 160 L1180 100 L1330 160 L1440 120 L1440 190 Z"
        fill="#fffdf8"
      />
      <path
        d="M380 20 L410 55 L380 42 L352 58 Z M900 30 L928 62 L900 50 L874 64 Z M140 40 L162 66 L140 56 L120 68 Z"
        fill="rgba(255,255,255,0.9)"
      />
    </svg>
  );
}

export function Divider() {
  return (
    <div className="rhombus-divider" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14">
        <rect x="3" y="3" width="8" height="8" transform="rotate(45 7 7)" fill="currentColor" />
      </svg>
    </div>
  );
}

const ICONS = {
  book: (
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v15.5H6.5A2.5 2.5 0 0 0 4 20Zm0 0V20M4 4.5V19a2 2 0 0 1 2-2h14" />
  ),
  heart: (
    <path d="M12 20s-7-4.35-9.5-8.5C.9 8 2.6 4.5 6 4.5c2 0 3.4 1.1 4.2 2.3.3.45.5.7.8.7s.5-.25.8-.7c.8-1.2 2.2-2.3 4.2-2.3 3.4 0 5.1 3.5 3.5 7-2.5 4.15-9.5 8.5-9.5 8.5Z" />
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.8 13.5 7.5 21l4.5-2.6L16.5 21l-1.3-7.5" />
    </>
  ),
  pencil: (
    <path d="M4 20l1.2-4.2L16.5 4.5a2.1 2.1 0 0 1 3 3L8.2 18.8 4 20Zm11-13 3 3" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.8-3.2 3.4-5 6.5-5s5.7 1.8 6.5 5M15.5 5.2a3.5 3.5 0 0 1 0 5.6M18 15.4c2 .7 3.2 2.2 3.7 4.6" />
    </>
  ),
  lamp: (
    <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3Z" />
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
};

export function Icon({ name, size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}
