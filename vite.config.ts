// ConfigEnv、UserConfigExport、loadEnv 是从 vite 模块中导入的类型定义。
import { ConfigEnv, UserConfigExport, loadEnv } from 'vite'
// vue 是从 @vitejs/plugin-vue 模块中导入的插件，用于支持 Vue 单文件组件。
import vue from '@vitejs/plugin-vue'
// viteMockServe 是从 vite-plugin-mock 模块中导入的插件，用于在开发过程中提供虚拟的接口数据。
import { viteMockServe } from 'vite-plugin-mock'
// 导入 path 模块，用于处理文件路径。
import path from 'path'
// 引入svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下对应的变量
  // mode模式变量，默认是开发模式
  // process.cwd()我要加载那个文件，以及文件位置
  let env = loadEnv(mode, process.cwd())
  // 获取各种环境下对应的变量
  return {
    // base：指定项目的基本路径，即在服务器根目录中的位置，默认为 './'。
    base: './',
    // plugins：配置使用的插件。
    plugins: [
      // vue()：用于支持 Vue 单文件组件
      vue(),
      // createSvgIconsPlugin()：用于处理 SVG 图标文件并生成相应的 Vue 组件。
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      // viteMockServe()：用于提供虚拟的接口数据，仅在开发模式下启用。
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    // resolve：配置模块解析选项。其中的 alias 属性用于设置别名，将 @ 映射到 ./src 目录。
    resolve: { alias: { '@': path.resolve('./src') } },
    // css：配置 CSS 预处理器选项。这里使用了 SCSS 预处理器，并指定了一些选项，如启用 JavaScript 表达式、引入额外的数据等。
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // server：配置开发服务器选项。
    // 其中的 proxy 属性用于设置代理跨域。
    // 它将请求发送到 env.VITE_APP_BASE_API 定义的目标服务器地址，并进行路径重写。
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          // 获取数据的服务器地址设置
          target: env.VITE_SERVE,
          // 需要代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
