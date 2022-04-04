import * as parser from "@babel/parser";
import * as Path from "path";
import { File } from "@babel/types";
import traverse from "@babel/traverse";
import { Context } from "./type";

// BlockStatement | BreakStatement | ContinueStatement | DebuggerStatement | DoWhileStatement |
// EmptyStatement | ExpressionStatement | ForInStatement | ForStatement | FunctionDeclaration |
// IfStatement | LabeledStatement | ReturnStatement | SwitchStatement | ThrowStatement | TryStatement |
// VariableDeclaration | WhileStatement | WithStatement | ClassDeclaration | ExportAllDeclaration |
// ExportDefaultDeclaration | ExportNamedDeclaration | ForOfStatement | ImportDeclaration | DeclareClass |
// DeclareFunction | DeclareInterface | DeclareModule | DeclareModuleExports | DeclareTypeAlias | DeclareOpaqueType |
// DeclareVariable | DeclareExportDeclaration | DeclareExportAllDeclaration | InterfaceDeclaration | OpaqueType |
// TypeAlias | EnumDeclaration | TSDeclareFunction | TSInterfaceDeclaration | TSTypeAliasDeclaration |
// TSEnumDeclaration | TSModuleDeclaration | TSImportEqualsDeclaration | TSExportAssignment | TSNamespaceExportDeclaration;

export const parse = (source: string, dirname: string) => {
  const ast: File | undefined = parser.parse(source);
  if (!ast || typeof ast != "object")
    throw new Error("Source couldn't be parsed");
  // 定义每一个文件的上下文环境
  const context: Context = {};
  // 遍历每一个文件
  traverse(ast, {
    enter(path) {
      // 通过遍历AST 解析依赖的 模块
      if (
        path.node.type === "CallExpression" &&
        path.node.callee.type === "Identifier" && // 标识符
        path.node.callee.name === "require" // 名称为 require
      ) {
        const params = path.node.arguments[0];
        context.requires = context.requires || [];
        // 将依赖的模块放入 context 的 requires中去
        context.requires.push({
          name: parseString(params),
          nameRange: path.node.arguments[0].range,
          line: path.node.loc.start.line,
          column: path.node.loc.start.column,
          fullName: Path.join(dirname, parseString(params)),
        });
      }
    },
  });
  return context;
};

function parseString(expression: any): string {
  switch (expression.type) {
    case "BinaryExpression":
      return parseString(expression.left) + parseString(expression.right);
    case "StringLiteral":
      if (typeof expression.value === "string") return expression.value;
  }
  throw new Error(
    expression.type + " is not supported as parameter for require"
  );
}
