const shell = require('shelljs')
const Dev = (env, options) => {
  process.env.projectPath = process.cwd()
  shell.cd(__dirname)
  shell.cd('../')
  shell.exec('node index.js')
}
module.exports = Dev