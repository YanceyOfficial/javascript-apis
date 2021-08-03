import os from 'os'

os.EOL // 返回操作系统特定的行尾标记, Linux 是 `\n`, Windows 上是 `\r\n`.

os.arch() // 返回架构信息, 如 `x64`.

os.constants // 定义 os 中的特殊常量, 包含信号常量, 错误常量, 优先级常量, libuv 常量.

os.cpus() // 返回 cpu 信息, 是一个数组, 可用于计算 cpu 数量, 以调度集群.

os.devNull // 返回空设备的特定于平台的文件路径. Windows 上是 `\\.\nul`, POSIX 上是 `/dev/null`.

os.endianness() // 返回标识为其编译 Node.js 二进制文件的 CPU 的字节序的字符串, 即 `BE` 或者 `LE`.

os.freemem() // 系统剩余内存, 精确到字节.

os.totalmem() // 系统总内存, 精确到字节.

os.getPriority(57864) // 返回某个进程 PID 的优先级, 不传参数默认查找 PID 为 0 的优先级.

os.setPriority(57864, 1) // 给某个进程的 PID 设置优先级, 不传第二个参数默认设置优先级为 0, 第二个参数在 [-20, 19] 之间.

os.homedir() // 返回当前用户的根目录, 如 `/home/mongodb`.

os.hostname() // 返回主机名, 如 `localhost.localdomain`.

os.loadavg() // 返回包含 1, 5 和 15 分钟平均负载的数组, 注意`平均负载`是 Unix 特有概念, Windows 没有.

os.networkInterfaces() // 返回包含已分配网络地址的网络接口的对象.

os.platform() // 返回系统平台, 如 `darwin`, `linux`. 等价于 `process.platform`.

os.type() // 返回系统平台的名称, 如 `Darwin`, `Linux`. 基本等价于 `os.platform()` 的首字母大写.

os.release() // 返回操作系统的发行版本, 如 `4.19.0-5-amd64`.

os.tmpdir() // 返回操作系统默认临时文件的目录, 如 `/var/folders/lq/rd27f8l948g4k4jkgqw8rwmc0000gn/T`.

os.uptime() // 返回操作系统连续运行时间, 单位为秒. 好家伙, 距离我上次把服务器搞挂已经过去 116 天了.

os.userInfo({ encoding: 'utf-8' }) // 返回用户信息, options 中的 encoding 默认为 `utf-8`.

os.version() // 返回内核版本, 如 `Darwin Kernel Version 20.4.0: Thu Apr 22 21:46:47 PDT 2021; root:xnu-7195.101.2~1/RELEASE_X86_64`.
