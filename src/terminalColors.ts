/**
 * Terminal Colors - ANSI 16-color palette for terminal/console
 */

import { colors } from "./colors";

export const terminalColors = {
  // Standard ANSI colors (0-7)
  "terminal.ansiBlack": colors.base.backgroundDarker,
  "terminal.ansiRed": colors.red.errorClay,
  "terminal.ansiGreen": colors.green.functionMoss,
  "terminal.ansiYellow": colors.ochre.warmBold,
  "terminal.ansiBlue": colors.teal.typeSageBold,
  "terminal.ansiMagenta": colors.red.rust,
  "terminal.ansiCyan": colors.teal.operatorSage,
  "terminal.ansiWhite": colors.base.foregroundMuted,

  // Bright ANSI colors (8-15)
  "terminal.ansiBrightBlack": colors.gray.lineNumberMuted,
  "terminal.ansiBrightRed": colors.red.errorLight,
  "terminal.ansiBrightGreen": colors.green.keywordBold,
  "terminal.ansiBrightYellow": colors.ochre.warningAmber,
  "terminal.ansiBrightBlue": colors.teal.structureCalm,
  "terminal.ansiBrightMagenta": colors.red.errorLight,
  "terminal.ansiBrightCyan": colors.teal.structureCalm,
  "terminal.ansiBrightWhite": colors.base.foreground,

  // Terminal UI
  "terminal.background": colors.base.shadowColor,
  "terminal.foreground": colors.base.foreground,
  "terminalCursor.foreground": colors.green.keywordBold,
  "terminal.selectionBackground": colors.ui.selectionBackground,
  "terminalCommandDecoration.successBackground": "#163321",
  "terminalCommandDecoration.errorBackground": colors.red.errorBackground,
};

export type TerminalColors = typeof terminalColors;
