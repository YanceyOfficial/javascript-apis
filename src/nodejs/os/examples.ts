// os.cpus()
const cpus = [
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 181275510,
      nice: 0,
      sys: 178273020,
      idle: 897042680,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 24908100,
      nice: 0,
      sys: 47295060,
      idle: 1184293620,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 170776330,
      nice: 0,
      sys: 149978540,
      idle: 935746240,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 23847250,
      nice: 0,
      sys: 33646380,
      idle: 1199002740,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 146656980,
      nice: 0,
      sys: 130308700,
      idle: 979535030,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 23785660,
      nice: 0,
      sys: 28625600,
      idle: 1204084780,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 136273910,
      nice: 0,
      sys: 121728560,
      idle: 998497870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i5-8257U CPU @ 1.40GHz',
    speed: 1400,
    times: {
      user: 23649680,
      nice: 0,
      sys: 26906790,
      idle: 1205939220,
      irq: 0,
    },
  },
]

// os.networkInterfaces()
const networkInterfaces = {
  lo0: [
    {
      address: '127.0.0.1',
      netmask: '255.0.0.0',
      family: 'IPv4',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '127.0.0.1/8',
    },
    {
      address: '::1',
      netmask: 'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: '::1/128',
      scopeid: 0,
    },
    {
      address: 'fe80::1',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: true,
      cidr: 'fe80::1/64',
      scopeid: 1,
    },
  ],
  en0: [
    {
      address: 'fe80::1809:47f4:b0aa:a429',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'e0:b5:5f:ef:1b:f1',
      internal: false,
      cidr: 'fe80::1809:47f4:b0aa:a429/64',
      scopeid: 6,
    },
    {
      address: '172.24.240.10',
      netmask: '255.255.252.0',
      family: 'IPv4',
      mac: 'e0:b5:5f:ef:1b:f1',
      internal: false,
      cidr: '172.24.240.10/22',
    },
  ],
  awdl0: [
    {
      address: 'fe80::9474:43ff:fef6:71a6',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '96:74:43:f6:71:a6',
      internal: false,
      cidr: 'fe80::9474:43ff:fef6:71a6/64',
      scopeid: 11,
    },
  ],
  llw0: [
    {
      address: 'fe80::9474:43ff:fef6:71a6',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '96:74:43:f6:71:a6',
      internal: false,
      cidr: 'fe80::9474:43ff:fef6:71a6/64',
      scopeid: 12,
    },
  ],
  utun0: [
    {
      address: 'fe80::1048:654a:4dcd:cbca',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: false,
      cidr: 'fe80::1048:654a:4dcd:cbca/64',
      scopeid: 13,
    },
  ],
  utun1: [
    {
      address: 'fe80::156d:7501:8efe:112e',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: '00:00:00:00:00:00',
      internal: false,
      cidr: 'fe80::156d:7501:8efe:112e/64',
      scopeid: 14,
    },
  ],
  en3: [
    {
      address: 'fe80::aede:48ff:fe00:1122',
      netmask: 'ffff:ffff:ffff:ffff::',
      family: 'IPv6',
      mac: 'ac:de:48:00:11:22',
      internal: false,
      cidr: 'fe80::aede:48ff:fe00:1122/64',
      scopeid: 4,
    },
  ],
}

// os.userInfo()
const userInfo = {
  uid: 501,
  gid: 20,
  username: 'mongodb',
  homedir: '/Users/mongodb',
  shell: '/bin/zsh',
}
