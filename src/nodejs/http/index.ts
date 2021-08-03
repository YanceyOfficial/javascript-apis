import http from 'http'
import { sleep } from 'yancey-js-util'
import { mockData } from './mock'

class App {
  private routers = {}
  constructor(private port: number, public callback: () => void) {
    this.port = port
    this.callback = callback
    this.initial()
  }

  public initial() {
    http
      .createServer(async (req, res) => {
        const _url = req.url
        const _method = req.method

        const request = this.routers[_url]
        if (request && request.mothod === _method) {
          const response = await request.cb(req, res)

          res.end(response)
          return
        }

        res.end('404')
      })
      .listen(this.port, this.callback)
  }

  public get(url: string, cb: (req: any, res: any) => any) {
    return {
      method: 'GET',
      url,
      cb,
    }
  }

  public post(url: string, cb: (req: any, res: any) => any) {
    return {
      method: 'POST',
      url,
      cb,
    }
  }

  public setRouter(...args: any[]) {
    for (const arg of args) {
      const { url } = arg

      if (this.routers[url]) {
        console.warn('repeat url!')
      }
      this.routers[url] = arg
    }
  }
}

const app = new App(3004, () => {
  console.log('run')
})

const getHello = app.get('/hello', async (req, res) => {
  await sleep(1000)
  return JSON.stringify(mockData)
})

const postWorld = app.post('/world', async (req, res) => {
  await sleep(1000)
  return JSON.stringify({ a: 1, b: 2 })
})

app.setRouter(getHello, postWorld)
