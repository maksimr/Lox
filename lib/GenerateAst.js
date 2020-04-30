class GenerateAst {
  constructor() {
    this.defineAst("../src", "Expr", [
      "Binary   : Expr left, Token operator, Expr right",
      "Grouping : Expr expression",
      "Literal  : Object value",
      "Unary    : Token operator, Expr right"
    ]);
  }

  defineAst(outputDir, baseName, types) {
    const path = require('path').resolve(__dirname, outputDir + "/" + baseName + ".js");
    const writer = new PrintWriter(path);
    writer.println(`export class ${baseName} {`);
    writer.println("  accept(visitor) { }");
    writer.println("}");
    for (const type of types) {
      const className = type.split(":")[0].trim();
      const fields = type.split(":")[1].trim();
      this.defineType(writer, baseName, className, fields);
    }
    this.defineVisitor(writer, baseName, types);
    writer.close();
  }

  defineVisitor(writer, baseName, types) {
    writer.println("export class Visitor {");
    for (const type of types) {
      const typeName = type.split(":")[0].trim();
      writer.println(
        "  visit" + typeName + baseName + "(" + baseName.toLowerCase() + ") { }"
      );
    }
    writer.println("}");
  }

  defineType(writer, baseName, className, fieldList) {
    writer.println("export class " + className + " extends " + baseName + " {");
    const params = fieldList
      .split(", ")
      .map(it => it.split(" ")[1])
      .join(", ");
    writer.println("  constructor(" + params + ") {");
    writer.println("    super();");
    const fields = fieldList.split(", ");
    // Store parameters in fields.
    for (const field of fields) {
      const name = field.split(" ")[1];
      writer.println("    this." + name + " = " + name + ";");
    }
    writer.println("  }");
    writer.println("  accept(visitor) {");
    writer.println(
      "    return visitor.visit" + className + baseName + "(this);"
    );
    writer.println("  }");
    writer.println("}");
  }
}

class PrintWriter {
  constructor(path) {
    this.file = require('fs').createWriteStream(path);
  }

  println(str) {
    this.file.write(str);
    this.file.write('\n');
  }

  close() {
    this.file.end();
  }
}

new GenerateAst();