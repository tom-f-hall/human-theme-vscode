/**
 * Semantic Token Colors - Code highlighting rules
 * Maps semantic scopes to colors with intelligent hierarchy
 * 
 * Generated from palette - not hardcoded
 */

import { Colors } from "./colors";

export function buildSemanticTokens(palette: Colors) {
  return {
    // Keywords & control flow - vegetation (life, growth)
    keyword: {
      foreground: palette.green.keywordBold,
      fontStyle: "bold",
    },
    "keyword.control": {
      foreground: palette.green.keywordBold,
      fontStyle: "bold",
    },
    "keyword.operator": palette.teal.operatorSage,
    "keyword.type": palette.green.keywordBold,

    // Types & classes - sage teal + bold
    type: {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    "type.defaultLibrary": {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    class: {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    "class.defaultLibrary": {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    interface: {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    "interface.defaultLibrary": {
      foreground: palette.teal.typeSageBold,
      fontStyle: "bold",
    },
    enum: palette.teal.typeSageBold,
    "enum.defaultLibrary": palette.teal.typeSageBold,
    typeAlias: palette.teal.typeSageBold,
    struct: palette.teal.typeSageBold,

    // Functions - moss green
    function: palette.green.functionMoss,
    "function.defaultLibrary": palette.green.functionMoss,
    method: palette.green.functionMoss,
    "method.defaultLibrary": palette.green.functionMoss,
    "method.readonly": palette.green.functionMoss,

    // Properties & parameters - calm tan
    property: palette.gray.tan,
    "property.readonly": palette.gray.tan,
    "property.static": palette.ochre.warmBold,
    parameter: palette.gray.tan,
    "parameter.readonly": palette.gray.tan,

    // Variables - muted
    variable: palette.base.foreground,
    "variable.readonly": palette.base.foreground,
    "variable.defaultLibrary": palette.base.foreground,

    // Constants, strings - earth/warmth (resources, treasure)
    number: palette.ochre.warmBold,
    string: palette.ochre.warningAmber,  // Sunlight amber - warm, visible
    boolean: palette.ochre.constantMuted,
    constant: palette.ochre.warmBold,
    macro: palette.red.rust,

    // Comments - italic, desaturated
    comment: {
      foreground: palette.gray.commentMuted,
      fontStyle: "italic",
    },

    // Namespace & module - use bright function moss for visibility
    namespace: palette.green.functionMoss,
    "namespace.defaultLibrary": palette.green.functionMoss,
    module: palette.green.functionMoss,
  } as const;
}

export type SemanticTokens = ReturnType<typeof buildSemanticTokens>;
