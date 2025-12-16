/**
 * Git/SCM Decorations - File colors in explorer, git history, etc.
 */

import { colors } from "./colors";

export const gitColors = {
  // Merge conflict (backgrounds must be transparent)
  "merge.currentHeaderBackground": "#16332140",
  "merge.currentContentBackground": "#16332130",
  "merge.incomingHeaderBackground": colors.red.errorBackground + "40",
  "merge.incomingContentBackground": colors.red.errorBackground + "30",
  "merge.commonHeaderBackground": colors.ui.border + "40",
  "merge.commonContentBackground": colors.ui.hoverBackground + "30",
};

export type GitColors = typeof gitColors;
