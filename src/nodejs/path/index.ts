import path from 'path'
import os from 'os'

const isWindows = os.platform() === 'win32'

function slash(p: string): string {
  return p.replace(/\\/g, '/')
}

function normalizePath(id: string): string {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

console.log(normalizePath('/Users/yanceyleo/code/learn-frame/learn-nodejs/src/module/hello.js'));
