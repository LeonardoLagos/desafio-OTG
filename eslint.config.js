import { Linter } from "eslint";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default new Linter.Config({
  files: ["src/**/*.ts"],
  languageOptions: {
    parser: typescriptParser,
    ecmaVersion: "latest"
  },
  plugins: {
    "@typescript-eslint": typescriptPlugin
  },
  rules: {
    // Suas regras personalizadas aqui
  }
});
