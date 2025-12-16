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
  // Build comprehensive UI colors using palette as if it were the colors object
  const buildUiColors = (p: ThemePalette) => ({
    // Core editor
    "editor.background": p.base.background,
    "editor.foreground": p.base.foreground,
    "editorLineNumber.foreground": p.gray.lineNumberMuted,
    "editorLineNumber.activeForeground": p.gray.lineNumberActive,
    "editorCursor.foreground": p.green.keywordBold,

    // Selection & focus
    "editor.selectionBackground": p.ui.selectionBackground,
    "editor.inactiveSelectionBackground": p.ui.selectionInactive + "80",
    "editor.selectionHighlightBackground": p.ui.selectionHighlight + "60",
    "editor.wordHighlightBackground": p.ui.wordHighlight + "80",
    "editor.wordHighlightStrongBackground": p.ui.wordHighlightStrong + "80",
    "editor.findMatchBackground": p.ui.findMatch,
    "editor.findMatchHighlightBackground": p.ui.findMatchHighlight + "60",
    "editor.hoverHighlightBackground": p.ui.hoverBackground,

    // Panels & UI (Mercury OS: Minimal borders, unified backgrounds)
    "sideBar.background": p.base.background,
    "sideBar.foreground": p.base.foregroundMuted,
    "sideBar.border": "#00000000",
    "activityBar.background": p.base.background,
    "activityBar.foreground": p.green.keywordBold,
    "activityBar.inactiveForeground": p.gray.commentMuted,
    "activityBar.border": "#00000000",
    "statusBar.background": p.base.background,
    "statusBar.foreground": p.base.foregroundMuted,
    "statusBar.border": "#00000000",
    "panel.background": p.base.background,
    "panel.border": "#00000000",
    "tab.activeBackground": p.base.background,
    "tab.inactiveBackground": p.base.backgroundDarker,
    "tab.border": "#00000000",
    "titleBar.activeBackground": p.base.background,
    "titleBar.activeForeground": p.base.foreground,
    "titleBar.border": "#00000000",

    // Lists / trees
    "list.activeSelectionBackground": p.ui.selectionBackground,
    "list.activeSelectionForeground": p.base.foreground,
    "list.hoverBackground": p.ui.hoverBackground,
    "list.inactiveSelectionBackground": p.ui.selectionInactive,
    "list.focusOutline": "#00000000",
    "list.focusAndSelectionOutline": "#00000000",
    "tree.indentGuidesStroke": p.base.backgroundLighter,

    // Focus & borders (Mercury OS: Minimal)
    "focusBorder": p.green.keywordBold + "40",
    "contrastBorder": "#00000000",

    // Links
    "textLink.foreground": p.teal.typeSageBold,
    "textLink.activeForeground": p.green.keywordBold,

    // Input & dropdowns
    "input.background": p.base.background,
    "input.border": p.base.backgroundLighter,
    "input.foreground": p.base.foreground,
    "input.placeholderForeground": p.gray.commentMuted,
    "dropdown.background": p.base.background,
    "dropdown.border": p.base.backgroundLighter,
    "dropdown.foreground": p.base.foreground,

    // Scrollbar (Mercury OS: Invisible until needed)
    "scrollbar.shadow": "#00000000",
    "scrollbarSlider.background": p.gray.commentMuted + "20",
    "scrollbarSlider.hoverBackground": p.gray.commentMuted + "40",
    "scrollbarSlider.activeBackground": p.green.keywordBold + "60",

    // Breadcrumbs
    "breadcrumb.foreground": p.teal.operatorSage,
    "breadcrumb.background": p.base.background,
    "breadcrumb.focusForeground": p.green.keywordBold,
    "breadcrumb.activeSelectionForeground": p.green.keywordBold,

    // Terminal
    "terminal.background": p.base.background,
    "terminal.foreground": p.base.foreground,
    "terminal.ansiBlack": p.gray.tan,
    "terminal.ansiRed": p.red.errorClay,
    "terminal.ansiGreen": p.green.statusGood,
    "terminal.ansiYellow": p.ochre.warningAmber,
    "terminal.ansiBlue": p.teal.typeSageBold,
    "terminal.ansiMagenta": p.red.rust,
    "terminal.ansiCyan": p.teal.operatorSage,
    "terminal.ansiWhite": p.gray.veryMuted,
    "terminal.ansiBrightBlack": p.gray.commentMuted,
    "terminal.ansiBrightRed": p.red.errorLight,
    "terminal.ansiBrightGreen": p.green.leafLight,
    "terminal.ansiBrightYellow": p.ochre.warningAmber,
    "terminal.ansiBrightBlue": p.teal.typeSageBold,
    "terminal.ansiBrightMagenta": p.red.rust,
    "terminal.ansiBrightCyan": p.teal.namespace,
    "terminal.ansiBrightWhite": p.base.foreground,

    // Bracket pairs
    "editorBracketHighlight.foreground1": p.ochre.warningAmber,
    "editorBracketHighlight.foreground2": p.ochre.autumnRust,
    "editorBracketHighlight.foreground3": p.ochre.warmBold,
    "editorBracketHighlight.foreground4": p.red.rust,
    "editorBracketHighlight.foreground5": p.brown.htmlEarthy,
    "editorBracketHighlight.foreground6": p.green.keywordBold,
    "editorBracketHighlight.unexpectedBracket.foreground": p.red.errorClay,

    // Diagnostics & errors
    "editorError.foreground": p.red.errorClay,
    "editorWarning.foreground": p.ochre.warningAmber,
    "editorInfo.foreground": p.teal.typeSageBold,
    "editorHint.foreground": p.green.statusGood,
    "editorError.background": p.red.errorBackground + "30",
    "editorWarning.background": p.base.backgroundDarker + "30",
    "editorInfo.background": p.base.backgroundDarker + "30",
    "editorGutter.modifiedBackground": p.ochre.warningAmber,
    "editorGutter.addedBackground": p.green.functionMoss,
    "editorGutter.deletedBackground": p.red.errorClay,
    "editorGutter.foldingControlForeground": p.gray.commentMuted,
    "problemsErrorIcon.foreground": p.red.errorClay,
    "problemsWarningIcon.foreground": p.ochre.warningAmber,
    "problemsInfoIcon.foreground": p.teal.typeSageBold,

    // Git decorations
    "gitDecoration.modifiedResourceForeground": p.ochre.warningAmber,
    "gitDecoration.addedResourceForeground": p.green.functionMoss,
    "gitDecoration.deletedResourceForeground": p.red.errorClay,
    "gitDecoration.untrackedResourceForeground": p.green.leafLight,
    "gitDecoration.conflictingResourceForeground": p.red.rust,
    "gitDecoration.ignoredResourceForeground": p.gray.commentMuted,

    // Diff editor
    "diffEditor.insertedTextBackground": p.green.successLight + "15",
    "diffEditor.removedTextBackground": p.red.errorLight + "15",

    // Extensions
    "extensionButton.prominentBackground": p.green.keywordBold,
    "extensionButton.prominentForeground": p.base.backgroundDarker,
    "extensionButton.prominentHoverBackground": p.green.functionMoss,

    // Symbol icons
    "symbolIcon.classForeground": p.teal.typeSageBold,
    "symbolIcon.functionForeground": p.green.functionMoss,
    "symbolIcon.variableForeground": p.base.foreground,
    "symbolIcon.keywordForeground": p.green.keywordBold,
  });

  const themeUiColors = buildUiColors(palette);

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
    colors: themeUiColors,
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

