// 处理异步方法
const { promisify } = require('util')
// 自定义图标
const figlet = promisify(require('figlet'))
// 清屏
const clear = require('clear')
// 彩色日志
const chalk = require('chalk')
// chalk 可以自定义输出 log 的文字颜色
const log = content => console.log(chalk.blueBright(content))
// 引入下载方法
const { clone, spwan } = require('./download')
const { spawn } = require('child_process')


module.exports = async name => {
  // 欢迎界面
  clear() // 清除命令行内容
  // 自定义命令行中显示 cli 的主题大写艺术字
  const data = await  figlet('Welcome use RayCli')
  // 在命令行输出日志
  log(data)
  // 克隆远程仓库
  log(`🚀🐒 创建项目${name}`)
  // 拉去远程仓库代码 github gitlab 。。。。。
  await clone('github:RayHooray/react-ts-template', name)
  // 自动下载依赖，通过 node 操作 shell
  log(`🦐 安装依赖`)
  /**
   * @param option.cwd: 指定执行的环境，本项目中为工程项目中的项目文件夹根目录
   * 
   * @param agrv0： 可以根据自己喜好，选择包管理工具的命令，此处为 yarn
   * 
   * @param agrv1: 命令执行参数，比如 install（npm） add（yarn）
   */
  await spwan('yarn', [""], {cwd: `./${name}`})

  log(`
✅ 安装完成
${await figlet('have a nice day')}
To get start
===================================
    cd ${name}
    yarn start
===================================
  `)

  // 自动启动
  await spawn('yarn', ['start'], {cwd: `./${name}`})
}
