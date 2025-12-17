/**
 * Git/SCM Decorations - File colors in explorer, git history, etc.
 * Generated from palette - not hardcoded
 */

import { Colors } from "./colors";

export function buildGitColors(palette: Colors) {
  return {
    // Git file status decorations
    "gitDecoration.addedResourceForeground": palette.green.functionMoss,
    "gitDecoration.modifiedResourceForeground": palette.ochre.warmBold,
    "gitDecoration.deletedResourceForeground": palette.red.errorClay,
    "gitDecoration.untrackedResourceForeground": palette.green.leafLight,
    "gitDecoration.ignoredResourceForeground": palette.gray.commentMuted,
    "gitDecoration.conflictingResourceForeground": palette.red.rust,
    "gitDecoration.submoduleResourceForeground": palette.teal.namespace,

    // Merge conflict backgrounds
    "merge.currentHeaderBackground": palette.teal.typeSageBold + "40",
    "merge.currentContentBackground": palette.teal.typeSageBold + "20",
    "merge.incomingHeaderBackground": palette.green.functionMoss + "40",
    "merge.incomingContentBackground": palette.green.functionMoss + "20",
    "merge.commonHeaderBackground": palette.base.backgroundLighter + "40",
    "merge.commonContentBackground": palette.base.backgroundLighter + "20",
    "merge.border": "#00000000",
  };
}

export type GitColors = ReturnType<typeof buildGitColors>;
