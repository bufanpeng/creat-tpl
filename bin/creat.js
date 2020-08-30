const Pkg = require('../package.json')
const Dev = require('./dev')
const program = require('commander')

program
  .name('iss-cli')
  .version(Pkg.version)
  .description('闪送前端开发-pages创建工具')
  .option('-e, --env', '环境变量：a | b | c | d | prod')

// 启动开发服务
program
  .name('dev')
  .action((env, options) => {
    Dev(env, options)
  })

program.parse(process.argv)