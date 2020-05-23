import {Visitor, Expr} from "./Expr";

export class AstPrinter extends Visitor {
  print(expr) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }


  visitGroupingExpr(expr) {
    return this.parenthesize("group", expr.expression);
  }


  visitLiteralExpr(expr) {
    if (expr.value == null) return "nil";
    return expr.value.toString();
  }

  visitUnaryExpr(expr) {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  /**
   * @param {String} name
   * @param {Array<Expr>} exprs
   * @return {string}
   */
  parenthesize(name, ...exprs) {
    let builder = '';

    builder += ("(") + (name);
    for (const expr of exprs) {
      builder += (" ");
      builder += expr.accept(this);
    }
    builder += (")");

    return builder.toString();
  }
}