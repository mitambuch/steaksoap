/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Types autorisés (doit correspondre à CLAUDE.md)
    'type-enum': [2, 'always', [
      'feat',
      'fix',
      'refactor',
      'style',
      'chore',
      'docs',
      'perf',
      'test',
      'merge',
    ]],
    // Scope obligatoire
    'scope-empty': [2, 'never'],
    // Max 72 chars sur la première ligne
    'subject-max-length': [2, 'always', 72],
    // Minuscules uniquement
    'subject-case': [2, 'always', 'lower-case'],
    // Pas de point final
    'subject-full-stop': [2, 'never', '.'],
  },
};
