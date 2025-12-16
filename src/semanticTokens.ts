/**
 * Semantic Token Colors - Code highlighting rules
 * Maps semantic scopes to colors with intelligent hierarchy
 */

import { colors } from "./colors";

export const semanticTokens = {
  // Keywords & control flow - vegetation (life, growth)
  keyword: {
    foreground: colors.green.keywordBold,
    fontStyle: "bold",
  },
  "keyword.control": {
    foreground: colors.green.keywordBold,
    fontStyle: "bold",
  },
  "keyword.operator": colors.teal.operatorSage,
  "keyword.type": colors.green.keywordBold,

  // Types & classes - sage teal + bold
  type: {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  "type.defaultLibrary": {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  class: {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  "class.defaultLibrary": {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  interface: {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  "interface.defaultLibrary": {
    foreground: colors.teal.typeSageBold,
    fontStyle: "bold",
  },
  enum: colors.teal.typeSageBold,
  "enum.defaultLibrary": colors.teal.typeSageBold,
  typeAlias: colors.teal.typeSageBold,
  struct: colors.teal.typeSageBold,

  // Functions - moss green
  function: colors.green.functionMoss,
  "function.defaultLibrary": colors.green.functionMoss,
  method: colors.green.functionMoss,
  "method.defaultLibrary": colors.green.functionMoss,
  "method.readonly": colors.green.functionMoss,

  // Properties & parameters - calm tan
  property: colors.gray.tan,
  "property.readonly": colors.gray.tan,
  "property.static": colors.ochre.warmBold,
  parameter: colors.gray.tan,
  "parameter.readonly": colors.gray.tan,

  // Variables - muted
  variable: colors.base.foreground,
  "variable.readonly": colors.base.foreground,
  "variable.defaultLibrary": colors.base.foreground,

  // Constants, strings - earth/warmth (resources, treasure)
  number: colors.ochre.warmBold,
  string: colors.ochre.warningAmber,  // Sunlight amber - warm, visible
  boolean: colors.ochre.constantMuted,
  constant: colors.ochre.warmBold,
  macro: colors.red.rust,

  // Comments - italic, desaturated
  comment: {
    foreground: colors.gray.commentMuted,
    fontStyle: "italic",
  },

  // Namespace & module - use bright function moss for visibility
  namespace: colors.green.functionMoss,
  "namespace.defaultLibrary": colors.green.functionMoss,
  module: colors.green.functionMoss,
} as const;

export type SemanticTokens = typeof semanticTokens;
