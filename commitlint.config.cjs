// 用于配置代码提交的规范性检查工具 commitlint.
// commitlint 是一个用于验证代码提交信息格式的工具，
// 它可以确保提交信息遵循一定的约定，便于团队成员理解和管理代码提交历史。
module.exports = {
    ignores: [(commit) => commit.includes('init')],
    extends: ['@commitlint/config-conventional'],
    rules: {
      'body-leading-blank': [2, 'always'],
      'footer-leading-blank': [1, 'always'],
      'header-max-length': [2, 'always', 108],
      'subject-empty': [2, 'never'],
      'type-empty': [2, 'never'],
      'subject-case': [0],
    },
  }