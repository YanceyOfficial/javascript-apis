import { createRequire } from 'module'
import path from 'path'
import process from 'process'
import fs from 'fs'

// eslint-disable-next-line
const _require = createRequire(import.meta.url)
// const siblingModule = _require('./hello.ts')
// console.log(siblingModule)

// async function dynamicImport() {
//   // eslint-disable-next-line
//   const _require = new Function('file', 'return import(file)')
//   await _require('./hello.js')
// }
// dynamicImport()

async function loadConfigFromBundledFile(fileName, bundledCode) {
  const realFileName = fs.realpathSync(fileName)
  const defaultLoader = _require.extensions['.js']
  _require.extensions['.js'] = (module, filename) => {
    if (filename === realFileName) {
      console.log(module._compile)
      // eslint-disable-next-line
      module._compile(bundledCode, filename)
    } else {
      defaultLoader(module, filename)
    }
  }
  // clear cache in case of server restart
  delete _require.cache[_require.resolve(fileName)]
  const raw = _require(fileName)
  _require.extensions['.js'] = defaultLoader
  // eslint-disable-next-line
  return raw.__esModule ? raw.default : raw
}

console.log(
  await loadConfigFromBundledFile(path.join(process.cwd(), 'src/module/hello.js'), 'console.log("code string")'),
)
