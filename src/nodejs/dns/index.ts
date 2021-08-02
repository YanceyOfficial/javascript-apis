import dns, { promises as dnsPromises } from 'dns'

const YANCEY_DOMIN = 'yanceyleo.com'
const GOOGLE_DOMAIN = 'google.com'
const BAIDU_DOMAIN = 'baidu.com'

/*
 * dns.getServers() 返回一个用于当前 DNS 解析的 IP 地址字符串的数组
 */
console.log(dns.getServers()) // [ '192.168.1.1', '202.106.46.151' ]

/*
 * lookup 用来解析 IP 地址, 它使用操作系统功能来执行域名解析, 它可能不需要执行任何网络通信
 * 尽管 dns.lookup() 是异步方法, 但在内部 libuv 底层线程池中却是同步的调用 getaddrinfo(3)
 * 在某些场景下它可能会造成性能问题
 * 而其他函数都连接到实际的 DNS 服务器以执行域名解析, 它们将会始终使用网络执行 DNS 查询
 */
const getLookUp = async (domain: string) => {
  try {
    const { address, family } = await dnsPromises.lookup(domain, {
      family: 0, // 记录的地址族: 0 | 4 | 6
      hints: 0,
      // 当为 true 时, 则回调将会返回数组中所有已解析的地址.
      // 否则, 返回单个地址. 默认为 false;
      // 当 all 选项被设置为 true 时, callback 的参数会变为 (err, addresses),
      // 其中 addresses 变成一个由 address 和 family 属性组成的对象数组.
      all: false,
      // 当为 true 时, 则回调按 DNS 解析器返回的顺序接收 IPv4 和 IPv6 地址.
      // 当为 false 时, 则 IPv4 地址放在 IPv6 地址之前
      verbatim: true,
    })
    console.log(`地址: ${address} 地址族: IPv${family}s`)
  } catch (e) {
    throw new Error(e)
  }
}
// 地址: 104.31.78.7 地址族: IPv4s
getLookUp(BAIDU_DOMAIN)

/*
 * lookupService 根据 IP 和 端口来查询其域名及协议
 */
const getLookUpService = async (ip: string, port: number) => {
  try {
    const { hostname, service } = await dnsPromises.lookupService(ip, port)
    console.log(`地址: ${hostname} 协议: ${service}`)
  } catch (e) {
    throw new Error(e)
  }
}
// 地址: tsa03s01-in-f14.1e100.net 协议: https
getLookUpService('216.58.200.238', 443)

/*
 * resolve 使用 DNS 协议解析域名, 获取该域名指定的资源记录
 * 它的第二个参数就是资源记录类型, 如 'A', 'AAAA', 'CNAME' 等
 */
const getResolve = async (url: string, rrtype = 'A') => {
  try {
    const records = await dnsPromises.resolve(url, rrtype)
    console.log(records)
  } catch (e) {
    throw new Error(e)
  }
}
// [
//   [
//     'google-site-verification=AMMK6PYbEeYsOjRxv2uelQyK8V6E-kpDwXxRy7iZISI'
//   ],
//   [ 'v=spf1 include:spf.mxhichina.com -all' ]
// ]
getResolve(YANCEY_DOMIN, 'TXT')

/*
 * resolve4 使用 DNS 协议解析 IPv4 地址
 */
const getResolve4 = async (url: string) => {
  try {
    const addresses = await dnsPromises.resolve4(url)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}
// [ '216.58.200.238' ]
getResolve4(GOOGLE_DOMAIN)

/*
 * resolve6 使用 DNS 协议解析 IPv6 地址
 */
const getResolve6 = async (url: string) => {
  try {
    const addresses = await dnsPromises.resolve6(url)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}
// [
//   '2606:4700:3035::681f:4e07',
//   '2606:4700:3034::681f:4f07',
//   '2606:4700:3032::ac43:df01'
// ]
getResolve6(YANCEY_DOMIN)

/*
 * resolveAny 解析域名的任意资源记录, DNS 服务器运营商有权不响应 ANY 方法
 * 因此最好使用各快捷方法
 */
const getResolveAny = async (url: string) => {
  try {
    const ret = await dnsPromises.resolveAny(url)
    console.log(ret)
  } catch (e) {
    throw new Error(e)
  }
}
getResolveAny(YANCEY_DOMIN)

/*
 * reverse 根据 IP 反查域名
 */
const getDomainFromIP = async (ip: string) => {
  try {
    const hostnames = await dnsPromises.reverse(ip)
    console.log(hostnames)
  } catch (e) {
    throw new Error(e)
  }
}
// [ 'yanceyleo.com' ]
getDomainFromIP('39.156.69.79')