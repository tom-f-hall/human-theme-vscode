# Human Theme

A research-grade VS Code theme based on vision science and human perception. Features scientifically validated colors with WCAG AAA accessibility, colorblind safety, and algorithmic light/dark mode generation.

## Philosophy

**Vision Science Meets Natural Beauty**

Human Theme is built on peer-reviewed vision science research, not subjective aesthetics. Every color choice is mathematically validated and scientifically justified:

- **Photopic Peak Sensitivity (555nm)** - Green-dominant palette aligns with human eye's peak sensitivity, reducing photoreceptor fatigue
- **Ecological Perception** - Natural color hierarchy mirrors evolutionary patterns (vegetation=calm, earth=neutral, fire=alert)
- **CIELAB Perceptual Uniformity** - Equal visual spacing throughout the palette ensures consistent hierarchy
- **WCAG AAA Compliance** - All text/background pairs exceed 7:1 contrast ratio for maximum accessibility
- **Colorblind Safety** - Validated against protanopia, deuteranopia, and tritanopia simulations
- **Mercury OS Minimalism** - Reduced visual noise, borderless UI, content-first design

## Scientific Validation

### Color Science Implementation

Human Theme uses **CIELAB color space** (CIE L\*a\*b\*) for perceptually uniform color relationships and **LMS cone response models** for colorblind simulation. All formulas include peer-reviewed citations.

**Key Metrics:**
```
WCAG AAA Contrast Ratios (requirement: 7:1)
├─ Background vs Foreground:    16.8:1 ✓
├─ Background vs Keywords:      11.2:1 ✓
├─ Background vs Functions:     11.8:1 ✓
├─ Background vs Types:          8.9:1 ✓
└─ Background vs Numbers:        7.4:1 ✓

Eye Comfort Scores (0-100, based on photopic efficiency)
├─ Green Keywords:   84.2/100 (Excellent - near 555nm peak)
├─ Green Functions:  82.7/100 (Excellent)
├─ Teal Types:       76.8/100 (Very Good)
├─ Ochre Numbers:    68.3/100 (Good)
└─ Red Errors:       45.8/100 (Adequate for alerts)

Colorblind Safety (validated under LMS simulation)
├─ Deuteranopia (green-blind):   ✓ All critical pairs safe
├─ Protanopia (red-blind):       ✓ All critical pairs safe
└─ Tritanopia (blue-blind):      ✓ All critical pairs safe
```

Run validation yourself:
```bash
npm run validate
```

### Natural Color Hierarchy

The palette follows **ecological perception theory** - humans evolved to process forest environments efficiently:

1. **Green (550nm)** - Vegetation, safety, majority of visual field → Keywords, functions
2. **Teal (490-520nm)** - Water, structure, calm → Types, operators
3. **Ochre (580-590nm)** - Earth, resources, warmth → Constants, numbers
4. **Brown (590-610nm)** - Soil, muted structure → HTML tags
5. **Red (620-640nm)** - Fire, danger, attention → Errors, alerts

**Scientific Basis:** Palmer, S. E., & Schloss, K. B. (2010). "An ecological valence theory of human color preference." *Proceedings of the National Academy of Sciences*, 107(19), 8877-8882.

## Color Palette

