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

  // ============================================================================
  // MARKDOWN - Rich hierarchical styling
  // ============================================================================
  
  // Headings - progressively lighter greens (h1 brightest, h6 most muted)
  {
    scope: ["markup.heading.markdown", "markup.heading.setext"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "markup.heading.1.markdown",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "markup.heading.2.markdown",
    settings: {
      foreground: colors.green.functionMoss,
      fontStyle: "bold",
    },
  },
  {
    scope: ["markup.heading.3.markdown", "markup.heading.4.markdown"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: ["markup.heading.5.markdown", "markup.heading.6.markdown"],
    settings: {
      foreground: colors.teal.operatorSage,
      fontStyle: "bold",
    },
  },
  {
    scope: "punctuation.definition.heading.markdown",
    settings: {
      foreground: colors.gray.commentMuted,
    },
  },

  // Text formatting
  {
    scope: "markup.bold.markdown",
    settings: {
      foreground: colors.ochre.warmBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "markup.italic.markdown",
    settings: {
      foreground: colors.ochre.warningAmber,
      fontStyle: "italic",
    },
  },
  {
    scope: "markup.bold.italic.markdown",
    settings: {
      foreground: colors.ochre.warmBold,
      fontStyle: "bold italic",
    },
  },
  {
    scope: "markup.strikethrough.markdown",
    settings: {
      foreground: colors.gray.commentMuted,
      fontStyle: "strikethrough",
    },
  },

  // Links
  {
    scope: ["markup.underline.link.markdown", "markup.underline.link.image.markdown"],
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },
  {
    scope: ["string.other.link.title.markdown", "string.other.link.description.markdown"],
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "markup.inline.raw.string.markdown",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },

  // Code blocks
  {
    scope: ["markup.fenced_code.block.markdown", "markup.inline.raw.markdown"],
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },
  {
    scope: "punctuation.definition.markdown",
    settings: {
      foreground: colors.gray.commentMuted,
    },
  },
  {
    scope: "fenced_code.block.language",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },

  // Lists
  {
    scope: ["markup.list.unnumbered.markdown", "markup.list.numbered.markdown"],
    settings: {
      foreground: colors.base.foreground,
    },
  },
  {
    scope: "punctuation.definition.list.begin.markdown",
    settings: {
      foreground: colors.brown.htmlEarthy,
      fontStyle: "bold",
    },
  },

  // Quotes
  {
    scope: "markup.quote.markdown",
    settings: {
      foreground: colors.gray.tan,
      fontStyle: "italic",
    },
  },
  {
    scope: "punctuation.definition.quote.begin.markdown",
    settings: {
      foreground: colors.brown.attributeMuted,
    },
  },

  // Frontmatter
  {
    scope: ["meta.embedded.block.frontmatter", "punctuation.definition.tag.frontmatter"],
    settings: {
      foreground: colors.gray.commentMuted,
    },
  },

  // ============================================================================
  // CSS / SCSS / LESS - Stylesheet languages
  // ============================================================================
  
  // Selectors
  {
    scope: ["entity.name.tag.css", "entity.name.tag.scss", "entity.name.tag.less"],
    settings: {
      foreground: colors.brown.htmlEarthy,
      fontStyle: "bold",
    },
  },
  {
    scope: ["entity.other.attribute-name.class.css", "entity.other.attribute-name.class.scss"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: ["entity.other.attribute-name.id.css", "entity.other.attribute-name.id.scss"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: ["entity.other.attribute-name.pseudo-class.css", "entity.other.attribute-name.pseudo-element.css"],
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // Properties
  {
    scope: ["support.type.property-name.css", "support.type.property-name.scss", "meta.property-name.css"],
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },

  // Values
  {
    scope: ["support.constant.property-value.css", "meta.property-value.css"],
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },
  {
    scope: ["constant.numeric.css", "keyword.other.unit.css"],
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },
  {
    scope: ["support.constant.color.css", "constant.other.color.css"],
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },
  {
    scope: "support.function.css",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // SCSS/LESS specific
  {
    scope: ["variable.scss", "variable.less", "variable.parameter.scss"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: ["keyword.control.at-rule.scss", "keyword.control.at-rule.css"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "support.function.misc.scss",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // ============================================================================
  // YAML - Configuration files
  // ============================================================================
  
  {
    scope: "entity.name.tag.yaml",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "string.unquoted.yaml",
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },
  {
    scope: "string.quoted.yaml",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },
  {
    scope: ["punctuation.definition.anchor.yaml", "punctuation.definition.alias.yaml"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "constant.language.yaml",
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },

  // ============================================================================
  // Shell / Bash - Command line scripts
  // ============================================================================
  
  {
    scope: ["support.function.builtin.shell", "support.function.external.shell"],
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "variable.other.normal.shell",
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "string.quoted.double.shell",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },
  {
    scope: "string.quoted.single.shell",
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },
  {
    scope: "keyword.operator.redirect.shell",
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },

  // ============================================================================
  // SQL - Database queries
  // ============================================================================
  
  {
    scope: ["keyword.other.sql", "keyword.other.DML.sql", "keyword.other.DDL.sql"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "storage.type.sql",
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: ["support.function.aggregate.sql", "support.function.scalar.sql"],
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "constant.other.database-name.sql",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: "constant.other.table-name.sql",
    settings: {
      foreground: colors.brown.htmlEarthy,
    },
  },

  // ============================================================================
  // Python - Additional specific scopes
  // ============================================================================
  
  {
    scope: "support.type.python",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: "support.function.builtin.python",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "constant.language.python",
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },
  {
    scope: "variable.parameter.function.language.special.self.python",
    settings: {
      foreground: colors.red.rust,
      fontStyle: "italic",
    },
  },
  {
    scope: "storage.type.function.python",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },

  // ============================================================================
  // JavaScript / TypeScript - Additional specific scopes
  // ============================================================================
  
  {
    scope: ["support.type.object.module.js", "support.type.object.module.ts"],
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: ["support.variable.property.js", "support.variable.property.ts"],
    settings: {
      foreground: colors.gray.tan,
    },
  },
  {
    scope: ["variable.other.constant.js", "variable.other.constant.ts"],
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },
  {
    scope: "storage.type.type.ts",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "entity.name.type.module.ts",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: ["keyword.control.as.ts", "keyword.control.from.ts"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },

  // React/JSX specific
  {
    scope: ["entity.other.attribute-name.js.jsx", "entity.other.attribute-name.tsx"],
    settings: {
      foreground: colors.brown.attributeMuted,
    },
  },
  {
    scope: ["support.class.component.js", "support.class.component.tsx"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },

  // ============================================================================
  // JSON - Data files
  // ============================================================================
  
  {
    scope: "support.type.property-name.json",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "string.quoted.double.json",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },
  {
    scope: "constant.language.json",
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },

  // ============================================================================
  // Regular Expressions - Pattern matching
  // ============================================================================
  
  {
    scope: ["string.regexp", "constant.other.character-class.regexp"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "keyword.operator.quantifier.regexp",
    settings: {
      foreground: colors.ochre.warmBold,
    },
  },
  {
    scope: ["keyword.control.anchor.regexp", "punctuation.definition.group.regexp"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "constant.character.escape.regexp",
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },

  // ============================================================================
  // Git - Commit messages and diffs
  // ============================================================================
  
  {
    scope: "meta.diff.header",
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },
  {
    scope: "markup.inserted",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: "markup.deleted",
    settings: {
      foreground: colors.red.errorClay,
    },
  },
  {
    scope: "markup.changed",
    settings: {
      foreground: colors.ochre.warningAmber,
    },
  },
  {
    scope: "meta.diff.range",
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },

  // ============================================================================
  // Docker - Dockerfile syntax
  // ============================================================================
  
  {
    scope: ["keyword.other.special-method.dockerfile", "keyword.operator.flag.dockerfile"],
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "entity.name.function.package.dockerfile",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },

  // ============================================================================
  // INI / TOML / Properties - Config files
  // ============================================================================
  
  {
    scope: ["keyword.other.definition.ini", "entity.name.section.group-title.ini"],
    settings: {
      foreground: colors.green.functionMoss,
      fontStyle: "bold",
    },
  },
  {
    scope: "keyword.key.toml",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },
  {
    scope: ["entity.name.tag.toml", "support.type.property-name.table.toml"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },

  // ============================================================================
  // XML / SVG - Markup languages
  // ============================================================================
  
  {
    scope: "entity.name.tag.xml",
    settings: {
      foreground: colors.brown.htmlEarthy,
      fontStyle: "bold",
    },
  },
  {
    scope: "entity.other.attribute-name.xml",
    settings: {
      foreground: colors.brown.attributeMuted,
    },
  },
  {
    scope: "meta.tag.preprocessor.xml",
    settings: {
      foreground: colors.gray.commentMuted,
    },
  },

  // ============================================================================
  // Go - Additional specific scopes
  // ============================================================================
  
  {
    scope: "entity.name.package.go",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: "entity.name.type.go",
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "support.function.builtin.go",
    settings: {
      foreground: colors.green.functionMoss,
    },
  },

  // ============================================================================
  // Rust - Additional specific scopes
  // ============================================================================
  
  {
    scope: ["storage.type.rust", "entity.name.type.rust"],
    settings: {
      foreground: colors.teal.typeSageBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "entity.name.function.macro.rust",
    settings: {
      foreground: colors.red.rust,
      fontStyle: "bold",
    },
  },
  {
    scope: "storage.modifier.lifetime.rust",
    settings: {
      foreground: colors.ochre.constantMuted,
    },
  },

  // ============================================================================
  // Java - Additional specific scopes
  // ============================================================================
  
  {
    scope: ["storage.modifier.java", "storage.type.annotation.java"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "storage.type.object.array.java",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },

  // ============================================================================
  // C / C++ - Additional specific scopes
  // ============================================================================
  
  {
    scope: ["storage.modifier.pointer.c", "storage.modifier.reference.cpp"],
    settings: {
      foreground: colors.teal.operatorSage,
    },
  },
  {
    scope: ["entity.name.function.preprocessor.c", "entity.name.function.preprocessor.cpp"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "storage.type.built-in.primitive.cpp",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },

  // ============================================================================
  // PHP - Additional specific scopes
  // ============================================================================
  
  {
    scope: "support.class.builtin.php",
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: "support.function.construct.php",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
  {
    scope: "variable.other.php",
    settings: {
      foreground: colors.red.rust,
    },
  },

  // ============================================================================
  // Ruby - Additional specific scopes
  // ============================================================================
  
  {
    scope: ["variable.other.constant.ruby", "support.class.ruby"],
    settings: {
      foreground: colors.teal.typeSageBold,
    },
  },
  {
    scope: ["punctuation.definition.variable.ruby", "variable.other.readwrite.instance.ruby"],
    settings: {
      foreground: colors.red.rust,
    },
  },
  {
    scope: "keyword.control.pseudo-method.ruby",
    settings: {
      foreground: colors.green.keywordBold,
      fontStyle: "bold",
    },
  },
];

export type TextMateRules = typeof textMateRules;
