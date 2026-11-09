import type { CSSProperties } from 'react';

import styles from './styles.module.css';

const PATHS = {
  home: <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />,
  'heart-rate': <path d="M3 12h3l2-5 3 10 2-5h5" />,
  'chart-bar': <path d="M4 20h16M7 16V10M12 16V6M17 16v-4" />,
  'user-cog': (
    <>
      <circle cx="12" cy="8" r="3" />
      <path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19" />
    </>
  ),
  fire: <path d="M12 3c2 3 1 5-1 7 3 0 6 2 6 6a5 5 0 0 1-10 0c0-3 2-5 5-7Z" />,
  'bread-slice': <path d="M4 11c0-3 3.5-5 8-5s8 2 8 5v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />,
  egg: <path d="M12 21a6 6 0 0 0 6-7c0-4-2.5-11-6-11S6 10 6 14a6 6 0 0 0 6 7z" />,
  cheese: <path d="M3 11 12 4l9 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
  save: <path d="M5 4h11l3 3v13H5zM8 4v5h7M8 20v-6h8v6" />,
  sparkles: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  award: <path d="M12 3a5 5 0 0 1 5 5c0 3-2 5-5 7-3-2-5-4-5-7a5 5 0 0 1 5-5zm-2 14 2 4 2-4" />,
  analytics: <path d="M4 19V5M4 19h16M8 15v-4M12 15V9M16 15v-7" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'ellipsis-v': <path d="M12 6h.01M12 12h.01M12 18h.01" />,
  'grip-lines-vertical': <path d="M9 4v16M15 4v16" />,
  pencil: <path d="M4 20h4L18 10l-4-4L4 16zM12 8l4 4" />,
  trash: <path d="M5 7h14M9 7V5h6v2M8 7v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7" />,
  cog: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7-3a7 7 0 0 0-.1-1.1l2-1.5-2-3.5-2.4 1a7 7 0 0 0-1.9-1.1L14 3h-4l-.6 2.8a7 7 0 0 0-1.9 1.1l-2.4-1-2 3.5 2 1.5A7 7 0 0 0 5 12c0 .4 0 .7.1 1.1l-2 1.5 2 3.5 2.4-1a7 7 0 0 0 1.9 1.1L10 21h4l.6-2.8a7 7 0 0 0 1.9-1.1l2.4 1 2-3.5-2-1.5c.1-.4.1-.7.1-1.1z" />,
  lightbulb: <path d="M9 18h6M10 21h4M12 3a5 5 0 0 1 3 9c0 2-1 3-1 4H10c0-1-1-2-1-4a5 5 0 0 1 3-9z" />,
  'lightbulb-on': <path d="M9 18h6M10 21h4M12 3a5 5 0 0 1 3 9c0 2-1 3-1 4H10c0-1-1-2-1-4a5 5 0 0 1 3-9zM4 10H2M22 10h-2M6 5 4.5 3.5M18 5l1.5-1.5" />,
  'sign-out-alt': <path d="M10 4H5v16h5M14 12H5M14 12l4-4M14 12l4 4" />,
  envelope: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-left': <path d="M19 12H5M11 6l-6 6 6 6" />,
  search: <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm10 2-4.3-4.3" />,
  star: <path d="m12 3 2.5 6.5H21l-5 4.2 1.8 6.3L12 16.5 6.2 20l1.8-6.3L3 9.5h6.5z" fill="currentColor" stroke="none" />,
  'star-regular': <path d="m12 3 2.5 6.5H21l-5 4.2 1.8 6.3L12 16.5 6.2 20l1.8-6.3L3 9.5h6.5z" />,
  google: <path d="M12 11v2.4h5.3A5.2 5.2 0 0 1 12 17.5 5.5 5.5 0 1 1 12 6.5a5.2 5.2 0 0 1 3.4 1.3l1.8-1.8A7.7 7.7 0 0 0 12 4a8 8 0 1 0 0 16c4.4 0 8-3.2 8-8 0-.5 0-1-.1-1.5H12z" fill="currentColor" stroke="none" />,
  check: <path d="m5 12 5 5L20 7" />,
  'exclamation-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  'exclamation-triangle': <path d="M12 4 3 20h18L12 4zm0 6v4M12 16h.01" />,
} as const;

export type IconName = keyof typeof PATHS;

type IconProps = {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
};

const Icon = ({ name, color = 'currentColor', size = 24, className, style }: IconProps) => (
  <span
    className={[styles.glyph, className].filter(Boolean).join(' ')}
    style={{ color, width: size, height: size, ...style }}
    aria-hidden
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  </span>
);

export default Icon;
