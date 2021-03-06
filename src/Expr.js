export class Expr {
  accept(visitor) { }
}
export class Binary extends Expr {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
  accept(visitor) {
    return visitor.visitBinaryExpr(this);
  }
}
export class Grouping extends Expr {
  constructor(expression) {
    super();
    this.expression = expression;
  }
  accept(visitor) {
    return visitor.visitGroupingExpr(this);
  }
}
export class Literal extends Expr {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    return visitor.visitLiteralExpr(this);
  }
}
export class Unary extends Expr {
  constructor(operator, right) {
    super();
    this.operator = operator;
    this.right = right;
  }
  accept(visitor) {
    return visitor.visitUnaryExpr(this);
  }
}
export class Visitor {
  visitBinaryExpr(expr) { }
  visitGroupingExpr(expr) { }
  visitLiteralExpr(expr) { }
  visitUnaryExpr(expr) { }
}
