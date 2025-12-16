// This is a new comment added to the build.ts file.
/**
 * Human Theme Generator
 * 
 * Builds VS Code themes with:
 * - Algorithmic light mode generation from dark mode
 * - Scientific color validation (WCAG, colorblind safety, perceptual spacing)
 * - Mercury OS-inspired minimalism
 * 
 * Run: npx ts-node build.ts
 * Run with validation: npx ts-node build.ts --validate
 */

import * as fs from "fs";
import * as path from "path";
import { colors, Colors } from "./colors";
import { themeConfigs, ThemePalette } from "./themeConfig";
import {
  hexToLab,
  labToHex,
  contrastRatio,
  validateColorblindSafety,
  calculateEyeComfortScore,
  deltaE,
  meetsWCAG,
  LAB,
} from "./colorScience";
import { semanticTokens } from "./semanticTokens";
import { textMateRules } from "./textMateRules";
import { uiColors } from "./uiColors";
import { terminalColors } from "./terminalColors";
import { gitColors } from "./gitColors";
import { diagnosticsColors } from "./diagnosticsColors";

interface VSCodeTheme {
  name: string;
  type: string;
  colors: Record<string, string>;
  tokenColors: Record<string, unknown>[];
  semanticTokenColors?: Record<string, unknown>;
}

/**
 * Generate light mode by inverting CIELAB lightness while preserving hue relationships
 * 
 * Algorithm:
 * 1. Convert dark color to CIELAB
 * 2. Invert L* around midpoint (50): L'* = 100 - L*
 * 3. Adjust chroma for light backgrounds (increase slightly for visibility)
 * 4. Clamp to valid RGB gamut
 * 
 * @param darkHex - Dark mode color
 * @param options - Transformation options
 * @returns Light mode color
 */
function generateLightModeColor(
  darkHex: string,
  options: {
    invertLightness?: boolean;
    chromaBoost?: number;
    lightnessShift?: number;
    preserveHue?: boolean;
  } = {}
): string {
  const {
    invertLightness = true,
    chromaBoost = 1.1, // Slight chroma increase for light backgrounds
    lightnessShift = 0,
    preserveHue = true,
  } = options;

  const lab = hexToLab(darkHex);

  // Invert lightness
  let newL = invertLightness ? 100 - lab.L : lab.L;
  newL += lightnessShift;
  newL = Math.max(0, Math.min(100, newL));

  // Adjust chroma if needed
  const chroma = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
  const newChroma = chroma * chromaBoost;

  let newA = lab.a;
  let newB = lab.b;

  if (chroma > 0 && chromaBoost !== 1.0) {
    const hueAngle = Math.atan2(lab.b, lab.a);
    newA = Math.cos(hueAngle) * newChroma;
    newB = Math.sin(hueAngle) * newChroma;
  }

  const newLab: LAB = { L: newL, a: newA, b: newB };

  try {
    return labToHex(newLab);
  } catch (error) {
    // If out of gamut, try reducing chroma
    const reducedChroma = newChroma * 0.8;
    const hueAngle = Math.atan2(newB, newA);
    newLab.a = Math.cos(hueAngle) * reducedChroma;
    newLab.b = Math.sin(hueAngle) * reducedChroma;
    return labToHex(newLab);
  }
}

/**
 * Build theme from palette configuration
 * Works for both dark and light modes
 */
