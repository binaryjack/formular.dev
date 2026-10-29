import React from 'react';

interface FormularLogoProps {
  readonly size?: number;
  readonly orientation?: 'horizontal' | 'oblique';
  readonly accentColor?: string;
  readonly className?: string;
}

export function FormularLogo({
  size = 24,
  orientation = 'horizontal',
  accentColor = '#6366F1',
  className = '',
}: FormularLogoProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Formular Logo"
    >
      <defs>
        {isHorizontal ? (
          <mask id="formular-orbit-mask-h">
            <rect width="100" height="100" fill="white" />
            {/* Cutout clearance around F vertical stem */}
            <line x1="36" y1="16" x2="36" y2="84" stroke="black" strokeWidth="15" strokeLinecap="round" />
            {/* Cutout clearance around middle bar and terminal node */}
            <line x1="36" y1="48" x2="47" y2="48" stroke="black" strokeWidth="15" strokeLinecap="round" />
            <circle cx="56" cy="48" r="10.5" fill="black" />
          </mask>
        ) : (
          <mask id="formular-orbit-mask-o">
            <rect width="100" height="100" fill="white" />
            {/* Cutout clearance around F vertical stem */}
            <line x1="36" y1="16" x2="36" y2="84" stroke="black" strokeWidth="15" strokeLinecap="round" />
            {/* Cutout clearance around middle bar and terminal node */}
            <line x1="36" y1="48" x2="47" y2="48" stroke="black" strokeWidth="15" strokeLinecap="round" />
            <circle cx="56" cy="48" r="10.5" fill="black" />
          </mask>
        )}
      </defs>

      {/* Electric Indigo Orbit (7px stroke weight matching F) */}
      {isHorizontal ? (
        <ellipse
          cx="52"
          cy="48"
          rx="33"
          ry="14"
          stroke={accentColor}
          strokeWidth="7"
          mask="url(#formular-orbit-mask-h)"
        />
      ) : (
        <ellipse
          cx="52"
          cy="48"
          rx="33"
          ry="14"
          transform="rotate(-18 52 48)"
          stroke={accentColor}
          strokeWidth="7"
          mask="url(#formular-orbit-mask-o)"
        />
      )}

      {/* Capital F Monoline in Pure White (7px stroke weight) */}
      <path
        d="M 36 78 L 36 22 L 72 22"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 36 48 L 47 48"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Reactive Core Electron / Validation Node */}
      <circle cx="56" cy="48" r="7" fill="#FFFFFF" />
    </svg>
  );
}
