import React from 'react';

interface TurfXTextLogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

/**
 * Text-only version of TurfX logo without football icon
 * Used specifically for PDF exports and print materials
 */
export const TurfXTextLogo: React.FC<TurfXTextLogoProps> = ({ size = 'medium', className = '' }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      text: 'text-3xl',
      subtext: 'text-sm',
      shadow: '2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.1)',
    },
    medium: {
      text: 'text-5xl',
      subtext: 'text-lg',
      shadow: '3px 3px 0px rgba(0,0,0,0.3), 6px 6px 0px rgba(0,0,0,0.1)',
    },
    large: {
      text: 'text-8xl',
      subtext: 'text-2xl',
      shadow: '4px 4px 0px rgba(0,0,0,0.3), 8px 8px 0px rgba(0,0,0,0.1)',
    },
  };

  const config = sizeConfig[size];

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <span
              className={`${config.text} font-black text-white tracking-tight`}
              style={{
                textShadow: config.shadow,
                transform: 'translateZ(0)',
              }}
            >
              TURF
            </span>
            <span
              className={`${config.text} font-black text-lime-500 tracking-tight`}
              style={{
                textShadow: config.shadow,
                transform: 'translateZ(0)',
              }}
            >
              X
            </span>
          </div>
          <span
            className={`${config.subtext} font-semibold text-lime-500 tracking-wide uppercase -mt-1`}
            style={{
              textShadow: '1px 1px 0px rgba(0,0,0,0.2)',
            }}
          >
            sonagazi
          </span>
        </div>
      </div>
    </div>
  );
};
