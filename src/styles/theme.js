export const theme = {
  colors: {
    primary: {
      gradient: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
      main: '#6b7280',
      light: '#9ca3af',
      dark: '#374151',
    },
    secondary: {
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    success: {
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      main: '#10b981',
      light: '#34d399',
      dark: '#047857',
    },
    warning: {
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#b45309',
    },
    danger: {
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      main: '#ef4444',
      light: '#f87171',
      dark: '#b91c1c',
    },
    neutral: {
      white: '#ffffff',
      light: '#f9fafb',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      gray500: '#6b7280',
      gray600: '#4b5563',
      gray700: '#374151',
      gray800: '#1f2937',
      gray900: '#111827',
      black: '#000000',
    },
    background: {
      primary: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      secondary: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)',
      card: 'rgba(255, 255, 255, 0.05)',
      glass: 'rgba(255, 255, 255, 0.03)',
    }
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    large: '0 8px 24px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(107, 114, 128, 0.2)',
    colorful: '0 8px 32px rgba(107, 114, 128, 0.15)',
  },
  
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '16px',
    round: '50%',
    pill: '999px',
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  animations: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    slideIn: 'slideInFromRight 0.3s ease-out',
    fadeIn: 'fadeIn 0.3s ease-out',
    scale: 'scaleIn 0.2s ease-out',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  effects: {
    backdrop: 'backdrop-filter: blur(10px)',
    glass: `
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `,
    neon: `
      box-shadow: 
        0 0 5px currentColor,
        0 0 10px currentColor,
        0 0 15px currentColor,
        0 0 20px currentColor;
    `,
  }
}; 