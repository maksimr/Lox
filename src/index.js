import { Scanner } from "./Scanner";

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
