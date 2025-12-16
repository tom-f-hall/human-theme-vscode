/**
 * Theme Configuration - Simple input spec for theme variants
 * 
 * Define color palettes here for different themes/sight requirements.
 * Each palette will be validated and built automatically.
 */

export interface ThemePalette {
  name: string;
  type: "dark" | "light";
  
  // Base colors
  base: {
    background: string;
    foreground: string;
    backgroundDarker: string;
    backgroundLighter: string;
    foregroundMuted: string;
    foregroundVeryMuted: string;
    shadowColor: string;
  };
  
  // Semantic color groups
  green: {
    keywordBold: string;
    functionMoss: string;
    leafLight: string;
    successLight: string;
    statusGood: string;
  };
  
  teal: {
    typeSageBold: string;
    operatorSage: string;
    namespace: string;
    structureCalm: string;
  };
  
  ochre: {
    warmBold: string;
    constantMuted: string;
    warningAmber: string;
    autumnRust: string;
  };
  
  red: {
    errorClay: string;
    errorLight: string;
    rust: string;
    errorBackground: string;
  };
  
  brown: {
    htmlEarthy: string;
    attributeMuted: string;
    tagPunctuation: string;
  };
  
  gray: {
    commentMuted: string;
    lineNumberMuted: string;
    lineNumberActive: string;
    tan: string;
    tanMuted: string;
    veryMuted: string;
  };
  
  ui: {
    selectionBackground: string;
    selectionInactive: string;
    selectionHighlight: string;
    wordHighlight: string;
    wordHighlightStrong: string;
    findMatch: string;
    findMatchHighlight: string;
    hoverBackground: string;
    focusOutline: string;
    border: string;
  };
  
  diagnostic: {
    error: string;
    warning: string;
    info: string;
    hint: string;
  };
}

/**
 * Theme Registry - Add new theme variants here
 */