function buildTheme(palette: ThemePalette): VSCodeTheme {
  // Build UI colors from palette
  const themeUiColors: Record<string, string> = {
    // Editor colors
    "editor.background": palette.base.background,
    "editor.foreground": palette.base.foreground,
    "editor.lineNumberActiveForeground": palette.gray.lineNumberActive,
    "editor.lineNumberForeground": palette.gray.lineNumberMuted,
    "editor.selectionBackground": palette.ui.selectionBackground,
    "editor.selectionForeground": palette.base.foreground,
    "editor.inactiveSelectionBackground": palette.ui.selectionInactive,
    "editor.wordHighlightBackground": palette.ui.wordHighlight,
    "editor.wordHighlightStrongBackground": palette.ui.wordHighlightStrong,
    "editor.findMatchBackground": palette.ui.findMatch,
    "editor.findMatchHighlightBackground": palette.ui.findMatchHighlight,
    "editor.hoverHighlightBackground": palette.ui.hoverBackground,
    
    // Sidebar and panels
    "sideBar.background": palette.base.backgroundLighter,
    "sideBar.foreground": palette.base.foreground,
    "sideBar.border": palette.ui.border,
    "panel.background": palette.base.background,
    "panel.foreground": palette.base.foreground,
    "panel.border": palette.ui.border,
    
    // Status bar
    "statusBar.background": palette.base.backgroundLighter,
    "statusBar.foreground": palette.base.foreground,
    
    // Terminal
    "terminal.background": palette.base.background,
    "terminal.foreground": palette.base.foreground,
    "terminal.ansiBlack": palette.gray.tan,
    "terminal.ansiRed": palette.red.errorClay,
    "terminal.ansiGreen": palette.green.statusGood,
    "terminal.ansiYellow": palette.ochre.warningAmber,
    "terminal.ansiBlue": palette.teal.typeSageBold,
    "terminal.ansiMagenta": palette.red.rust,
    "terminal.ansiCyan": palette.teal.operatorSage,
    "terminal.ansiWhite": palette.gray.veryMuted,
    
    // Bracket pairs - "Framing" aesthetic: autumn leaves, sunlight, sand
    "editorBracketHighlight.foreground1": palette.ochre.warningAmber,      // Golden sunlight
    "editorBracketHighlight.foreground2": palette.ochre.autumnRust,        // Autumn leaves
    "editorBracketHighlight.foreground3": palette.ochre.warmBold,          // Ochre sand
    "editorBracketHighlight.foreground4": palette.red.rust,                // Rust/copper
    "editorBracketHighlight.foreground5": palette.brown.htmlEarthy,        // Deep earth
    "editorBracketHighlight.foreground6": palette.green.keywordBold,       // Fresh foliage
    "editorBracketHighlight.unexpectedBracket.foreground": palette.red.errorClay,
  };

  // Diagnostics
  const diagnosticColors: Record<string, string> = {
    "editorError.foreground": palette.red.errorClay,
    "editorWarning.foreground": palette.ochre.warningAmber,
    "editorInfo.foreground": palette.teal.typeSageBold,
    "editorHint.foreground": palette.green.statusGood,
    "editorError.background": palette.red.errorBackground + "30",
    "editorWarning.background": palette.base.backgroundDarker + "30",
    "editorInfo.background": palette.base.backgroundDarker + "30",
    "editorGutter.modifiedBackground": palette.ochre.warningAmber,
    "editorGutter.addedBackground": palette.green.functionMoss,
    "editorGutter.deletedBackground": palette.red.errorClay,
    "editorGutter.foldingControlForeground": palette.gray.commentMuted,
    "problemsErrorIcon.foreground": palette.red.errorClay,
    "problemsWarningIcon.foreground": palette.ochre.warningAmber,
    "problemsInfoIcon.foreground": palette.teal.typeSageBold,
  };

  // Build semantic token colors from palette
  const tokenColors: Record<string, any> = {
    keyword: palette.green.keywordBold,
    "keyword.control": palette.green.keywordBold,
    type: palette.teal.typeSageBold,
    "type.builtin": palette.teal.typeSageBold,
    namespace: palette.teal.namespace,
    "class.builtin": palette.teal.operatorSage,
    "struct.builtin": palette.teal.structureCalm,
    "function.builtin": palette.green.functionMoss,
    "variable.builtin": palette.teal.operatorSage,
    function: palette.green.functionMoss,
    variable: palette.base.foreground,
    number: palette.ochre.autumnRust, // Autumn leaves color for numbers
    string: palette.ochre.warningAmber, // Sunlight amber - warm, visible
    "string.escape": palette.red.errorClay,
    operator: palette.teal.operatorSage,
    comment: palette.gray.commentMuted,
    property: palette.base.foreground,
    parameter: palette.base.foreground,
  };

  // Build TextMate rules from palette
  const textMateRules = [
    {
      scope: ["keyword", "storage.type", "storage.modifier"],
      settings: { foreground: palette.green.keywordBold },
    },
    {
      scope: ["entity.name.type", "support.type", "support.class"],
      settings: { foreground: palette.teal.typeSageBold },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: palette.green.functionMoss },
    },
    {
      scope: ["string"],
      settings: { foreground: palette.ochre.warningAmber },
    },
    {
      scope: ["constant.numeric"],
      settings: { foreground: palette.ochre.autumnRust },
    },
    {
      scope: ["comment"],
      settings: { foreground: palette.gray.commentMuted },
    },
    {
      scope: ["keyword.operator"],
      settings: { foreground: palette.teal.operatorSage },
    },
    {
      scope: ["entity.name.tag"],
      settings: { foreground: palette.brown.htmlEarthy },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: palette.brown.attributeMuted },
    },
    {
      scope: ["punctuation.definition.tag"],
      settings: { foreground: palette.brown.tagPunctuation },
    },
  ];

  return {
    name: palette.name,
    type: palette.type,
    colors: {
      ...themeUiColors,
      ...diagnosticColors,
    },
    tokenColors: textMateRules as Record<string, unknown>[],
    semanticTokenColors: tokenColors,
  };
}

