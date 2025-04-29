import { readdirSync } from 'node:fs';
import path from 'node:path';

const types = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];
const platforms = readdirSync(path.resolve(import.meta.dirname, './src/platforms'))
  .map(file => file.replace('.ts', ''));

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', platforms],
    'type-enum': [2, 'always', [...types, 'release']],
  },
};
