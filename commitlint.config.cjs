module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Increase line length limits to accommodate semantic-release changelogs
    'body-max-line-length': [2, 'always', 200],
    'footer-max-line-length': [2, 'always', 200],
    'footer-leading-blank': [1, 'always'],
    
    // Be more lenient with automated releases
    'subject-case': [1, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    
    // Allow longer subject lines for better descriptions
    'subject-max-length': [2, 'always', 100],
    
    // Ensure conventional commit types are followed
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'ci',
        'build',
        'revert'
      ]
    ]
  }
};
