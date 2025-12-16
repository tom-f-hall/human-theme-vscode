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
 * Build comprehensive UI colors from palette configuration
 * Mercury OS-inspired: borderless, flat, content-first
 */
function buildUiColors(palette: ThemePalette): Record<string, string> {
  return {
    // Core editor
    "editor.background": palette.base.background,
    "editor.foreground": palette.base.foreground,
    "editorLineNumber.foreground": palette.gray.lineNumberMuted,
    "editorLineNumber.activeForeground": palette.gray.lineNumberActive,
    "editorCursor.foreground": palette.green.keywordBold,

    // Selection & focus
    "editor.selectionBackground": palette.ui.selectionBackground,
    "editor.inactiveSelectionBackground": palette.ui.selectionInactive + "80",
    "editor.selectionHighlightBackground": palette.ui.selectionHighlight + "60",
    "editor.wordHighlightBackground": palette.ui.wordHighlight + "80",
    "editor.wordHighlightStrongBackground": palette.ui.wordHighlightStrong + "80",
    "editor.findMatchBackground": palette.ui.findMatch,
    "editor.findMatchHighlightBackground": palette.ui.findMatchHighlight + "60",

    // Panels & lifecycle UI (Mercury OS: Minimal borders, unified backgrounds)
    "sideBar.background": palette.base.background,
    "sideBar.foreground": palette.base.foregroundMuted,
    "sideBar.border": "#00000000",
    "activityBar.background": palette.base.background,
    "activityBar.foreground": palette.green.keywordBold,
    "activityBar.inactiveForeground": palette.gray.commentMuted,
    "activityBar.border": "#00000000",
    "statusBar.background": palette.base.background,
    "statusBar.foreground": palette.base.foregroundMuted,
    "statusBar.border": "#00000000",
    "panel.background": palette.base.background,
    "panel.border": "#00000000",
    "panelTitle.activeBorder": palette.green.keywordBold,
    "panelTitle.activeForeground": palette.base.foreground,
    "panelTitle.inactiveForeground": palette.gray.commentMuted,

    // Lists / trees
    "list.activeSelectionBackground": palette.ui.selectionBackground,
    "list.activeSelectionForeground": palette.base.foreground,
    "list.inactiveSelectionBackground": palette.ui.selectionInactive,
    "list.hoverBackground": palette.ui.hoverBackground,
    "list.focusOutline": "#00000000",
    "list.focusAndSelectionOutline": "#00000000",
    "tree.indentGuidesStroke": palette.base.backgroundLighter,

    // Focus & borders
    "focusBorder": palette.green.keywordBold + "40",
    "contrastBorder": "#00000000",

    // Links & text
    "textLink.foreground": palette.teal.typeSageBold,
    "textLink.activeForeground": palette.green.keywordBold,
    "textPreformat.foreground": palette.green.leafLight,

    // Buttons
    "button.background": palette.green.keywordBold,
    "button.foreground": palette.base.background,
    "button.hoverBackground": palette.green.functionMoss,
    "button.secondaryBackground": palette.ui.border,
    "button.secondaryForeground": palette.base.foreground,
    "button.secondaryHoverBackground": palette.ui.hoverBackground,

    // Input & dropdowns
    "input.background": palette.base.background,
    "input.border": palette.base.backgroundLighter,
    "input.foreground": palette.base.foreground,
    "input.placeholderForeground": palette.gray.commentMuted,
    "inputOption.activeBorder": palette.green.keywordBold + "60",
    "inputOption.activeBackground": palette.ui.selectionBackground,
    "inputValidation.errorBackground": palette.red.errorBackground,
    "inputValidation.errorBorder": palette.red.errorClay + "40",
    "inputValidation.warningBackground": palette.base.backgroundDarker,
    "inputValidation.warningBorder": palette.ochre.warmBold + "40",
    "inputValidation.infoBackground": palette.base.backgroundDarker,
    "inputValidation.infoBorder": palette.diagnostic.info + "40",
    "dropdown.background": palette.base.background,
    "dropdown.border": palette.base.backgroundLighter,
    "dropdown.foreground": palette.base.foreground,

    // Scrollbar
    "scrollbar.shadow": "#00000000",
    "scrollbarSlider.background": palette.gray.commentMuted + "20",
    "scrollbarSlider.hoverBackground": palette.gray.commentMuted + "40",
    "scrollbarSlider.activeBackground": palette.green.keywordBold + "60",

    // Breadcrumbs
    "breadcrumb.foreground": palette.teal.operatorSage,
    "breadcrumb.background": palette.base.background,
    "breadcrumb.focusForeground": palette.green.keywordBold,
    "breadcrumbPicker.background": palette.base.background,

    // Badges
    "badge.background": palette.ui.selectionBackground,
    "badge.foreground": palette.green.keywordBold,

    // Bracket pairs
    "editorBracketHighlight.foreground1": palette.ochre.warningAmber,
    "editorBracketHighlight.foreground2": palette.ochre.autumnRust,
    "editorBracketHighlight.foreground3": palette.ochre.warmBold,
    "editorBracketHighlight.foreground4": palette.red.rust,
    "editorBracketHighlight.foreground5": palette.brown.htmlEarthy,
    "editorBracketHighlight.foreground6": palette.green.keywordBold,
    "editorBracketHighlight.unexpectedBracket.foreground": palette.red.errorClay,

    // Notifications
    "notificationCenter.border": "#00000000",
    "notificationCenterHeader.background": palette.base.background,
    "notificationCenterHeader.foreground": palette.base.foreground,
    "notifications.background": palette.base.backgroundLighter,
    "notifications.foreground": palette.base.foreground,
    "notifications.border": "#00000000",

    // Autocomplete/suggestions
    "editorSuggestWidget.background": palette.base.background,
    "editorSuggestWidget.border": palette.base.backgroundLighter,
    "editorSuggestWidget.foreground": palette.base.foreground,
    "editorSuggestWidget.selectedBackground": palette.ui.selectionBackground,
    "editorSuggestWidget.highlightForeground": palette.green.keywordBold,

    // Peek view
    "peekView.border": palette.base.backgroundLighter,
    "peekViewEditor.background": palette.base.background,
    "peekViewEditor.matchHighlightBackground": palette.ui.selectionHighlight,
    "peekViewResult.background": palette.base.background,
    "peekViewResult.matchHighlightBackground": palette.ui.selectionHighlight,
    "peekViewResult.selectionBackground": palette.ui.selectionBackground,
    "peekViewTitle.background": palette.base.background,

    // Tabs
    "tab.activeBackground": palette.base.background,
    "tab.activeForeground": palette.base.foreground,
    "tab.activeBorder": "#00000000",
    "tab.activeBorderTop": palette.green.keywordBold,
    "tab.inactiveBackground": palette.base.background,
    "tab.inactiveForeground": palette.gray.commentMuted,
    "tab.hoverBackground": palette.ui.hoverBackground,
    "tab.unfocusedActiveBackground": palette.base.background,
    "tab.unfocusedActiveBorder": "#00000000",
    "tab.border": "#00000000",
    "editorGroupHeader.tabsBackground": palette.base.background,
    "editorGroupHeader.tabsBorder": "#00000000",
    "editorGroupHeader.border": "#00000000",
    "editorGroup.border": "#00000000",
    "editorGroup.dropBackground": palette.ui.selectionBackground + "40",
    "editorGroupHeader.noTabsBackground": palette.base.background,

    // Editor widget
    "editorWidget.background": palette.base.background,
    "editorWidget.border": palette.base.backgroundLighter,
    "editorWidget.foreground": palette.base.foreground,
    "editorWidget.resizeBorder": "#00000000",

    // Editor gutter
    "editorGutter.background": palette.base.background,
    "editorGutter.addedBackground": palette.green.functionMoss + "60",
    "editorGutter.modifiedBackground": palette.ochre.warmBold + "60",
    "editorGutter.deletedBackground": palette.red.errorClay + "60",
    "editorGutter.commentRangeForeground": palette.gray.commentMuted,
    "editorGutter.foldingControlForeground": palette.gray.commentMuted,

    // Diff editor
    "diffEditor.insertedTextBackground": palette.green.functionMoss + "20",
    "diffEditor.removedTextBackground": palette.red.errorClay + "20",
    "diffEditor.insertedLineBackground": palette.green.functionMoss + "10",
    "diffEditor.removedLineBackground": palette.red.errorClay + "10",
    "diffEditor.diagonalFill": palette.base.backgroundDarker + "60",
    "diffEditor.border": "#00000000",

    // Merge conflicts
    "merge.currentHeaderBackground": palette.teal.typeSageBold + "40",
    "merge.currentContentBackground": palette.teal.typeSageBold + "20",
    "merge.incomingHeaderBackground": palette.green.functionMoss + "40",
    "merge.incomingContentBackground": palette.green.functionMoss + "20",
    "merge.border": "#00000000",
    "merge.commonContentBackground": palette.base.backgroundLighter,
    "merge.commonHeaderBackground": palette.base.backgroundLighter,

    // Title bar
    "titleBar.activeBackground": palette.base.background,
    "titleBar.activeForeground": palette.base.foreground,
    "titleBar.inactiveBackground": palette.base.background,
    "titleBar.inactiveForeground": palette.gray.commentMuted,
    "titleBar.border": "#00000000",

    // Menu bar
    "menubar.selectionBackground": palette.ui.selectionBackground,
    "menubar.selectionForeground": palette.base.foreground,
    "menu.background": palette.base.background,
    "menu.foreground": palette.base.foreground,
    "menu.selectionBackground": palette.ui.selectionBackground,
    "menu.selectionForeground": palette.base.foreground,
    "menu.separatorBackground": palette.base.backgroundLighter,
    "menu.border": palette.base.backgroundLighter,

    // Toolbar
    "toolbar.hoverBackground": palette.ui.hoverBackground,
    "toolbar.activeBackground": palette.ui.selectionBackground,

    // Quick picker
    "quickInput.background": palette.base.background,
    "quickInput.foreground": palette.base.foreground,
    "quickInputList.focusBackground": palette.ui.selectionBackground,
    "quickInputList.focusForeground": palette.base.foreground,
    "quickInputTitle.background": palette.base.background,

    // Welcome page
    "welcomePage.background": palette.base.background,
    "welcomePage.tileBackground": palette.base.backgroundLighter,
    "welcomePage.tileHoverBackground": palette.ui.hoverBackground,
    "walkThrough.embeddedEditorBackground": palette.base.backgroundDarker,

    // Settings editor
    "settings.headerForeground": palette.base.foreground,
    "settings.modifiedItemIndicator": palette.ochre.warmBold,
    "settings.dropdownBackground": palette.base.background,
    "settings.dropdownForeground": palette.base.foreground,
    "settings.dropdownBorder": palette.base.backgroundLighter,
    "settings.checkboxBackground": palette.base.background,
    "settings.checkboxForeground": palette.green.keywordBold,
    "settings.checkboxBorder": palette.base.backgroundLighter,
    "settings.textInputBackground": palette.base.background,
    "settings.textInputForeground": palette.base.foreground,
    "settings.textInputBorder": palette.base.backgroundLighter,
    "settings.numberInputBackground": palette.base.background,
    "settings.numberInputForeground": palette.base.foreground,
    "settings.numberInputBorder": palette.base.backgroundLighter,

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
    "terminal.ansiBrightBlack": palette.gray.commentMuted,
    "terminal.ansiBrightRed": palette.red.errorLight,
    "terminal.ansiBrightGreen": palette.green.leafLight,
    "terminal.ansiBrightYellow": palette.ochre.warningAmber,
    "terminal.ansiBrightBlue": palette.teal.namespace,
    "terminal.ansiBrightMagenta": palette.red.errorLight,
    "terminal.ansiBrightCyan": palette.teal.structureCalm,
    "terminal.ansiBrightWhite": palette.base.foreground,

    // Debug toolbar
    "debugToolBar.background": palette.base.backgroundLighter,
    "debugToolBar.border": "#00000000",

    // Editor ruler & guides
    "editorRuler.foreground": palette.base.backgroundLighter,
    "editorIndentGuide.background": palette.base.backgroundLighter + "40",
    "editorIndentGuide.activeBackground": palette.gray.commentMuted + "60",

    // Editor code lens
    "editorCodeLens.foreground": palette.gray.commentMuted,

    // Symbol icons
    "symbolIcon.arrayForeground": palette.ochre.constantMuted,
    "symbolIcon.booleanForeground": palette.ochre.warmBold,
    "symbolIcon.classForeground": palette.teal.typeSageBold,
    "symbolIcon.colorForeground": palette.ochre.warningAmber,
    "symbolIcon.constantForeground": palette.ochre.constantMuted,
    "symbolIcon.constructorForeground": palette.green.functionMoss,
    "symbolIcon.enumeratorForeground": palette.teal.typeSageBold,
    "symbolIcon.enumeratorMemberForeground": palette.ochre.constantMuted,
    "symbolIcon.eventForeground": palette.red.rust,
    "symbolIcon.fieldForeground": palette.base.foreground,
    "symbolIcon.fileForeground": palette.gray.tan,
    "symbolIcon.folderForeground": palette.teal.operatorSage,
    "symbolIcon.functionForeground": palette.green.functionMoss,
    "symbolIcon.interfaceForeground": palette.teal.typeSageBold,
    "symbolIcon.keyForeground": palette.green.keywordBold,
    "symbolIcon.keywordForeground": palette.green.keywordBold,
    "symbolIcon.methodForeground": palette.green.functionMoss,
    "symbolIcon.moduleForeground": palette.teal.namespace,
    "symbolIcon.namespaceForeground": palette.teal.namespace,
    "symbolIcon.nullForeground": palette.gray.commentMuted,
    "symbolIcon.numberForeground": palette.ochre.warmBold,
    "symbolIcon.objectForeground": palette.teal.structureCalm,
    "symbolIcon.operatorForeground": palette.teal.operatorSage,
    "symbolIcon.packageForeground": palette.teal.namespace,
    "symbolIcon.propertyForeground": palette.base.foreground,
    "symbolIcon.referenceForeground": palette.teal.operatorSage,
    "symbolIcon.snippetForeground": palette.ochre.warningAmber,
    "symbolIcon.stringForeground": palette.ochre.warningAmber,
    "symbolIcon.structForeground": palette.teal.structureCalm,
    "symbolIcon.textForeground": palette.base.foreground,
    "symbolIcon.typeParameterForeground": palette.teal.typeSageBold,
    "symbolIcon.unitForeground": palette.ochre.constantMuted,
    "symbolIcon.variableForeground": palette.base.foreground,

    // Charts
    "charts.foreground": palette.base.foreground,
    "charts.lines": palette.gray.commentMuted,
    "charts.red": palette.red.errorClay,
    "charts.blue": palette.teal.typeSageBold,
    "charts.yellow": palette.ochre.warningAmber,
    "charts.orange": palette.ochre.autumnRust,
    "charts.green": palette.green.functionMoss,
    "charts.purple": palette.red.rust,

    // Extension badges
    "extensionBadge.remoteBackground": palette.green.keywordBold,
    "extensionBadge.remoteForeground": palette.base.background,
    "extensionButton.prominentBackground": palette.green.keywordBold,
    "extensionButton.prominentForeground": palette.base.background,
    "extensionButton.prominentHoverBackground": palette.green.functionMoss,

    // Git decorations
    "gitDecoration.addedResourceForeground": palette.green.functionMoss,
    "gitDecoration.modifiedResourceForeground": palette.ochre.warmBold,
    "gitDecoration.deletedResourceForeground": palette.red.errorClay,
    "gitDecoration.untrackedResourceForeground": palette.teal.operatorSage,
    "gitDecoration.ignoredResourceForeground": palette.gray.commentMuted,
    "gitDecoration.conflictingResourceForeground": palette.red.rust,
    "gitDecoration.submoduleResourceForeground": palette.teal.namespace,

    // Diagnostics
    "editorError.foreground": palette.diagnostic.error,
    "editorWarning.foreground": palette.diagnostic.warning,
    "editorInfo.foreground": palette.diagnostic.info,
    "editorHint.foreground": palette.diagnostic.hint,
    "editorError.background": palette.red.errorBackground + "30",
    "editorWarning.background": palette.base.backgroundDarker + "30",
    "editorInfo.background": palette.base.backgroundDarker + "30",
    "problemsErrorIcon.foreground": palette.diagnostic.error,
    "problemsWarningIcon.foreground": palette.diagnostic.warning,
    "problemsInfoIcon.foreground": palette.diagnostic.info,

    // Minimap
    "minimap.background": palette.base.background,
    "minimap.selectionHighlight": palette.ui.selectionBackground + "80",
    "minimap.selectionOccurrenceHighlight": palette.ui.wordHighlight + "80",
    "minimap.errorHighlight": palette.red.errorBackground,
    "minimap.warningHighlight": palette.ochre.warmBold + "60",
    "minimap.findMatchHighlight": palette.ui.findMatch,

    // SCM
    "scm.providerBorder": "#00000000",
  };
}

/**
 * Build theme from palette configuration
 * Works for both dark and light modes
 */
function buildTheme(palette: ThemePalette): VSCodeTheme {
  const allUiColors = buildUiColors(palette);

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
    colors: allUiColors,
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

