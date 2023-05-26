export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts?$": ["ts-jest", { babelConfig: true }],
    "^.+\\.js?$": "babel-jest"
  },
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
