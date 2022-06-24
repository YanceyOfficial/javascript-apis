import fs from 'fs-extra'
import process from 'process'
import path from 'path'
import { promises as fsp } from 'fs'
import { sleep } from 'yancey-js-util'

async function readFile(filePath: string) {
  try {
    const res = await fs.readFile(filePath, 'utf-8')
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}

async function copyAndRemove(oldfilePath: string, newFilePath: string) {
  try {
    console.log('正在复制文件')
    await fs.copy(oldfilePath, newFilePath)
    console.log('复制成功')
    console.log('1秒钟后删除')
    await sleep()
    console.log('正在删除')
    await fs.remove(newFilePath)
    console.log('删除成功')
  } catch (err) {
    console.error(err)
  }
}

// 相对路径将相对于 process.cwd() 指定的当前工作目录进行解析
readFile('./public/json/json-1.json')

copyAndRemove('./public/json/json-1.json', './public/json/json-2.json')

// 获取文件的 meta 信息
async function stat() {
  console.log(await fsp.stat('./public/json/json-1.json'))
}

stat()

console.log(path.resolve('package.json'))
console.log(fs.realpathSync(path.resolve('package.json')))
