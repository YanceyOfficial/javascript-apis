// crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
import crypto from 'crypto'

const secret = 'Força Barça'

const hash = crypto
  .createHmac('sha1', secret)
  .update('I love cupcakes')
  .digest('hex')
// console.log(hash) // 3aadc32269a1d0c60e8f08573b889afb59058b1c

// Certificate, 略过, 网景时代的产物

/*
 * Cipher 类
 */

const algorithm = 'aes-192-cbc'
const password = '用于生成密钥的密码'
const key = crypto.scryptSync(password, '盐值', 24)
const iv = crypto.randomBytes(16) // 初始化向量。

const cipher = crypto.createCipheriv(algorithm, key, iv)

let encrypted = cipher.update('要加密的数据', 'utf8', 'hex')
encrypted += cipher.final('hex')
console.log(encrypted) // 5098218e4f9625b368ebb315694f3207af600ac85f6204056db3c7010bf841bb
