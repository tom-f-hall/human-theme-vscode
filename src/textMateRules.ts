/**
 * TextMate Token Rules - Syntax highlighting for code
 * Lower-level than semantic highlighting, catches edge cases
 */

import { colors } from "./colors";

export const textMateRules = [
  // Keywords
  {
    scope: "keyword",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: ["keyword.control", "keyword.control.catch", "keyword.control.exception"],
    settings: {
      foreground: colors.ochre.warmBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "keyword.control.return",
    settings: {
      foreground: colors.ochre.warmBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "keyword.operator.type",
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },
  {
    scope: ["keyword.operator.type.annotation", "keyword.operator.assignment.type"],
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },
  {
    scope: ["keyword.declaration", "storage.type"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold italic",
    },
  },
  {
    scope: ["keyword.import", "keyword.export"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },

  // Numbers & constants
  {
    scope: "constant.numeric",
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },
  {
    scope: ["constant.language.boolean", "constant.language"],
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },

  // Functions
  {
    scope: "entity.name.function",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // Types & interfaces
  {
    scope: ["entity.name.type", "entity.name.class", "entity.name.interface"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "support.type",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },

  // Variables
  {
    scope: ["variable.parameter", "variable.other.property"],
    settings: {
      foreground: colors.gray.tan,
    },
  },
  {
    scope: "variable",
    settings: {
      foreground: colors.base.foreground,
    },
  },

  // Decorators
  {
    scope: ["meta.decorator", "storage.modifier.decorator"],
    settings: {
      foreground: colors.red.rust,
      fontStyle: "bold",
    },
  },

  // Structural framing (tags, brackets) - autumn leaves aesthetic
  {
    scope: ["entity.name.tag.html", "entity.name.tag.jsx", "entity.name.tag.tsx"],
    settings: {
      foreground: colors.brown.htmlEarthy,
      fontStyle: "bold",
    },
  },
  {
    scope: ["entity.other.attribute-name.html", "entity.other.attribute-name.jsx", "entity.other.attribute-name.tsx"],
    settings: {
      foreground: colors.brown.attributeMuted,
    },
  },
  {
    scope: ["punctuation.definition.tag", "punctuation.definition.tag.begin", "punctuation.definition.tag.end"],
    settings: {
      foreground: colors.brown.tagPunctuation,
    },
  },

  // Operators
  {
    scope: "keyword.operator",
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },

  // Punctuation
  {
    scope: "punctuation",
    settings: {
      foreground: colors.gray.tan,
    },
  },

  // JSON properties
  {
    scope: ["meta.object-literal.key", "support.type.property-name.json"],
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // Strings - warm sunlight amber
  {
    scope: "string",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },

  // Comments
  {
    scope: "comment",
    settings: {
      foreground: colors.gray.commentMuted,
      fontStyle: "italic",
    },
  },

  // Invalid
  {
    scope: "invalid",
    settings: {
      foreground: colors.red.errorClay,
      fontStyle: "bold",
    },
  },

  // Special tokens
  {
    scope: ["meta.tag", "meta.tag.sgml"],
    settings: {
      foreground: colors.red.rust,
    },
  },
];

export type TextMateRules = typeof textMateRules;
