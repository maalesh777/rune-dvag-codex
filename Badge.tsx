import React from 'react';
import { BadgeTier } from './types.ts';
import { BADGE_STYLES } from './constants.ts';

interface BadgeProps {
  tier: BadgeTier;
}

export const Badge = ({ tier }: BadgeProps) => {
  const style = BADGE_STYLES[tier];
  
  return (
    <span className={`px-3 py-1 text-sm font-bold rounded-full inline-flex items-center gap-1 ${style.bg} ${style.text}`}>
      {style.icon} {style.label}
    </span>
  );
};

