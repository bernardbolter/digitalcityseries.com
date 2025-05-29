import React, { JSX } from 'react';

type FlagIconProps = {
  code: string;
  className?: string;
};

const FlagIcon: React.FC<FlagIconProps> = ({ code, className = '' }) => {
  const flags: Record<string, JSX.Element> = {
    en: (
      <svg viewBox="0 0 60 30" className={className}>
        <clipPath id="uk">
          <path d="M0,0 v30 h60 v-30 z"/>
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </svg>
    ),
    fr: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h20 v40 h-20 z" fill="#002654"/>
        <path d="M20,0 h20 v40 h-20 z" fill="#fff"/>
        <path d="M40,0 h20 v40 h-20 z" fill="#ce1126"/>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v8 h-60 z" fill="#c60b1e"/>
        <path d="M0,8 h60 v8 h-60 z" fill="#ffc400"/>
        <path d="M0,24 h60 v8 h-60 z" fill="#ffc400"/>
        <path d="M0,32 h60 v8 h-60 z" fill="#c60b1e"/>
        <path d="M0,16 h60 v8 h-60 z" fill="#c60b1e"/>
        <path d="M20,0 h4 v40 h-4 z" fill="#c60b1e"/>
      </svg>
    ),
    de: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v13.3 h-60 z" fill="#000"/>
        <path d="M0,13.3 h60 v13.3 h-60 z" fill="#dd0000"/>
        <path d="M0,26.6 h60 v13.4 h-60 z" fill="#ffcc00"/>
      </svg>
    ),
    it: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h20 v40 h-20 z" fill="#009246"/>
        <path d="M20,0 h20 v40 h-20 z" fill="#fff"/>
        <path d="M40,0 h20 v40 h-20 z" fill="#ce2b37"/>
      </svg>
    ),
    yue: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#DE2910"/>
        <path d="M30,20 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0" fill="#fff"/>
        <path d="M30,13 l2.47,7.6h8l-6.5,4.7 2.47,7.6-6.5-4.7-6.5,4.7 2.47-7.6-6.5-4.7h8z" fill="#DE2910"/>
      </svg>
    ),
    sv: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#005293"/>
        <path d="M0,15 h60 v10 h-60 z" fill="#FECB00"/>
        <path d="M20,0 h10 v40 h-10 z" fill="#FECB00"/>
      </svg>
    ),
    pt: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#006600"/>
        <path d="M0,0 h24 v40 h-24 z" fill="#FF0000"/>
        <path d="M12,12 l4,3 l-1.5,5 l4-3 l4,3 l-1.5-5 l4-3 h-5l-1.5-5-1.5,5h-5z" fill="#FFFF00"/>
      </svg>
    ),
    da: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#C60C30"/>
        <path d="M0,15 h60 v10 h-60 z" fill="#fff"/>
        <path d="M20,0 h10 v40 h-10 z" fill="#fff"/>
      </svg>
    ),
    lv: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#9E3039"/>
        <path d="M0,15 h60 v10 h-60 z" fill="#fff"/>
      </svg>
    ),
    tr: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#E30A17"/>
        <path d="M20,12 a8,8 0 1 1 -16,0 a8,8 0 1 1 16,0" fill="#fff"/>
        <path d="M16,12 l-4,2 l1,4 l-3-3 l-3,3 l1-4 l-4-2 h5l1-4 l2,4 z" fill="#E30A17"/>
      </svg>
    ),
    hr: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#C8102E"/>
        <path d="M0,0 h60 v26.6 h-60 z" fill="#fff"/>
        <path d="M0,0 h60 v13.3 h-60 z" fill="#012169"/>
      </svg>
    ),
    zh: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#DE2910"/>
        <path d="M15,10 l3,10 l-8,-6 h10 l-8,6 z" fill="#FFDE00"/>
      </svg>
    ),
    th: (
      <svg viewBox="0 0 60 40" className={className}>
        <path d="M0,0 h60 v40 h-60 z" fill="#A51931"/>
        <path d="M0,0 h60 v8 h-60 z" fill="#F4F5F8"/>
        <path d="M0,32 h60 v8 h-60 z" fill="#F4F5F8"/>
        <path d="M0,8 h60 v8 h-60 z" fill="#2D2A4A"/>
        <path d="M0,24 h60 v8 h-60 z" fill="#2D2A4A"/>
      </svg>
    )
  };

  return flags[code] || null;
};

export default FlagIcon;
