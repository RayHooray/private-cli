#!/usr/bin/env node
// 操作命令行
const program = require('commander')
// 生成版本号方便查询版本号，这里索取 package.json 中的 version 属性，版本迭代根据 version 属性来控制
program.version(require('../package.json').version)

// 命令行生成 cli 命令
program
  .command("init <name>")
  .description('init project')
  .action(require('../lib/init')) // 执行操作
// 命令行解析主进程输出参数信息
program.parse(process.argv)
