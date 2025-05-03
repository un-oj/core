import ts from '@typed-sigterm/eslint-config';

export default ts({
  rules: {
    'no-cond-assign': [0],
    'no-console': [2],
    'ts/explicit-function-return-type': [2],
  },
}, {
  files: ['scripts/*.ts'],
  rules: {
    'no-console': [0],
    'ts/explicit-function-return-type': [0],
  },
});
