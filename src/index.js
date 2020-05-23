import {Scanner} from "./Scanner";
import {Binary, Grouping, Literal, Unary} from "./Expr";
import {Token, TokenType} from "./Token";
import {AstPrinter} from "./AstPrinter";

class Lox {
  static error(line, message) {
    console.error(line, "", message);
  }

  main() {
    const expression = new Binary(
      new Unary(
        new Token(TokenType.MINUS, "-", null, 1),
        new Literal(123)),
      new Token(TokenType.STAR, "*", null, 1),
      new Grouping(
        new Literal(45.67)));

    console.log(new AstPrinter().print(expression));
  }

  run(source) {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();
    console.log(tokens);
  }
}

new Lox().main();