export const themeConfigs: ThemePalette[] = [
  {
    name: "Human Dark",
    type: "dark",
    base: {
      background: "#101713",
      foreground: "#D9D3C7",
      backgroundDarker: "#0D120F",
      backgroundLighter: "#111814",
      foregroundMuted: "#CFC8BA",
      foregroundVeryMuted: "#9FB8A5",
      shadowColor: "#050804",
    },
    green: {
      keywordBold: "#A3D977",
      functionMoss: "#9AD1A3",
      leafLight: "#C7E7A6",
      successLight: "#9AD1A3",
      statusGood: "#8FBF8A",
    },
    teal: {
      typeSageBold: "#8FBFA3",
      operatorSage: "#9FB8A5",
      namespace: "#9AD1A3",
      structureCalm: "#B0C8B8",
    },
    ochre: {
      warmBold: "#C9A24D",
      constantMuted: "#B08C4F",
      warningAmber: "#E8B86F",
      autumnRust: "#C87C3E",
    },
    red: {
      errorClay: "#E84040",
      errorLight: "#E8A09A",
      rust: "#D97A7A",
      errorBackground: "#2A1412",
    },
    brown: {
      htmlEarthy: "#C9A257",
      attributeMuted: "#B8956F",
      tagPunctuation: "#A68A6A",
    },
    gray: {
      commentMuted: "#6B7A6F",
      lineNumberMuted: "#3E4A42",
      lineNumberActive: "#A6BDA4",
      tan: "#CFC8BA",
      tanMuted: "#9FB8A5",
      veryMuted: "#3E4A42",
    },
    ui: {
      selectionBackground: "#1D3323",
      selectionInactive: "#16221C",
      selectionHighlight: "#162B21",
      wordHighlight: "#16221C",
      wordHighlightStrong: "#1A2825",
      findMatch: "#2A2414",
      findMatchHighlight: "#2A241480",
      hoverBackground: "#0E1A12",
      focusOutline: "#A3D977",
      border: "#111814",
    },
    diagnostic: {
      error: "#E84040",
      warning: "#E8B86F",
      info: "#8FBFA3",
      hint: "#8FBF8A",
    },
  },
  {
    name: "Human Light",
    type: "light",
    base: {
      background: "#EDF3EB",        // Pale sage/morning mist (green-tinted like dark mode)
      foreground: "#2D2520",
      backgroundDarker: "#E0E8DD",  // Darker sage
      backgroundLighter: "#F5F9F3",  // Lightest sage/mist
      foregroundMuted: "#6B5F52",
      foregroundVeryMuted: "#9FA89F", // Sage-gray
      shadowColor: "#D8E0D5",       // Pale green shadow
    },
    green: {
      keywordBold: "#2E6B25",      // WCAG AAA 7:1 (forest green)
      functionMoss: "#2E6B2F",     // Darkened for WCAG AAA 7:1
      leafLight: "#3D7545",        
      successLight: "#3D7A35",     
      statusGood: "#2E6B40",       
    },
    teal: {
      typeSageBold: "#1A5F6F",     // Darker for WCAG AAA
      operatorSage: "#256B7A",     // Darker
      namespace: "#1F6B7F",        
      structureCalm: "#2D6B7F",    
    },
    ochre: {
      warmBold: "#7A5B1F",         // Much darker for WCAG AAA
      constantMuted: "#6A5B3F",    
      warningAmber: "#7A5B1F",     // Darker for WCAG AAA
      autumnRust: "#8A4D2C",       // Darker
    },
    red: {
      errorClay: "#8A3A2A",        // Darker for better contrast
      errorLight: "#A84545",       
      rust: "#8A4040",             
      errorBackground: "#2A1412",  
    },
    brown: {
      htmlEarthy: "#7A5B2F",       // Much darker for contrast
      attributeMuted: "#7A6B5A",   
      tagPunctuation: "#5A4B3F",   
    },
    gray: {
      commentMuted: "#6A6060",     // Darker for readability
      lineNumberMuted: "#A89A90",  
      lineNumberActive: "#5F5550", 
      tan: "#2D2520",              
      tanMuted: "#6B5F52",         
      veryMuted: "#BFB3A8",        
    },
    ui: {
      selectionBackground: "#DCC9B8",  
      selectionInactive: "#E8DCD0",    
      selectionHighlight: "#D5C4B5",   
      wordHighlight: "#E3D9CC",        
      wordHighlightStrong: "#D9C9B8",  
      findMatch: "#D4C4B8",            
      findMatchHighlight: "#E3D5CA",   
      hoverBackground: "#EDE3D8",      
      focusOutline: "#3D7A2F",         
      border: "#D4C4B8",               
    },
    diagnostic: {
      error: "#A84A3A",
      warning: "#996B1F",
      info: "#1F6B7A",
      hint: "#3D7A2F",
    },
  },
  {
    name: "Human Low Light",
    type: "dark",
    base: {
      background: "#141210",        // Very warm, reduced blue light
      foreground: "#D9CFC4",        // Warmer cream
      backgroundDarker: "#0F0D0B",
      backgroundLighter: "#18150F",
      foregroundMuted: "#C9BFB4",
      foregroundVeryMuted: "#A89F94",
      shadowColor: "#0A0806",
    },
    green: {
      keywordBold: "#B8C97A",       // Warmer yellow-green
      functionMoss: "#A8C98A",      // Warmer moss
      leafLight: "#C9D7A0",         // Pale warm yellow-green
      successLight: "#A8C98A",
      statusGood: "#98BF84",
    },
    teal: {
      typeSageBold: "#9FBF9A",      // Shift teal toward green (reduce blue)
      operatorSage: "#A8B89F",      // Warmer sage
      namespace: "#A8C99A",
      structureCalm: "#B8C8B0",
    },
    ochre: {
      warmBold: "#D9A84D",          // Brighter warm amber
      constantMuted: "#C09C5F",     // Golden ochre
      warningAmber: "#E8C87F",      // Warm golden amber
      autumnRust: "#D88C4E",        // Warm rust
    },
    red: {
      errorClay: "#E85050",         // Slightly brighter for evening
      errorLight: "#E8B0AA",
      rust: "#E98A8A",
      errorBackground: "#2A1814",
    },
    brown: {
      htmlEarthy: "#D9B267",        // Bright warm earth
      attributeMuted: "#C8A57F",    // Golden sand
      tagPunctuation: "#B89A7A",    // Warm taupe
    },
    gray: {
      commentMuted: "#7A7A6F",      // Warmer gray
      lineNumberMuted: "#4A4A42",
      lineNumberActive: "#B8BDA4",
      tan: "#D9CFC4",
      tanMuted: "#A8B89F",
      veryMuted: "#4A4A42",
    },
    ui: {
      selectionBackground: "#2A2414",
      selectionInactive: "#1A1814",
      selectionHighlight: "#1A1C14",
      wordHighlight: "#1A1814",
      wordHighlightStrong: "#221C14",
      findMatch: "#2A2010",
      findMatchHighlight: "#2A201080",
      hoverBackground: "#141210",
      focusOutline: "#B8C97A",
      border: "#18150F",
    },
    diagnostic: {
      error: "#E85050",
      warning: "#E8C87F",
      info: "#9FBF9A",
      hint: "#98BF84",
    },
  },
  {
    name: "Human Soft",
    type: "light",
    base: {
      background: "#F2F5F0",        // Very pale sage with higher lightness
      foreground: "#3A3530",        // Lighter foreground (less contrast)
      backgroundDarker: "#E8EDE5",
      backgroundLighter: "#F8FAF7",
      foregroundMuted: "#7A6F62",
      foregroundVeryMuted: "#AAB0AA",
      shadowColor: "#E0E5DD",
    },
    green: {
      keywordBold: "#3E7A35",       // Lighter greens for softer contrast
      functionMoss: "#3E7A3F",
      leafLight: "#4A8555",
      successLight: "#4A8A45",
      statusGood: "#3E7A50",
    },
    teal: {
      typeSageBold: "#2A6F7F",
      operatorSage: "#357A8A",
      namespace: "#2F7A8F",
      structureCalm: "#3D7A8F",
    },
    ochre: {
      warmBold: "#8A6B2F",
      constantMuted: "#7A6B4F",
      warningAmber: "#8A6B2F",
      autumnRust: "#9A5D3C",
    },
    red: {
      errorClay: "#9A4A3A",
      errorLight: "#B85555",
      rust: "#9A5050",
      errorBackground: "#2A1412",
    },
    brown: {
      htmlEarthy: "#8A6B3F",
      attributeMuted: "#8A7B6A",
      tagPunctuation: "#6A5B4F",
    },
    gray: {
      commentMuted: "#7A7070",
      lineNumberMuted: "#B8AAA0",
      lineNumberActive: "#6F6560",
      tan: "#3A3530",
      tanMuted: "#7A6F62",
      veryMuted: "#CFCAB8",
    },
    ui: {
      selectionBackground: "#E5D9C8",
      selectionInactive: "#F0E8DC",
      selectionHighlight: "#DFD4C5",
      wordHighlight: "#EBE3D6",
      wordHighlightStrong: "#E3D9C8",
      findMatch: "#DED4C8",
      findMatchHighlight: "#EBE0D5",
      hoverBackground: "#F3EBE0",
      focusOutline: "#4A8A45",
      border: "#DED4C8",
    },
    diagnostic: {
      error: "#B85A4A",
      warning: "#A97B2F",
      info: "#2F7A8A",
      hint: "#4A8A45",
    },
  },
  {
    name: "Human Warm",
    type: "light",
    base: {
      background: "#F5F0E8",        // Warm cream (reduced blue)
      foreground: "#2D2520",
      backgroundDarker: "#E8DED0",
      backgroundLighter: "#FAF7F0",
      foregroundMuted: "#6B5F52",
      foregroundVeryMuted: "#A89F94",
      shadowColor: "#DDD0C0",
    },
    green: {
      keywordBold: "#357A25",       // Warmer greens (yellow-shifted)
      functionMoss: "#357A2F",
      leafLight: "#458545",
      successLight: "#458A35",
      statusGood: "#357A40",
    },
    teal: {
      typeSageBold: "#2A6F5F",      // Shift teal toward green
      operatorSage: "#357A6A",
      namespace: "#2F7A6F",
      structureCalm: "#3D7A6F",
    },
    ochre: {
      warmBold: "#7A5B1F",          // Darkened for WCAG compliance
      constantMuted: "#7A6B3F",
      warningAmber: "#7A5B1F",
      autumnRust: "#9A5D2C",
    },
    red: {
      errorClay: "#9A4A2A",         // Warmer reds
      errorLight: "#B85545",
      rust: "#9A5040",
      errorBackground: "#2A1412",
    },
    brown: {
      htmlEarthy: "#8A6B2F",
      attributeMuted: "#8A7B5A",
      tagPunctuation: "#6A5B3F",
    },
    gray: {
      commentMuted: "#7A7060",
      lineNumberMuted: "#B8AA90",
      lineNumberActive: "#6F6550",
      tan: "#2D2520",
      tanMuted: "#6B5F52",
      veryMuted: "#CFC3B8",
    },
    ui: {
      selectionBackground: "#E8D9C8",
      selectionInactive: "#F0E3D5",
      selectionHighlight: "#E0D0C0",
      wordHighlight: "#EDE5D8",
      wordHighlightStrong: "#E5D9C8",
      findMatch: "#DFD0C0",
      findMatchHighlight: "#EBDCd0",
      hoverBackground: "#F2E8DC",
      focusOutline: "#458A35",
      border: "#DFD0C0",
    },
    diagnostic: {
      error: "#B85A3A",
      warning: "#A97B1F",
      info: "#2F7A6A",
      hint: "#458A35",
    },
  },
  {
    name: "Human High Contrast",
    type: "light",
    base: {
      background: "#FFFFFF",        // Pure white for maximum contrast
      foreground: "#000000",        // Pure black
      backgroundDarker: "#F0F0F0",
      backgroundLighter: "#FFFFFF",
      foregroundMuted: "#404040",
      foregroundVeryMuted: "#606060",
      shadowColor: "#D0D0D0",
    },
    green: {
      keywordBold: "#006600",       // Very dark greens for max contrast
      functionMoss: "#007700",
      leafLight: "#008800",
      successLight: "#007700",
      statusGood: "#006600",
    },
    teal: {
      typeSageBold: "#004466",
      operatorSage: "#005577",
      namespace: "#004466",
      structureCalm: "#005577",
    },
    ochre: {
      warmBold: "#664400",
      constantMuted: "#554400",
      warningAmber: "#664400",
      autumnRust: "#773300",
    },
    red: {
      errorClay: "#CC0000",         // Bright saturated red for errors
      errorLight: "#DD2222",
      rust: "#BB0000",
      errorBackground: "#2A1412",
    },
    brown: {
      htmlEarthy: "#664400",
      attributeMuted: "#665544",
      tagPunctuation: "#554433",
    },
    gray: {
      commentMuted: "#606060",
      lineNumberMuted: "#808080",
      lineNumberActive: "#404040",
      tan: "#000000",
      tanMuted: "#404040",
      veryMuted: "#A0A0A0",
    },
    ui: {
      selectionBackground: "#CCDDFF",
      selectionInactive: "#E8E8E8",
      selectionHighlight: "#BBCCEE",
      wordHighlight: "#E0E0E0",
      wordHighlightStrong: "#D0D0D0",
      findMatch: "#FFFF00",
      findMatchHighlight: "#FFFFAA",
      hoverBackground: "#F0F0F0",
      focusOutline: "#0066CC",
      border: "#C0C0C0",
    },
    diagnostic: {
      error: "#CC0000",
      warning: "#DD8800",
      info: "#0066CC",
      hint: "#007700",
    },
  },
];
