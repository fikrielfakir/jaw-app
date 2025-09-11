// JAW Restaurant Dark Theme System
export const JAW_THEME = {
  // Root CSS variables that match your specification
  colors: {
    // Backgrounds
    background: '#000000',   // Main background (dark/black)
    surface: '#1C1C1C',     // Cards / secondary surfaces
    
    // Primary Accents  
    primary: '#FFD700',     // Gold/Yellow highlight
    primaryLight: '#FFE766', // Lighter gold shade for hover/active states
    
    // Status Colors
    success: '#4CAF50',     // Approved (green)
    warning: '#FFC107',     // Pending (amber/yellow)
    error: '#F44336',       // Closed/Rejected (red)
    
    // Text Colors
    textPrimary: '#FFFFFF',  // Main text (white)
    textSecondary: '#B3B3B3', // Subtext/labels (light gray)  
    textMuted: '#808080',    // Muted/inactive text
    
    // Icons / Borders
    icon: '#FFD700',        // Gold icons
    border: '#333333',      // Divider lines / borders
  },
  
  // CSS custom properties for web compatibility
  cssVariables: {
    '--color-background': '#000000',
    '--color-surface': '#1C1C1C',
    '--color-primary': '#FFD700',
    '--color-primary-light': '#FFE766',
    '--color-success': '#4CAF50',
    '--color-warning': '#FFC107',  
    '--color-error': '#F44336',
    '--color-text-primary': '#FFFFFF',
    '--color-text-secondary': '#B3B3B3',
    '--color-text-muted': '#808080',
    '--color-icon': '#FFD700',
    '--color-border': '#333333',
  }
} as const;

export type JAWTheme = typeof JAW_THEME;