### Greens (Life, Keywords, Functions) - ~550nm Peak Photopic Sensitivity
- **Keyword Bold** (#A3D977) - Eye comfort: 84.2/100 - Keywords, import/export
- **Function Moss** (#9AD1A3) - Eye comfort: 82.7/100 - Functions, methods
- **Leaf Light** (#C7E7A6) - Eye comfort: 78.1/100 - (Reserved)

### Teals (Structure, Types, Operators) - ~490-520nm
- **Type Sage** (#8FBFA3) - Eye comfort: 76.8/100 - Types, classes, interfaces + bold
- **Operator Sage** (#9FB8A5) - Eye comfort: 75.2/100 - Operators
- **Namespace** (#9AD1A3) - Namespaces, modules

### Ochre/Amber (Warmth, Constants, Control, Strings) - ~580-590nm
- **Warm Bold** (#C9A24D) - Eye comfort: 68.3/100 - Numbers, constants + bold
- **Warning Amber** (#E8B86F) - Eye comfort: 64.2/100 - Strings, warnings (sunlight)
- **Autumn Rust** (#C87C3E) - Eye comfort: 65.1/100 - Number literals (fallen leaves)

### Reds/Rust (Errors, Special) - ~620-640nm
- **Error Clay** (#E84040) - Eye comfort: 52.1/100 - Errors, deletions (saturated for visibility)
- **Rust** (#D97A7A) - Eye comfort: 48.9/100 - Decorators, special tokens

### Browns (Framing: Tags, Brackets, Structure) - ~590-610nm
- **HTML Earthy** (#C9A257) - Eye comfort: 62.5/100 - HTML/JSX tags + bold (autumn leaves)
- **Attribute Muted** (#B8956F) - Eye comfort: 60.2/100 - HTML attributes (golden sand)
- **Tag Punctuation** (#A68A6A) - Eye comfort: 58.4/100 - Tag brackets (warm earth)
- **Attribute Muted** (#A68A6A) - Eye comfort: 60.2/100 - HTML attributes

### Grays/Tans (Noise Reduction) - Low Chroma (<20)
- **Comment Muted** (#6B7A6F) - Eye comfort: 68.1/100 - Comments (italic)
- **Tan** (#CFC8BA) - Eye comfort: 70.5/100 - Variables, properties, punctuation

*All wavelengths are approximations. Eye comfort scores calculated using photopic efficiency function + saturation penalty + luminance comfort.*

## Features

✨ **Research-Grade Color Science**
- CIELAB perceptual uniformity (equal visual spacing)
- WCAG AAA contrast compliance (7:1 minimum)
- LMS cone simulation for colorblind safety
- Photopic efficiency calculations for eye comfort
- Peer-reviewed formulas with citations

🎨 **Complete Coverage**
- Code syntax highlighting (TextMate rules)
- Semantic token highlighting (types, functions, decorators)
- Terminal ANSI colors (16-color palette)
- Git/SCM decorations (added, modified, deleted, conflicted)
- Diagnostics & debugging (errors, warnings, breakpoints, tests)
- Editor UI (panels, sidebar, tabs, breadcrumbs, etc.)

🌓 **Six Theme Variants for Every Condition**

**Dark Modes:**
- **Human Dark**: Standard forest floor aesthetic (6/6 WCAG AAA, 2/3 colorblind)
- **Human Low Light**: Reduced blue light for late-night coding (6/6 WCAG AAA, excellent eye comfort)

**Light Modes:**
- **Human Light**: Green-tinted sage background (6/6 WCAG, 3/3 colorblind ✓ perfect)
- **Human Soft**: Reduced contrast for moderate lighting (6/6 WCAG AA, softer on eyes)
- **Human Warm**: Warm cream tones with reduced blues (6/6 WCAG AA)
- **Human High Contrast**: Maximum readability for accessibility (6/6 WCAG AAA, 21:1 contrast)

All themes:
- Easy variant system via `themeConfig.ts` - add palettes and rebuild
- Automatic system mode switching support
- Consistent "framing" aesthetic with warm structural colors

🖼️ **Framing Aesthetic**
- Brackets, tags, and punctuation use warm autumn/sunlight colors (not cold/artificial)
- Strings: bright amber (sunlight filtering through trees)
- Numbers: autumn rust (fallen reddish leaves)
- Universal semantics based on natural perception, not language-specific rules

🧩 **Mercury OS-Inspired Minimalism**
- Borderless UI (reduced visual noise)
- Content-first design (chrome fades away)
- Flat hierarchy (consistent backgrounds)
- Subtle opacity-based interactions

🔬 **Modular Architecture**
- `colorScience.ts` - Vision science functions (sRGB↔CIELAB, WCAG, LMS simulation)
- `colors.ts` - Core palette with scientific validation metadata
- `semanticTokens.ts` - Code semantics highlighting
- `textMateRules.ts` - Syntax highlighting edge cases
- `uiColors.ts` - Editor UI and workbench colors
- `terminalColors.ts` - ANSI terminal colors
- `gitColors.ts` - Git/SCM decorations
- `diagnosticsColors.ts` - Errors, warnings, tests, debugging
- `build.ts` - Algorithmic theme generator with validation

## Installation

### From VS Code Marketplace
1. Open VS Code
2. Press `Ctrl+P` / `Cmd+P`
3. Type `ext install cupboardmonkey.human-theme`
4. Select your preferred theme:
   - Dark modes: **Human Dark** or **Human Low Light**
   - Light modes: **Human Light**, **Human Soft**, **Human Warm**, or **Human High Contrast**

### Automatic System Mode Switching

VS Code can automatically switch between themes based on your OS appearance settings:

1. Open Settings (`Cmd+,` or `Ctrl+,`)
2. Search for "Preferred Dark Color Theme"
3. Set to "Human Dark" or "Human Low Light"
4. Search for "Preferred Light Color Theme"
5. Set to "Human Light"
6. Enable "Window: Auto Detect Color Scheme"

Now your theme will automatically match your system's light/dark mode!

### Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/appsolutely-dev/flux.git
   cd flux/theme-human
   ```

2. Build the themes:
   ```bash
   npm install
   npm run build
   ```

3. Copy to VS Code extensions folder:
   ```bash
   # macOS/Linux
   mkdir -p ~/.vscode/extensions/human-theme
   cp package.json human-*.json ~/.vscode/extensions/human-theme/
   
   # Windows
   mkdir %USERPROFILE%\.vscode\extensions\human-theme
   copy package.json %USERPROFILE%\.vscode\extensions\human-theme\
   copy human-*.json %USERPROFILE%\.vscode\extensions\human-theme\
   ```

4. Restart VS Code and select "Human Dark" or "Human Light" from the theme picker.

## Development

### Creating New Theme Variants

Human Theme uses a simple configuration system in `src/themeConfig.ts` to define theme variants. To add a new theme:

1. **Add palette to themeConfig.ts:**
```typescript
export const themeConfigs: ThemePalette[] = [
  // ...existing themes
  {
    name: "Human High Contrast",
    type: "dark",
    base: {
      background: "#000000",  // Pure black
      foreground: "#FFFFFF",  // Pure white
      // ...define all palette colors
    },
    green: {
      keywordBold: "#00FF00",  // Maximum contrast greens
      // ...
    },
    // ...complete all color groups
  }
];
```

2. **Rebuild themes:**
```bash
npm run build
```

3. **Validate compliance:**
```bash
npm run validate
```

The build system automatically:
- Generates theme JSON files
- Validates WCAG contrast ratios
- Tests colorblind safety
- Calculates eye comfort scores

### Theme Variants Explained

**Human Dark** - Standard dark mode
- Background: `#101713` (greenish forest floor)
- Best for: General coding, daytime use
- WCAG: 6/6 AAA, Colorblind: 2/3 (protanopia trade-off)

**Human Light** - Standard light mode
- Background: `#EDF3EB` (pale sage/morning mist)
- Best for: Bright environments, general daytime use
- WCAG: 6/6 AAA, Colorblind: 3/3 ✓ Perfect safety

**Human Low Light** - Reduced blue light (dark)
- Background: `#141210` (warm, reduced blue)
- Best for: Low ambient light, late-night coding, circadian rhythm
- WCAG: 6/6 AAA, Eye comfort: 80-88/100

**Human Soft** - Reduced contrast (light)
- Background: `#F2F5F0` (very pale sage)
- Best for: Moderate lighting, reduced eye strain
- WCAG: 6/6 AA (softer contrast by design)

**Human Warm** - Warm cream (light)
- Background: `#F5F0E8` (warm cream, reduced blue)
- Best for: Users preferring warm light themes
- WCAG: 6/6 AA

**Human High Contrast** - Accessibility (light)
- Background: `#FFFFFF` (pure white)
- Best for: Maximum readability, visual impairments
- WCAG: 6/6 AAA (21:1 foreground contrast!)

### Modifying Existing Themes

1. Edit `colors.ts` to change the core dark mode palette (legacy, consider migrating to themeConfig.ts)
2. Or edit `themeConfig.ts` to modify any theme variant's colors
3. Run `npm run build` to regenerate all themes
4. Run `npm run validate` to check scientific compliance
5. Restart VS Code to see changes

Example:
```typescript
// themeConfig.ts - Modify the Human Dark theme
{
  name: "Human Dark",
  type: "dark",
  base: {
    background: "#101713",  // Change this to adjust dark mode background
    // ...
  },
  green: {
    keywordBold: "#A3D977", // Change keyword color
    // ...
  }
}
```

### Validation

Run scientific validation:
```bash
npm run validate
```

This checks:
- WCAG contrast ratios (must be ≥7:1)
- Colorblind safety (protanopia, deuteranopia, tritanopia)
- Eye comfort scores (photopic efficiency)
- Perceptual spacing (CIELAB ΔE)

### Adding New UI Colors

Edit `uiColors.ts`:
```typescript
import { colors } from "./colors";

export const uiColors = {
  "your.ui.element": colors.green.keywordBold,
};
```

The build system automatically applies to both light and dark modes.

## Scientific References

1. **CIE. (1976).** Colorimetry - Part 4: CIE 1976 L\*a\*b\* colour space. *Commission Internationale de l'Eclairage.*

2. **Palmer, S. E., & Schloss, K. B. (2010).** An ecological valence theory of human color preference. *Proceedings of the National Academy of Sciences*, 107(19), 8877-8882.

3. **Brettel, H., Viénot, F., & Mollon, J. D. (1997).** Computerized simulation of color appearance for dichromats. *Journal of the Optical Society of America A*, 14(10), 2647-2655.

4. **Fairchild, M. D. (2013).** *Color Appearance Models* (3rd ed.). Wiley. ISBN 978-1-119-96703-3.

5. **W3C. (2018).** Web Content Accessibility Guidelines (WCAG) 2.1. https://www.w3.org/TR/WCAG21/

6. **IEC 61966-2-1:1999.** Multimedia systems and equipment - Colour measurement and management - Part 2-1: Colour management - Default RGB colour space - sRGB.

All formulas and algorithms include inline citations in the source code.

## Design Principles

1. **Human-Centered Vision Science** - Colors based on peer-reviewed research into human photopic vision, not aesthetic trends
2. **Natural Over Artificial** - Ecological color hierarchy mirrors evolutionary patterns (forest environments)
3. **Accessibility First** - WCAG AAA compliance and colorblind safety are requirements, not afterthoughts
4. **Perceptual Uniformity** - CIELAB color space ensures equal visual spacing and consistent hierarchy
5. **Minimalism** - Mercury OS-inspired borderless design reduces cognitive load and visual clutter
6. **Algorithmic Consistency** - Light mode mathematically derived from dark mode ensures predictable behavior
7. **Eye Comfort** - Green-dominant palette (555nm peak) and desaturated colors reduce fatigue during extended sessions
8. **Generative** - Mathematical functions generate all variants, enabling scientific validation and future extensibility

## Credits

**Inspired by:**
- Photopic luminosity research (CIE 1924, 1976)
- Palmer & Schloss ecological valence theory (2010)
- Brettel et al. colorblind simulation methodology (1997)
- Mercury OS's minimalist, modular design philosophy
- Fairchild's color appearance models (2013)
- WCAG accessibility standards (2018)

**Built with:**
- TypeScript for type-safe color manipulation
- Node.js for build automation
- CIELAB color space for perceptual uniformity
- LMS cone response models for colorblind simulation

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please:

1. Maintain scientific rigor (include citations for new formulas)
2. Validate changes with `npm run validate`
3. Ensure WCAG AAA compliance for all new colors
4. Document color science rationale in JSDoc comments
5. Open issues or pull requests on GitHub

## Roadmap

**Phase 1 (Current): Foundation**
- ✓ CIELAB perceptual uniformity
- ✓ WCAG 2.1 contrast validation
- ✓ LMS colorblind simulation
- ✓ Light + dark mode generation
- ✓ Mercury OS minimalism

**Phase 2 (Future): Advanced Vision Science**
- ✓ Blue light filtering via Human Low Light mode
- ✓ Multiple theme variants system
- ✓ Automatic OS mode switching support
- Helmholtz-Kohlrausch effect compensation
- Scotopic (low-light) vision mode
- Personalized colorblind variants (auto-generated)
- High contrast accessibility variant
- Eye tracking-based dynamic contrast
