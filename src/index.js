import * as Expr from "./Expr";

function main() {
  const TokenType = {
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

  const keywords = new Map();
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

  class Token {
    constructor(type, lexeme, literal, line) {
      this.type = type;
      this.lexeme = lexeme;
      this.literal = literal;
      this.line = line;
    }
  }

  class Scanner {
    /**
     * @param {String} source
     */
    constructor(source) {
      this.source = source;
      this.tokens = [];
      this.start = this.current = 0;
      this.line = 1;
    }

    scanTokens() {
      while (!this.isAtEnd()) {
        this.start = this.current;
        this.scanToken();
      }
      this.tokens.push(new Token(TokenType.EOF, "", null, this.line));
      return this.tokens;
    }

    isAtEnd() {
      return this.current >= this.source.length;
    }

    scanToken() {
      const c = this.advance();
      switch (c) {
        case "(":
          this.addToken(TokenType.LEFT_PAREN);
          break;
        case ")":
          this.addToken(TokenType.RIGHT_PAREN);
          break;
        case "{":
          this.addToken(TokenType.LEFT_BRACE);
          break;
        case "}":
          this.addToken(TokenType.RIGHT_BRACE);
          break;
        case ",":
          this.addToken(TokenType.COMMA);
          break;
        case ".":
          this.addToken(TokenType.DOT);
          break;
        case "-":
          this.addToken(TokenType.MINUS);
          break;
        case "+":
          this.addToken(TokenType.PLUS);
          break;
        case ";":
          this.addToken(TokenType.SEMICOLON);
          break;
        case "*":
          this.addToken(TokenType.STAR);
          break;
        case "=":
          this.addToken(
            this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL
          );
          break;
        case "<":
          this.addToken(
            this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS
          );
          break;
        case ">":
          this.addToken(
            this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER
          );
          break;
        case "/":
          if (this.match("/")) {
            // A comment goes until the end of the line.
            while (this.peek() !== "\n" && !this.isAtEnd()) this.advance();
          } else {
            this.addToken(TokenType.SLASH);
          }
          break;
        case " ":
        case "\r":
        case "\t":
          // Ignore whitespace.
          break;
        case "\n":
          this.line++;
          break;
        case '"':
          this.string();
          break;
        default:
          if (this.isDigit(c)) {
            this.number();
          } else if (this.isAlpha(c)) {
            this.identifier();
          } else {
            Lox.error(this.line, "Unexpected character.");
          }
          break;
      }
    }

    advance() {
      this.current += 1;
      return this.tokens[this.current - 1];
    }

    peek() {
      if (this.isAtEnd()) return "\0";
      return this.source.charAt(this.current);
    }

    peekNext() {
      if (this.current + 1 >= this.source.length) return "\0";
      return this.source.charAt(this.current + 1);
    }

    isDigit(c) {
      return c >= "0" && c <= "9";
    }

    isAlpha(c) {
      return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
    }

    isAlphaNumeric(c) {
      return this.isAlpha(c) || this.isDigit(c);
    }

    identifier() {
      while (this.isAlphaNumeric(this.peek())) this.advance();
      const text = this.source.substring(this.start, this.current);
      let type = keywords.get(text);
      if (type == null) type = TokenType.IDENTIFIER;
      this.addToken(type);
    }

    number() {
      while (this.isDigit(this.peek())) this.advance();

      // Look for a fractional part.
      if (this.peek() === "." && this.isDigit(this.peekNext())) {
        // Consume the "."
        this.advance();

        while (this.isDigit(this.peek())) this.advance();
      }

      this.addToken(
        TokenType.NUMBER,
        parseFloat(this.source.substring(this.start, this.current))
      );
    }

    string() {
      while (this.peek() !== '"' && !this.isAtEnd()) {
        if (this.peek() === "\n") this.line++;
        this.advance();
      }

      // Unterminated string.
      if (this.isAtEnd()) {
        Lox.error(this.line, "Unterminated string.");
        return;
      }

      // The closing ".
      this.advance();

      // Trim the surrounding quotes.
      const value = this.source.substring(this.start + 1, this.current - 1);
      this.addToken(TokenType.STRING, value);
    }

    match(expected) {
      if (this.isAtEnd()) return false;
      if (this.source[this.current] !== expected) return false;

      this.current++;
      return true;
    }

    addToken(type, literal = null) {
      const text = this.source.substr(this.start, this.current);
      this.tokens.add(new Token(type, text, literal, this.line));
    }
  }

  class Lox {
    static error(line, message) {
      console.error(line, "", message);
    }

    main() {
      this.run("");
    }

    run(source) {
      const scanner = new Scanner(source);
      const tokens = scanner.scanTokens();
      console.log(tokens);
    }
  }

  new Lox().main();
}

main();
