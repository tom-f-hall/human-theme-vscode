/**
 * Terminal Colors - ANSI 16-color palette for terminal/console
 * Generated from palette - not hardcoded
 */

import { Colors } from "./colors";

export function buildTerminalColors(palette: Colors) {
  return {
    // Standard ANSI colors (0-7)
    "terminal.ansiBlack": palette.base.backgroundDarker,
    "terminal.ansiRed": palette.red.errorClay,
    "terminal.ansiGreen": palette.green.functionMoss,
    "terminal.ansiYellow": palette.ochre.warmBold,
    "terminal.ansiBlue": palette.teal.typeSageBold,
    "terminal.ansiMagenta": palette.red.rust,
    "terminal.ansiCyan": palette.teal.operatorSage,
    "terminal.ansiWhite": palette.base.foregroundMuted,

    // Bright ANSI colors (8-15)
    "terminal.ansiBrightBlack": palette.gray.lineNumberMuted,
    "terminal.ansiBrightRed": palette.red.errorLight,
    "terminal.ansiBrightGreen": palette.green.keywordBold,
    "terminal.ansiBrightYellow": palette.ochre.warningAmber,
    "terminal.ansiBrightBlue": palette.teal.structureCalm,
    "terminal.ansiBrightMagenta": palette.red.errorLight,
    "terminal.ansiBrightCyan": palette.teal.structureCalm,
    "terminal.ansiBrightWhite": palette.base.foreground,

    // Terminal UI
    "terminal.background": palette.base.background,
    "terminal.foreground": palette.base.foreground,
    "terminalCursor.foreground": palette.green.keywordBold,
    "terminal.selectionBackground": palette.ui.selectionBackground,
    "terminalCommandDecoration.successBackground": palette.green.functionMoss + "40",
    "terminalCommandDecoration.errorBackground": palette.red.errorBackground,
  };
}

export type TerminalColors = ReturnType<typeof buildTerminalColors>;
