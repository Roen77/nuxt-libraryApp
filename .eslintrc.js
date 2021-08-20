module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
    sourceType: 'module'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'jest',
    'cypress'
  ],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': 'off',
    'no-console': 'off',
    'vue/require-default-prop': 'off',
    'Trailing spaces not allowed':'off'
  }
}
