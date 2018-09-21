module.exports = {
 parser: 'babel-eslint',
 env: {
   browser: true,
   commonjs: true,
   es6: true,
   node: true,
   jest: true,
 },
 extends: ['eslint:recommended', 'plugin:react/recommended'],
 parserOptions: {
   ecmaFeatures: {
     experimentalObjectRestSpread: true,
     jsx: true,
   },
   sourceType: 'module',
 },
 plugins: ['react'],
 rules: {
   'eol-last': ["error", "always"],
   //ignore rules with react-navigation proptypes
   'react/prop-types': ['error', {"ignore": ["navigation"]}],
   indent: ['error', 2, { SwitchCase: 1 }],
   'linebreak-style': ['error', 'unix'],
   quotes: ['error', 'single'],
   'no-console': ['warn', { allow: ['info', 'error'] }],
   'arrow-parens': ['error', 'always'],
 },
};
