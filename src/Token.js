export const TokenType = {
  // Single-character tokens.
  LEFT_PAREN: "LEFT_PAREN",
  RIGHT_PAREN: "RIGHT_PAREN",
  LEFT_BRACE: "LEFT_BRACE",
  RIGHT_BRACE: "RIGHT_BRACE",
  COMMA: "COMMA",
  DOT: "DOT",
  MINUS: "MINUS",
  PLUS: "PLUS",
  SEMICOLON: "SEMICOLON",
  SLASH: "SLASH",
  STAR: "STAR",

  // One or two character tokens.
  BANG: "BANG",
  BANG_EQUAL: "BANG_EQUAL",
  EQUAL: "EQUAL",
  EQUAL_EQUAL: "EQUAL_EQUAL",
  GREATER: "GREATER",
  GREATER_EQUAL: "GREATER_EQUAL",
  LESS: "LESS",
  LESS_EQUAL: "LESS_EQUAL",

  // Literals.
  IDENTIFIER: "IDENTIFIER",
  STRING: "STRING",
  NUMBER: "NUMBER",

  // Keywords.
  AND: "AND",
  CLASS: "CLASS",
  ELSE: "ELSE",
  FALSE: "FALSE",
  FUN: "FUN",
  FOR: "FOR",
  IF: "IF",
  NIL: "NIL",
  OR: "OR",
  PRINT: "PRINT",
  RETURN: "RETURN",
  SUPER: "SUPER",
  THIS: "THIS",
  TRUE: "TRUE",
  VAR: "VAR",
  WHILE: "WHILE",

  EOF: "EOF"
};

export const keywords = new Map();
keywords.set("and", TokenType.AND);
keywords.set("class", TokenType.CLASS);
keywords.set("else", TokenType.ELSE);
keywords.set("false", TokenType.FALSE);
keywords.set("for", TokenType.FOR);
keywords.set("fun", TokenType.FUN);
keywords.set("if", TokenType.IF);
keywords.set("nil", TokenType.NIL);
keywords.set("or", TokenType.OR);
keywords.set("print", TokenType.PRINT);
keywords.set("return", TokenType.RETURN);
keywords.set("super", TokenType.SUPER);
keywords.set("this", TokenType.THIS);
keywords.set("true", TokenType.TRUE);
keywords.set("var", TokenType.VAR);
keywords.set("while", TokenType.WHILE);

export class Token {
  constructor(type, lexeme, literal, line) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }
}