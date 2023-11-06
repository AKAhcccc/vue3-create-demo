// 限制包管理工具
// 先使用正则表达式匹配环境变量 npm_execpath 中是否包含字符串 pnpm。
// 如果没有包含，会输出一个黄色警告信息，提示用户必须使用 pnpm 作为包管理器才能正常运行该脚本。
// 然后，程序调用 process.exit(1) 强制退出当前进程。
if (!/pnpm/.test(process.env.npm_execpath || '')) {
  console.warn(
    `\u001b[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.\u001b[39m\n`,
  )
  process.exit(1)
}
