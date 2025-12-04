
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-black/40 
        backdrop-blur-xl 
        border border-white/10 
        rounded-2xl 
        p-6
        shadow-xl
        shadow-black/20
        ${onClick ? 'cursor-pointer hover:bg-black/50 hover:border-white/20 transition-all' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
