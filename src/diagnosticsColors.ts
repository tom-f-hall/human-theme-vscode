/**
 * Diagnostics & Debugging - Errors, warnings, breakpoints, test results
 * Generated from palette - not hardcoded
 */

import { Colors } from "./colors";

export function buildDiagnosticsColors(palette: Colors) {
  return {
    // Inline diagnostics
    "editorError.foreground": palette.red.errorClay,
    "editorWarning.foreground": palette.ochre.warmBold,
    "editorInfo.foreground": palette.teal.typeSageBold,
    "editorHint.foreground": palette.green.statusGood,

    "editorError.background": palette.red.errorBackground + "40",
    "editorWarning.background": palette.base.backgroundDarker + "40",
    "editorInfo.background": palette.base.backgroundDarker + "40",

    "editorError.border": palette.red.errorClay + "40",
    "editorWarning.border": palette.ochre.warmBold + "40",
    "editorInfo.border": palette.teal.typeSageBold + "40",

    // Gutter indicators
    "editorGutter.modifiedBackground": palette.ochre.warmBold,
    "editorGutter.addedBackground": palette.green.functionMoss,
    "editorGutter.deletedBackground": palette.red.errorClay,
    "editorGutter.foldingControlForeground": palette.gray.commentMuted,
    "editorGutter.commentRangeForeground": palette.ui.border,
    "editorGutter.commentGlyphForeground": palette.gray.commentMuted,
    "editorGutter.commentUnresolvedGlyphForeground": palette.red.errorClay,

    // Breakpoints
    "debugIcon.breakpointForeground": palette.red.errorClay,
    "debugIcon.breakpointDisabledForeground": palette.gray.commentMuted,
    "debugIcon.breakpointUnverifiedForeground": palette.ochre.warmBold,
    "debugIcon.breakpointCurrentStackframeForeground": palette.green.keywordBold,
    "debugIcon.breakpointStackframeForeground": palette.teal.typeSageBold,

    // Testing
    "testing.iconPassed": palette.green.functionMoss,
    "testing.iconFailed": palette.red.errorClay,
    "testing.iconSkipped": palette.gray.commentMuted,
    "testing.iconQueued": palette.ochre.warmBold,
    "testing.runAction": palette.green.keywordBold,
    "testing.message.error.lineBackground": palette.red.errorBackground,
    "testing.message.info.lineBackground": palette.base.backgroundLighter,

    // Problem panel
    "problemsErrorIcon.foreground": palette.red.errorClay,
    "problemsWarningIcon.foreground": palette.ochre.warmBold,
    "problemsInfoIcon.foreground": palette.teal.typeSageBold,

    // Diff editor
    "diffEditor.insertedTextBackground": palette.green.successLight + "20",
    "diffEditor.removedTextBackground": palette.red.errorLight + "20",
  };
}

export type DiagnosticsColors = ReturnType<typeof buildDiagnosticsColors>;
