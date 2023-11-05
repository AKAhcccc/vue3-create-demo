// 用于配置代码提交的规范性检查工具 commitlint.
// commitlint 是一个用于验证代码提交信息格式的工具，
// 它可以确保提交信息遵循一定的约定，便于团队成员理解和管理代码提交历史。
module.exports = {
  // ignores: 这是一个数组，包含了一个函数，用于忽略某些提交信息。在这个例子中，只要提交信息中包含字符串 'init'，这样的提交将被忽略不进行规范性检查。
    ignores: [(commit) => commit.includes('init')],
    // extends: 这是一个数组，指定了要使用的 commitlint 配置规则的扩展。
    // 在这个例子中，使用了 @commitlint/config-conventional 扩展，它是 commitlint 官方提供的一个通用规范配置。
    extends: ['@commitlint/config-conventional'],
    // rules: 这是一个对象，定义了具体的规则和它们的配置。下面是各个规则的解释：
    rules: {
      // body-leading-blank: 此规则要求提交信息的正文部分之前有一空行。规则值 [2, 'always'] 表示此规则必须满足。
      'body-leading-blank': [2, 'always'],
      // footer-leading-blank: 此规则要求提交信息的页脚部分之前有一空行。规则值 [1, 'always'] 表示此规则建议满足，但不是强制要求。
      'footer-leading-blank': [1, 'always'],
      // header-max-length: 此规则要求提交信息的标题部分的最大长度不能超过 108 个字符。规则值 [2, 'always', 108] 表示此规则必须满足，且最大长度为 108。
      'header-max-length': [2, 'always', 108],
      // subject-empty: 此规则要求提交信息的标题部分不能为空。规则值 [2, 'never'] 表示此规则必须满足，标题部分不能为空。
      'subject-empty': [2, 'never'],
      // type-empty: 此规则要求提交信息的类型部分不能为空。规则值 [2, 'never'] 表示此规则必须满足，类型部分不能为空。
      'type-empty': [2, 'never'],
      // subject-case: 此规则用于验证提交信息的标题部分的大小写。规则值 [0] 表示此规则不生效，即不进行大小写验证。
      'subject-case': [0],
    },
  }