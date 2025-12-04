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
        bg-white/25
        backdrop-blur-2xl
        border border-white/40
        rounded-2xl 
        p-6
        shadow-lg
        shadow-black/5
        transition-all duration-200
        ${onClick ? 'cursor-pointer hover:bg-white/30 hover:border-white/50' : 'hover:bg-white/30'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
