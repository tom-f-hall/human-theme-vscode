# Human Theme

Research-grade VS Code theme based on vision science and human perception.

## Screenshots

![Human Dark](previews/human_dark_preview.png)
![Human Light](previews/human_light_preview.png)
![Human Low Light](previews/human_low_light_preview.png)
![Human Soft](previews/human_soft_preview.png)
![Human Warm](previews/human_warm_preview.png)
![Human High Contrast](previews/human_high_contrast_preview.png)

## Features

- **WCAG AAA Compliant** - 7:1+ contrast ratios
- **Colorblind Safe** - Validated for protanopia, deuteranopia, tritanopia
- **Six Variants** - Dark, Light, Low Light, Soft, Warm, High Contrast
- **Mercury OS Design** - Borderless, minimal UI
- **Eye Comfort** - Green-dominant palette (555nm peak photopic sensitivity)
- **Scientific** - CIELAB uniformity, LMS cone simulation

## Installation

**From Marketplace:**
1. Press `Ctrl+P` / `Cmd+P`
2. Type `ext install TomHall.human-theme`

**Automatic System Mode Switching:**
1. Open Settings (`Cmd+,` / `Ctrl+,`)
2. Set "Preferred Dark Color Theme" → "Human Dark"
3. Set "Preferred Light Color Theme" → "Human Light"
4. Enable "Window: Auto Detect Color Scheme"

**Manual:**
```bash
git clone https://github.com/tom-f-hall/human-theme-vscode.git
cd human-theme-vscode
npm install && npm run build
```

## Themes

| Theme | Background | Use Case |
|-------|------------|----------|
| **Human Dark** | `#101713` | General coding |
| **Human Light** | `#EDF3EB` | Bright environments |
| **Human Low Light** | `#141210` | Late-night, reduced blue |
| **Human Soft** | `#F2F5F0` | Reduced contrast |
| **Human Warm** | `#F5F0E8` | Warm preference |
| **Human High Contrast** | `#FFFFFF` | Accessibility |

## Color Palette

**Greens (Keywords, Functions)** - 550nm
- `#A3D977` Keyword Bold
- `#9AD1A3` Function Moss

**Teals (Types)** - 490-520nm
- `#8FBFA3` Type Sage

**Ochre (Strings, Numbers)** - 580-590nm
- `#E8B86F` Warning Amber
- `#C9A24D` Warm Bold

**Reds (Errors)** - 620-640nm
- `#E84040` Error Clay

## Development

### Add Theme Variant

Edit `src/themeConfig.ts`:
```typescript
{
  name: "Human Custom",
  type: "dark",
  base: { background: "#101713", foreground: "#E4E8E3" },
  green: { keywordBold: "#A3D977", functionMoss: "#9AD1A3" },
  // ... add remaining color groups
}
```

### Build & Validate
```bash
npm run build     # Generate themes
npm run validate  # Check compliance
```

## Architecture

- `colorScience.ts` - Vision science (sRGB↔CIELAB, WCAG, LMS)
- `themeConfig.ts` - Theme variants
- `semanticTokens.ts` - Code semantics
- `uiColors.ts` - Editor UI
- `terminalColors.ts` - ANSI colors
- `build.ts` - Generator & validator

## References

1. CIE (1976) - CIELAB color space
2. Palmer & Schloss (2010) - Ecological color preference
3. Brettel et al. (1997) - Colorblind simulation
4. W3C (2018) - WCAG 2.1
5. Fairchild (2013) - Color Appearance Models

## License

MIT
