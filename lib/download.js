// node 解决异步 promise 的解决方案
const { promisify } = require('util')

/**
 * @param command: 执行下载的命令 npm cnpm yarn
 * @param commandParams：命令参数，类型 Array<string>
 * @param options: 定义掐他 类型 Object
*/
const spwan = async (...agrs) => {
  // 获取子进程的 spwan 属性
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const childProcess = spawn(...agrs)
    // 子进程标准输出流通过流式传输，输出主进程标准输出
    childProcess.stdout.pipe(process.stdout)
    // 子进程标准错误流通过流式传输，输出主进程标准错误
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve()
    })
  })
}
/**
 * 拉去自定义仓库，仓库可以自己定制化，通过 cli 生成已经过定制化的工程
 * @param repo: github 路径地址（书写规范: 'github: url'）
 * GitHub - github:owner/name or simply owner/name
 * GitLab - gitlab:owner/name
 * Bitbucket - bitbucket:owner/name
 * @param desc: 下载到本地的文件夹名称，一半与项目名称一致，desc 为 describe的意思
*/
const clone = async function(repo, desc) {
  // 在函数体内引用可能好处就是在使用完成不再使用后，垃圾回收机制自动清除掉
  const download = promisify(require('download-git-repo'))
  // 进度条
  const ora = require('ora')
  // 在命令行显示下载信息
  const process = ora(`下载…… ${repo}`)
  // 开启进程
  process.start()
  // 异步下载
  await download(repo, desc)
  // 主进程执行完毕且成功
  process.succeed()
}

module.exports = {
  clone,
  spwan
}