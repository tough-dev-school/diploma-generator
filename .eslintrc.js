module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'require-await': 'error',
    'no-param-reassign': 'off',
    'prefer-object-spread': 'off',
    'consistent-return': 'off',
    'no-irregular-whitespace': 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'func-names': ['error', 'as-needed'],
    'import/no-default-export': 'error',
  },
};