/**
 * Validate color palette for accessibility and scientific compliance
 */
/**
 * Validate color palette for accessibility and scientific compliance
 */
function validatePalette(paletteName: string, palette: Colors): void {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`🔬 SCIENTIFIC VALIDATION: ${paletteName}`);
  console.log(`${"=".repeat(60)}\n`);

  const background = palette.base.background;
  const foreground = palette.base.foreground;

  // 1. WCAG Contrast Validation
  console.log("📊 WCAG 2.1 CONTRAST RATIOS\n");
  const primaryColors = [
    { name: "Foreground", hex: foreground },
    { name: "Keyword Green", hex: palette.green.keywordBold },
    { name: "Function Moss", hex: palette.green.functionMoss },
    { name: "Type Sage", hex: palette.teal.typeSageBold },
    { name: "Number Ochre", hex: palette.ochre.warmBold },
    { name: "Error Clay", hex: palette.red.errorClay },
  ];

  let wcagPass = 0;
  let wcagTotal = 0;

  primaryColors.forEach((color) => {
    const ratio = contrastRatio(background, color.hex);
    const meetsAA = meetsWCAG(background, color.hex, "AA");
    const meetsAAA = meetsWCAG(background, color.hex, "AAA");
    wcagTotal++;
    if (meetsAA) wcagPass++;

    const status = meetsAAA ? "✓ AAA" : meetsAA ? "✓ AA " : "✗ FAIL";
    console.log(`  ${status}  ${color.name.padEnd(20)} ${ratio.toFixed(1)}:1`);
  });

  // 2. Colorblind Safety Validation
  console.log(`\n👁️  COLORBLIND SAFETY (LMS Cone Simulation)\n`);

  const criticalPairs = [
    { fg: palette.green.keywordBold, bg: background, name: "Keywords" },
    { fg: palette.red.errorClay, bg: background, name: "Errors" },
    { fg: palette.ochre.warningAmber, bg: background, name: "Warnings" },
  ];

  let colorblindSafe = 0;
  criticalPairs.forEach((pair) => {
    const safety = validateColorblindSafety(pair.fg, pair.bg, 4.5);
    const allSafe = safety.allSafe;
    colorblindSafe += allSafe ? 1 : 0;

    console.log(`  ${allSafe ? "✓" : "✗"} ${pair.name.padEnd(15)}`);
    console.log(
      `    Normal: ${safety.normal.toFixed(1)}:1  Deut: ${safety.deuteranopia.toFixed(
        1
      )}:1  Prot: ${safety.protanopia.toFixed(1)}:1  Trit: ${safety.tritanopia.toFixed(1)}:1`
    );
  });

  // 3. Eye Comfort Scores
  console.log(`\n🌿 EYE COMFORT SCORES (0-100, higher = better)\n`);

  const comfortColors = [
    { name: "Keyword Green", hex: palette.green.keywordBold },
    { name: "Function Moss", hex: palette.green.functionMoss },
    { name: "Type Teal", hex: palette.teal.typeSageBold },
    { name: "Number Ochre", hex: palette.ochre.warmBold },
    { name: "Error Red", hex: palette.red.errorClay },
  ];

  comfortColors.forEach((color) => {
    const score = calculateEyeComfortScore(color.hex);
    const rating =
      score >= 75 ? "Excellent" : score >= 65 ? "Very Good" : score >= 55 ? "Good" : "Adequate";
    console.log(`  ${color.name.padEnd(20)} ${score.toFixed(1)}/100  (${rating})`);
  });

  // 4. Perceptual Spacing (CIELAB ΔE)
  console.log(`\n📐 PERCEPTUAL SPACING (CIELAB ΔE*ab)\n`);

  const greenFamily = [
    { name: "Keyword", hex: palette.green.keywordBold },
    { name: "Function", hex: palette.green.functionMoss },
    { name: "Status", hex: palette.green.statusGood },
  ];

  for (let i = 0; i < greenFamily.length - 1; i++) {
    const lab1 = hexToLab(greenFamily[i].hex);
    const lab2 = hexToLab(greenFamily[i + 1].hex);
    const delta = deltaE(lab1, lab2);
    const status = delta >= 10 ? "✓" : delta >= 5 ? "~" : "✗";
    console.log(
      `  ${status} ${greenFamily[i].name.padEnd(10)} ↔ ${greenFamily[i + 1].name.padEnd(
        10
      )} ΔE = ${delta.toFixed(1)}`
    );
  }

  // Summary
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📋 VALIDATION SUMMARY\n`);
  console.log(`  WCAG Compliance:  ${wcagPass}/${wcagTotal} passed`);
  console.log(`  Colorblind Safe:  ${colorblindSafe}/${criticalPairs.length} passed`);
  console.log(`  Status:           ${wcagPass === wcagTotal && colorblindSafe === criticalPairs.length ? "✓ ALL TESTS PASSED" : "⚠ REVIEW NEEDED"}`);
  console.log(`${"=".repeat(60)}\n`);
}

function writeTheme(theme: VSCodeTheme, filename: string): void {
  const themesDir = path.join(__dirname, "..", "themes");
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }
  const outputPath = path.join(themesDir, filename);
  fs.writeFileSync(outputPath, JSON.stringify(theme, null, 2));
  console.log(`✓ Generated ${filename}`);
}

// Main build process
console.log("🎨 Human Theme Generator\n");
console.log("Building research-grade, scientifically-validated themes...\n");

// Generate all themes from config
for (const config of themeConfigs) {
  const theme = buildTheme(config);
  const filename = `${config.name.toLowerCase().replace(/\s+/g, "-")}-color-theme.json`;
  writeTheme(theme, filename);
}

console.log("\n✓ All themes generated successfully!");

// Run validation if --validate flag present
const shouldValidate = process.argv.includes("--validate") || process.argv.includes("-v");

if (shouldValidate) {
  for (const config of themeConfigs) {
    validatePalette(`${config.name}`, config as Colors);
  }
}

console.log("\nTo use:");
console.log("  1. Reload VS Code window (Cmd+R / Ctrl+R)");
console.log("  2. Open Command Palette: 'Preferences: Color Theme'");
console.log("  3. Select 'Human Dark', 'Human Light', or 'Human Low Light'\n");
console.log("To validate colors:");
console.log("  npm run build -- --validate\n");

