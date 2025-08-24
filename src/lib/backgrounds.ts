import React from 'react';

export type Background = {
  id: string;
  name: string;
  style: React.CSSProperties;
};

export const backgrounds: Background[] = [
  {
    id: 'azure-depths',
    name: 'Azure Depths',
    style: { background: 'radial-gradient(125% 125% at 50% 100%, #000000 40%, #350136 100%)' },
  },
  {
    id: 'dark-horizon',
    name: 'Dark Horizon',
    style: { background: 'radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)' },
  },
  {
    id: 'x-glow',
    name: 'X Glow',
    style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000' },
  },
  {
    id: 'emerald-depths',
    name: 'Emerald Depths',
    style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16, 185, 129, 0.25), transparent 70%), #000000' },
  },
  {
    id: 'copper-forge',
    name: 'Copper Forge',
    style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249, 115, 22, 0.25), transparent 70%), #000000' },
  },
  {
    id: 'morning-haze',
    name: 'Morning Haze',
    style: {
      backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(253, 224, 71, 0.4) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.4) 0%, transparent 70%),
        radial-gradient(circle at 50% 100%, rgba(244, 114, 182, 0.5) 0%, transparent 80%)
      `,
    },
  },
  {
    id: 'emerald-radial-glow',
    name: 'Emerald Radial Glow',
    style: {
      backgroundImage: `radial-gradient(circle 500px at 50% 300px, rgba(16,185,129,0.35), transparent)`,
      backgroundColor: '#020617',
    },
  },
  {
    id: 'pearl-mist',
    name: 'Pearl Mist',
    style: { background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(226, 232, 240, 0.15), transparent 70%), #000000' },
  },
  {
    id: 'dual-gradient-overlay',
    name: 'Dual Gradient Overlay',
    style: {
      backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 80%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
      `,
      backgroundSize: '48px 48px, 48px 48px, 100% 100%, 100% 100%',
      backgroundColor: 'white',
    },
  },
  {
    id: 'diagonal-fade-grid-top-right',
    name: 'Diagonal Fade Grid (Top Right)',
    style: {
      backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
      WebkitMaskImage:
        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
      maskImage:
        "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
      backgroundColor: '#f9fafb',
    },
  },
  {
    id: 'dark-sphere-grid',
    name: 'Dark Sphere Grid',
    style: {
      backgroundColor: "#020617", // Changed from background
      backgroundImage: `
        linear-gradient(to right, rgba(71,85,105,0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(71,85,105,0.3) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)
      `,
      backgroundSize: "32px 32px, 32px 32px, 100% 100%",
    },
  },
  {
    id: 'black-basic-grid',
    name: 'Black Basic Grid',
    style: {
      backgroundColor: "#000000", // Changed from background
      backgroundImage: `
        linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    },
  },
  {
    id: 'variable-spacing-pattern',
    name: 'Variable Spacing Pattern',
    style: {
      backgroundImage: `
        repeating-linear-gradient(30deg, 
          rgba(255, 100, 0, 0.1) 0, 
          rgba(255, 100, 0, 0.1) 1px, 
          transparent 1px, 
          transparent 10px,
          rgba(255, 100, 0, 0.15) 11px, 
          rgba(255, 100, 0, 0.15) 12px, 
          transparent 12px, 
          transparent 40px
        )
      `,
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'zigzag-lightning-dark',
    name: 'Zigzag Lightning (Dark)',
    style: {
      backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(34, 197, 94, 0.12) 20px, rgba(34, 197, 94, 0.12) 21px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(16, 185, 129, 0.10) 30px, rgba(16, 185, 129, 0.10) 31px),
        repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(59, 130, 246, 0.08) 40px, rgba(59, 130, 246, 0.08) 41px),
        repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(147, 51, 234, 0.06) 35px, rgba(147, 51, 234, 0.06) 36px)
      `,
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'bottom-fade-grid',
    name: 'Bottom Fade Grid',
    style: {
      backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
      backgroundSize: "20px 30px",
      WebkitMaskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      maskImage:
        "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
      backgroundColor: '#f8fafc',
    },
  },
  {
    id: 'top-fade-grid',
    name: 'Top Fade Grid',
    style: {
      backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
      backgroundSize: "20px 30px",
      WebkitMaskImage:
        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
      maskImage:
        "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
      backgroundColor: '#f8fafc',
    },
  },
  {
    id: 'gradient-diagonal-lines-green',
    name: 'Gradient Diagonal Lines (Green)',
    style: {
      backgroundImage: `
        repeating-linear-gradient(45deg, 
          rgba(0, 255, 128, 0.2) 0px, 
          rgba(0, 255, 128, 0) 2px, 
          transparent 2px, 
          transparent 25px
        )
      `,
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'gradient-diagonal-lines-red-pink',
    name: 'Gradient Diagonal Lines (Red/Pink)',
    style: {
      backgroundImage: `
        repeating-linear-gradient(-45deg, 
          rgba(255, 0, 100, 0.2) 0px, 
          rgba(255, 0, 100, 0) 2px, 
          transparent 2px, 
          transparent 25px
        )
      `,
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'cosmic-noise',
    name: 'Cosmic Noise',
    style: {
      background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)",
      // Removed backgroundColor: 'black',
    },
  },
  {
    id: 'prismatic-aurora-burst',
    name: 'Prismatic Aurora Burst',
    style: {
      background: `
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
          #000000
        `,
      // Removed backgroundColor: 'black',
    },
  },
  {
    id: 'crosshatch-art-dark',
    name: 'Crosshatch Art (Dark)',
    style: {
      backgroundImage: `
        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(16, 185, 129, 0.18) 2px, rgba(16, 185, 129, 0.18) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(245, 101, 101, 0.10) 2px, rgba(245, 101, 101, 0.10) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(234, 179, 8, 0.08) 2px, rgba(234, 179, 8, 0.08) 3px, transparent 3px, transparent 8px),
        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(249, 115, 22, 0.06) 2px, rgba(249, 115, 22, 0.06) 3px, transparent 3px, transparent 8px)
      `,
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'diagonal-grid-red-blue-glow',
    name: 'Diagonal Grid (Red/Blue Glow)',
    style: {
      backgroundImage: `
  repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.2) 0, rgba(255, 0, 100, 0.2) 1px, transparent 1px, transparent 20px),
      repeating-linear-gradient(-45deg, rgba(0, 255, 200, 0.15) 0, rgba(0, 255, 200, 0.15) 1px, transparent 1px, transparent 20px)
        `,
      backgroundSize: "40px 40px",
      backgroundColor: '#0f0f0f',
    },
  },
  {
    id: 'complex-multiplier-enhanced',
    name: 'Complex Multiplier (Enhanced)',
    style: {
      backgroundImage: `
        repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
        repeating-linear-gradient(45deg, rgba(0,255,128,0.09) 0, rgba(0,255,128,0.09) 1px, transparent 1px, transparent 20px),
       repeating-linear-gradient(-45deg, rgba(255,0,128,0.10) 0, rgba(255,0,128,0.10) 1px, transparent 1px, transparent 30px),
        repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
        radial-gradient(circle at 60% 40%, rgba(0,255,128,0.05) 0, transparent 60%)
      `,
      backgroundSize: "80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%",
      backgroundPosition: "0 0, 0 0, 0 0, 40px 40px, center",
      backgroundColor: '#101014',
    },
  },
];