import { promises as dnsPromises, Resolver } from 'dns'

/* 
lookup 可能不会直接链接 DNS 服务器, 他可能会走 Hosts, 因此在断网时也可用
尽管 dns.lookup() 是异步方法, 但在内部 libuv 底层线程池中却是同步的调用 getaddrinfo(3)
*/
async function lookup(address: string) {
  try {
    const addresses = await dnsPromises.lookup(address)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}

async function lookupService(address: string, port: number) {
  try {
    const addresses = await dnsPromises.lookupService(address, port)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}

/* 
设置域名解析的地址, 不会影响到全局, 只会影响本次
*/
function setServer(ips: string[]) {
  dnsPromises.setServers(ips)
}

/* 
resolve
*/
type RRTYPE =
  | 'A'
  | 'AAAA'
  | 'ANY'
  | 'CAA'
  | 'CNAME'
  | 'MX'
  | 'NAPTR'
  | 'NS'
  | 'PTR'
  | 'SOA'
  | 'SRV'
  | 'TXT'

async function resolve(address: string, rrtype: RRTYPE = 'A') {
  try {
    const addresses = await dnsPromises.resolve(address, rrtype)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}

/* 
DNS 服务器运营商可以选择不响应 ANY 查询,
调用单个方法(如 dns.resolve4(), dns.resolveMx() 等) 可能会更好
*/
async function resolveAny(address: string) {
  try {
    const addresses = await dnsPromises.resolveAny(address)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}

/* 
使用 Resolver 类
*/
const resolver = new Resolver()

resolver.resolveTxt('yanceyleo.com', (err, addresses) => {
  if (err) return err
  console.log(addresses)
})

// 如果 100ms 没查到资源, 就取消掉
setTimeout(() => {
  resolver.cancel()
}, 100)

/* 
reverse: 根据 ip 反解析主机名
*/

async function reverse(ip: string) {
  try {
    const addresses = await dnsPromises.reverse(ip)
    console.log(addresses)
  } catch (e) {
    throw new Error(e)
  }
}
