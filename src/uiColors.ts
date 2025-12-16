/**
 * UI/Workbench Colors - Mercury OS-inspired Minimalism
 * 
 * Design Principles:
 * 1. Reduced Visual Noise: Minimal borders, subtle separations
 * 2. Content First: UI chrome fades into background, content stands out
 * 3. Flat Hierarchy: Less depth, more consistency
 * 4. Subtle Feedback: Interactions through opacity/tint, not harsh lines
 * 
 * Mercury OS Inspiration:
 * - Modular, composable UI elements
 * - Emphasis on whitespace and breathing room
 * - Invisible until you need it (borders, dividers)
 * - Natural, understated interactions
 */

import { colors } from "./colors";

export const uiColors = {
  // Core editor
  "editor.background": colors.base.background,
  "editor.foreground": colors.base.foreground,
  "editorLineNumber.foreground": colors.gray.lineNumberMuted,
  "editorLineNumber.activeForeground": colors.gray.lineNumberActive,
  "editorCursor.foreground": colors.green.keywordBold,

  // Selection & focus
  "editor.selectionBackground": colors.ui.selectionBackground,
  "editor.inactiveSelectionBackground": colors.ui.selectionInactive + "80",
  "editor.selectionHighlightBackground": colors.ui.selectionHighlight + "60",
  "editor.wordHighlightBackground": colors.ui.wordHighlight + "80",
  "editor.wordHighlightStrongBackground": colors.ui.wordHighlightStrong + "80",
  "editor.findMatchBackground": colors.ui.findMatch,
  "editor.findMatchHighlightBackground": colors.ui.findMatchHighlight + "60",

  // Panels & lifecycle UI (Mercury OS: Minimal borders, unified backgrounds)
  "sideBar.background": colors.base.background, // Unified with editor (no depth)
  "sideBar.foreground": colors.base.foregroundMuted,
  "sideBar.border": "#00000000", // Invisible border (Mercury OS: no dividers)
  "activityBar.background": colors.base.background, // Flat with editor
  "activityBar.foreground": colors.green.keywordBold,
  "activityBar.inactiveForeground": colors.gray.commentMuted,
  "activityBar.border": "#00000000", // No border
  "statusBar.background": colors.base.background, // Unified (minimal chrome)
  "statusBar.foreground": colors.base.foregroundMuted,
  "statusBar.border": "#00000000", // No top border
  "panel.background": colors.base.background, // Flat (content focus)
  "panel.border": "#00000000", // Borderless

  // Lists / trees (Mercury OS: Subtle selection, minimal chrome)
  "list.activeSelectionBackground": colors.ui.selectionBackground,
  "list.activeSelectionForeground": colors.base.foreground,
  "list.hoverBackground": colors.ui.hoverBackground,
  "list.focusOutline": "#00000000", // No outline (reduce visual noise)
  "list.focusAndSelectionOutline": "#00000000", // No outline
  "tree.indentGuidesStroke": colors.base.backgroundLighter, // Subtle guides

  // Focus & borders (Mercury OS: Minimal, content-first)
  "focusBorder": colors.green.keywordBold + "40", // 25% opacity (subtle)
  "contrastBorder": "#00000000", // No contrast borders

  // Links & text
  "textLink.foreground": colors.teal.typeSageBold,
  "textLink.activeForeground": colors.green.keywordBold,
  "textPreformat.foreground": colors.green.leafLight,

  // Buttons & interactive
  "button.background": "#0E643E",
  "button.foreground": colors.base.foreground,
  "button.hoverBackground": "#107C10",
  "button.secondaryBackground": colors.ui.border,
  "button.secondaryForeground": colors.base.foreground,
  "button.secondaryHoverBackground": colors.ui.hoverBackground,

  // Input & dropdowns (Mercury OS: Subtle borders, clean surfaces)
  "input.background": colors.base.background,
  "input.border": colors.base.backgroundLighter, // Subtle border
  "input.foreground": colors.base.foreground,
  "input.placeholderForeground": colors.gray.commentMuted,
  "inputOption.activeBorder": colors.green.keywordBold + "60", // 38% opacity
  "inputOption.activeBackground": colors.ui.selectionBackground,
  "inputValidation.errorBackground": colors.red.errorBackground,
  "inputValidation.errorBorder": colors.red.errorClay + "40", // Subtle error
  "inputValidation.warningBackground": "#2A2414",
  "inputValidation.warningBorder": colors.ochre.warmBold + "40", // Subtle warning
  "inputValidation.infoBackground": "#16221C",
  "inputValidation.infoBorder": colors.diagnostic.info + "40", // Subtle info

  // Dropdowns (Mercury OS: Flat, borderless)
  "dropdown.background": colors.base.background,
  "dropdown.border": colors.base.backgroundLighter, // Subtle
  "dropdown.foreground": colors.base.foreground,

  // Scrollbar (Mercury OS: Invisible until needed, minimal)
  "scrollbar.shadow": "#00000000", // No shadow
  "scrollbarSlider.background": colors.gray.commentMuted + "20", // 12% opacity (very subtle)
  "scrollbarSlider.hoverBackground": colors.gray.commentMuted + "40", // 25% on hover
  "scrollbarSlider.activeBackground": colors.green.keywordBold + "60", // 38% when active

  // Breadcrumbs (Mercury OS: Integrated, no chrome)
  "breadcrumb.foreground": colors.teal.operatorSage,
  "breadcrumb.background": colors.base.background, // Unified
  "breadcrumb.focusForeground": colors.green.keywordBold,
  "breadcrumbPicker.background": colors.base.background,

  // Badges
  "badge.background": colors.ui.selectionBackground,
  "badge.foreground": colors.green.keywordBold,

  // Bracket pair colors - "Framing" aesthetic: natural materials (autumn leaves, sunlight, sand)
  // Like frames in a picture: autumn warmth, golden sunlight, coastal sand
  "editorBracketHighlight.foreground1": colors.ochre.warningAmber,      // Golden sunlight - warm, bright
  "editorBracketHighlight.foreground2": colors.ochre.autumnRust,        // Autumn leaves - reddish warmth
  "editorBracketHighlight.foreground3": colors.ochre.warmBold,          // Sand - earthy ochre
  "editorBracketHighlight.foreground4": colors.red.rust,                // Rust/copper - natural oxidation
  "editorBracketHighlight.foreground5": colors.brown.htmlEarthy,        // Deep earth - soil richness
  "editorBracketHighlight.foreground6": colors.green.keywordBold,       // Fresh foliage - accent
  "editorBracketHighlight.unexpectedBracket.foreground": colors.red.errorLight,

  // Notifications (Mercury OS: Clean, borderless)
  "notificationCenter.border": "#00000000", // No border
  "notificationCenterHeader.background": colors.base.background,
  "notificationCenterHeader.foreground": colors.base.foreground,
  "notifications.background": colors.base.backgroundLighter,
  "notifications.foreground": colors.base.foreground,
  "notifications.border": "#00000000", // No border

  // Autocomplete/suggestions (Mercury OS: Minimal chrome, content focus)
  "editorSuggestWidget.background": colors.base.background,
  "editorSuggestWidget.border": colors.base.backgroundLighter, // Subtle border
  "editorSuggestWidget.foreground": colors.base.foreground,
  "editorSuggestWidget.selectedBackground": colors.ui.selectionBackground,
  "editorSuggestWidget.highlightForeground": colors.green.keywordBold,

  // Peek view (Mercury OS: Integrated, no harsh borders)
  "peekView.border": colors.base.backgroundLighter, // Subtle
  "peekViewEditor.background": colors.base.background,
  "peekViewEditor.matchHighlightBackground": colors.ui.selectionHighlight,
  "peekViewResult.background": colors.base.background,
  "peekViewResult.matchHighlightBackground": colors.ui.selectionHighlight,
  "peekViewResult.selectionBackground": colors.ui.selectionBackground,
  "peekViewTitle.background": colors.base.background, // Flat

  // Tabs (Mercury OS: Minimal separation, focus on active)
  "tab.activeBackground": colors.base.background,
  "tab.activeForeground": colors.base.foreground,
  "tab.activeBorder": "#00000000", // No border
  "tab.activeBorderTop": colors.green.keywordBold, // Top accent (subtle)
  "tab.inactiveBackground": colors.base.background, // Flat (same as active)
  "tab.inactiveForeground": colors.gray.commentMuted, // Differentiate by color only
  "tab.hoverBackground": colors.ui.hoverBackground,
  "tab.unfocusedActiveBackground": colors.base.background,
  "tab.unfocusedActiveBorder": "#00000000", // No border
  "tab.border": "#00000000", // No separator between tabs
  "editorGroupHeader.tabsBackground": colors.base.background, // Flat
  "editorGroupHeader.tabsBorder": "#00000000", // No border
  "editorGroupHeader.border": "#00000000", // No border
  "editorGroup.border": "#00000000", // No borders between editor groups
  "editorGroup.dropBackground": colors.ui.selectionBackground + "40",
  "editorGroupHeader.noTabsBackground": colors.base.background,

  // Editor widget (Mercury OS: Borderless, clean)
  "editorWidget.background": colors.base.background,
  "editorWidget.border": colors.base.backgroundLighter, // Subtle when needed
  "editorWidget.foreground": colors.base.foreground,
  "editorWidget.resizeBorder": "#00000000", // No resize border

  // Editor gutter
  "editorGutter.background": colors.base.background, // Unified
  "editorGutter.addedBackground": colors.green.functionMoss + "60",
  "editorGutter.modifiedBackground": colors.ochre.warmBold + "60",
  "editorGutter.deletedBackground": colors.red.errorClay + "60",
  "editorGutter.commentRangeForeground": colors.gray.commentMuted,

  // Diff editor (Mercury OS: Clear but minimal)
  "diffEditor.insertedTextBackground": colors.green.functionMoss + "20",
  "diffEditor.removedTextBackground": colors.red.errorClay + "20",
  "diffEditor.insertedLineBackground": colors.green.functionMoss + "10",
  "diffEditor.removedLineBackground": colors.red.errorClay + "10",
  "diffEditor.diagonalFill": colors.base.backgroundDarker + "60",
  "diffEditor.border": "#00000000", // No border

  // Merge conflicts
  "merge.currentHeaderBackground": colors.teal.typeSageBold + "40",
  "merge.currentContentBackground": colors.teal.typeSageBold + "20",
  "merge.incomingHeaderBackground": colors.green.functionMoss + "40",
  "merge.incomingContentBackground": colors.green.functionMoss + "20",
  "merge.border": "#00000000", // No border
  "merge.commonContentBackground": colors.base.backgroundLighter,
  "merge.commonHeaderBackground": colors.base.backgroundLighter,

  // Title bar (Mercury OS: Flat, integrated)
  "titleBar.activeBackground": colors.base.background,
  "titleBar.activeForeground": colors.base.foreground,
  "titleBar.inactiveBackground": colors.base.background,
  "titleBar.inactiveForeground": colors.gray.commentMuted,
  "titleBar.border": "#00000000", // No border

  // Menu bar
  "menubar.selectionBackground": colors.ui.selectionBackground,
  "menubar.selectionForeground": colors.base.foreground,
  "menu.background": colors.base.background,
  "menu.foreground": colors.base.foreground,
  "menu.selectionBackground": colors.ui.selectionBackground,
  "menu.selectionForeground": colors.base.foreground,
  "menu.separatorBackground": colors.base.backgroundLighter,
  "menu.border": colors.base.backgroundLighter,

  // Toolbar
  "toolbar.hoverBackground": colors.ui.hoverBackground,
  "toolbar.activeBackground": colors.ui.selectionBackground,

  // Quick picker
  "quickInput.background": colors.base.background,
  "quickInput.foreground": colors.base.foreground,
  "quickInputList.focusBackground": colors.ui.selectionBackground,
  "quickInputList.focusForeground": colors.base.foreground,
  "quickInputTitle.background": colors.base.background,

  // Welcome page
  "welcomePage.background": colors.base.background,
  "welcomePage.tileBackground": colors.base.backgroundLighter,
  "welcomePage.tileHoverBackground": colors.ui.hoverBackground,
  "walkThrough.embeddedEditorBackground": colors.base.backgroundDarker,

  // Settings editor
  "settings.headerForeground": colors.base.foreground,
  "settings.modifiedItemIndicator": colors.ochre.warmBold,
  "settings.dropdownBackground": colors.base.background,
  "settings.dropdownForeground": colors.base.foreground,
  "settings.dropdownBorder": colors.base.backgroundLighter,
  "settings.checkboxBackground": colors.base.background,
  "settings.checkboxForeground": colors.green.keywordBold,
  "settings.checkboxBorder": colors.base.backgroundLighter,
  "settings.textInputBackground": colors.base.background,
  "settings.textInputForeground": colors.base.foreground,
  "settings.textInputBorder": colors.base.backgroundLighter,
  "settings.numberInputBackground": colors.base.background,
  "settings.numberInputForeground": colors.base.foreground,
  "settings.numberInputBorder": colors.base.backgroundLighter,

  // Terminal (integrated into build.ts palette system)

  // Debug toolbar
  "debugToolBar.background": colors.base.backgroundLighter,
  "debugToolBar.border": "#00000000", // No border

  // Editor ruler & guides
  "editorRuler.foreground": colors.base.backgroundLighter,
  "editorIndentGuide.background": colors.base.backgroundLighter + "40",
  "editorIndentGuide.activeBackground": colors.gray.commentMuted + "60",

  // Editor code lens
  "editorCodeLens.foreground": colors.gray.commentMuted,

  // Symbol icons (semantic highlighting in UI)
  "symbolIcon.arrayForeground": colors.ochre.constantMuted,
  "symbolIcon.booleanForeground": colors.ochre.warmBold,
  "symbolIcon.classForeground": colors.teal.typeSageBold,
  "symbolIcon.colorForeground": colors.ochre.warningAmber,
  "symbolIcon.constantForeground": colors.ochre.constantMuted,
  "symbolIcon.constructorForeground": colors.green.functionMoss,
  "symbolIcon.enumeratorForeground": colors.teal.typeSageBold,
  "symbolIcon.enumeratorMemberForeground": colors.ochre.constantMuted,
  "symbolIcon.eventForeground": colors.red.rust,
  "symbolIcon.fieldForeground": colors.base.foreground,
  "symbolIcon.fileForeground": colors.gray.tan,
  "symbolIcon.folderForeground": colors.teal.operatorSage,
  "symbolIcon.functionForeground": colors.green.functionMoss,
  "symbolIcon.interfaceForeground": colors.teal.typeSageBold,
  "symbolIcon.keyForeground": colors.green.keywordBold,
  "symbolIcon.keywordForeground": colors.green.keywordBold,
  "symbolIcon.methodForeground": colors.green.functionMoss,
  "symbolIcon.moduleForeground": colors.teal.namespace,
  "symbolIcon.namespaceForeground": colors.teal.namespace,
  "symbolIcon.nullForeground": colors.gray.commentMuted,
  "symbolIcon.numberForeground": colors.ochre.warmBold,
  "symbolIcon.objectForeground": colors.teal.structureCalm,
  "symbolIcon.operatorForeground": colors.teal.operatorSage,
  "symbolIcon.packageForeground": colors.teal.namespace,
  "symbolIcon.propertyForeground": colors.base.foreground,
  "symbolIcon.referenceForeground": colors.teal.operatorSage,
  "symbolIcon.snippetForeground": colors.ochre.warningAmber,
  "symbolIcon.stringForeground": colors.ochre.warningAmber,
  "symbolIcon.structForeground": colors.teal.structureCalm,
  "symbolIcon.textForeground": colors.base.foreground,
  "symbolIcon.typeParameterForeground": colors.teal.typeSageBold,
  "symbolIcon.unitForeground": colors.ochre.constantMuted,
  "symbolIcon.variableForeground": colors.base.foreground,

  // Charts (for extension views)
  "charts.foreground": colors.base.foreground,
  "charts.lines": colors.gray.commentMuted,
  "charts.red": colors.red.errorClay,
  "charts.blue": colors.teal.typeSageBold,
  "charts.yellow": colors.ochre.warningAmber,
  "charts.orange": colors.ochre.autumnRust,
  "charts.green": colors.green.functionMoss,
  "charts.purple": colors.red.rust,

  // Extension badges
  "extensionBadge.remoteBackground": colors.green.keywordBold,
  "extensionBadge.remoteForeground": colors.base.background,
  "extensionButton.prominentBackground": colors.green.keywordBold,
  "extensionButton.prominentForeground": colors.base.background,
  "extensionButton.prominentHoverBackground": colors.green.functionMoss,

  // SCM (Source Control) - Mercury OS: Minimal decorations, clear states
  "scm.providerBorder": "#00000000", // No border between providers
  "editorGutter.foldingControlForeground": colors.gray.commentMuted,

  // Minimap (Mercury OS: Subtle, fade into background)
  "minimap.background": colors.base.background, // Unified
  "minimap.selectionHighlight": colors.ui.selectionBackground + "80",
  "minimap.selectionOccurrenceHighlight": colors.ui.wordHighlight + "80",
  "minimap.errorHighlight": colors.red.errorBackground,
  "minimap.warningHighlight": "#2A2414",
  "minimap.infoHighlight": "#1A2825",
};

export type UIColors = typeof uiColors;
