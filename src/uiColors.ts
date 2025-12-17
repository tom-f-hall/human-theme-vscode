/**
 * UI/Workbench Colors - Mercury OS-inspired Minimalism
 * Generated from palette - not hardcoded
 * 
 * Design Principles:
 * 1. Reduced Visual Noise: Minimal borders, subtle separations
 * 2. Content First: UI chrome fades into background, content stands out
 * 3. Flat Hierarchy: Less depth, more consistency
 * 4. Subtle Feedback: Interactions through opacity/tint, not harsh lines
 */

import { Colors } from "./colors";

export function buildUiColors(palette: Colors) {
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
    "editor.hoverHighlightBackground": palette.ui.hoverBackground,

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
    "titleBar.activeBackground": palette.base.background,
    "titleBar.activeForeground": palette.base.foreground,
    "titleBar.inactiveBackground": palette.base.background,
    "titleBar.inactiveForeground": palette.gray.commentMuted,
    "titleBar.border": "#00000000",

    // Lists / trees
    "list.activeSelectionBackground": palette.ui.selectionBackground,
    "list.activeSelectionForeground": palette.base.foreground,
    "list.hoverBackground": palette.ui.hoverBackground,
    "list.inactiveSelectionBackground": palette.ui.selectionInactive,
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

    // Buttons & interactive
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
    "inputValidation.infoBackground": palette.base.backgroundLighter,
    "inputValidation.infoBorder": palette.teal.typeSageBold + "40",

    // Dropdowns
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

    // Bracket pairs - "Framing" aesthetic
    "editorBracketHighlight.foreground1": palette.ochre.warningAmber,
    "editorBracketHighlight.foreground2": palette.ochre.autumnRust,
    "editorBracketHighlight.foreground3": palette.ochre.warmBold,
    "editorBracketHighlight.foreground4": palette.red.rust,
    "editorBracketHighlight.foreground5": palette.brown.htmlEarthy,
    "editorBracketHighlight.foreground6": palette.green.keywordBold,
    "editorBracketHighlight.unexpectedBracket.foreground": palette.red.errorLight,

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

    // Merge
    "merge.currentHeaderBackground": palette.teal.typeSageBold + "40",
    "merge.currentContentBackground": palette.teal.typeSageBold + "20",
    "merge.incomingHeaderBackground": palette.green.functionMoss + "40",
    "merge.incomingContentBackground": palette.green.functionMoss + "20",
    "merge.border": "#00000000",
    "merge.commonContentBackground": palette.base.backgroundLighter,
    "merge.commonHeaderBackground": palette.base.backgroundLighter,

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

    // SCM
    "scm.providerBorder": "#00000000",

    // Minimap
    "minimap.background": palette.base.background,
    "minimap.selectionHighlight": palette.ui.selectionBackground + "80",
    "minimap.selectionOccurrenceHighlight": palette.ui.wordHighlight + "80",
    "minimap.errorHighlight": palette.red.errorBackground,
    "minimap.warningHighlight": palette.base.backgroundDarker,
    "minimap.infoHighlight": palette.base.backgroundLighter,
  };
}

export type UIColors = ReturnType<typeof buildUiColors>;
  // Core editor
