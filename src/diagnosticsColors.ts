/**
 * Diagnostics & Debugging - Errors, warnings, breakpoints, test results
 */

import { colors } from "./colors";

export const diagnosticsColors = {
  // Inline diagnostics
  "editorError.foreground": colors.red.errorClay,
  "editorWarning.foreground": colors.ochre.warmBold,
  "editorInfo.foreground": colors.teal.typeSageBold,
  "editorHint.foreground": colors.green.statusGood,

  "editorError.background": colors.red.errorBackground + "40",
  "editorWarning.background": "#2A241440",
  "editorInfo.background": "#16221C40",

  "editorError.border": "#3A2018",
  "editorWarning.border": "#3A3618",
  "editorInfo.border": "#1A2825",

  // Gutter indicators
  "editorGutter.modifiedBackground": colors.ochre.warmBold,
  "editorGutter.addedBackground": colors.green.functionMoss,
  "editorGutter.deletedBackground": colors.red.errorClay,
  "editorGutter.foldingControlForeground": colors.gray.commentMuted,
  "editorGutter.commentRangeForeground": colors.ui.border,
  "editorGutter.commentGlyphForeground": colors.gray.commentMuted,
  "editorGutter.commentUnresolvedGlyphForeground": colors.red.errorClay,

  // Breakpoints
  "debugIcon.breakpointForeground": colors.red.errorClay,
  "debugIcon.breakpointDisabledForeground": colors.gray.commentMuted,
  "debugIcon.breakpointUnverifiedForeground": colors.ochre.warmBold,
  "debugIcon.breakpointCurrentStackframeForeground": colors.green.keywordBold,
  "debugIcon.breakpointStackframeForeground": colors.teal.typeSageBold,

  // Testing
  "testing.iconPassed": colors.green.functionMoss,
  "testing.iconFailed": colors.red.errorClay,
  "testing.iconSkipped": colors.gray.commentMuted,
  "testing.iconQueued": colors.ochre.warmBold,
  "testing.runAction": colors.green.keywordBold,
  "testing.message.error.lineBackground": colors.red.errorBackground,
  "testing.message.info.lineBackground": "#16221C",

  // Problem panel
  "problemsErrorIcon.foreground": colors.red.errorClay,
  "problemsWarningIcon.foreground": colors.ochre.warmBold,
  "problemsInfoIcon.foreground": colors.teal.typeSageBold,

  // Diff editor
  "diffEditor.insertedTextBackground": "#16332140",
  "diffEditor.removedTextBackground": colors.red.errorBackground + "40",
};

export type DiagnosticsColors = typeof diagnosticsColors;
