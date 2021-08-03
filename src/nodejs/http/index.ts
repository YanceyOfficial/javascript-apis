import http from 'http'
import { sleep } from 'yancey-js-util'
import { mockData } from './mock'

interface Dict {
  [x: string]: Request
}

interface Request {
  method: string
  url: string
  cb: () => void
}

class App {
  private routers: Dict = {}

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
        let cb = null
        if (request && request.method === _method) {
          cb = request.cb
        }

        if (!cb) {
          res.end('404')
        }

        const response = await cb()
        res.end(response)
        return
      })
      .listen(this.port, this.callback)
  }

  public get(url: string, cb: () => any) {
    return {
      method: 'GET',
      url,
      cb,
    }
  }

  public post(url: string, cb: () => any): Request {
    return {
      method: 'POST',
      url,
      cb,
    }
  }

  public setRouter(...args: Request[]) {
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

const getHello = app.get('/hello', async () => {
  await sleep(1000)
  return JSON.stringify(mockData)
})

const postWorld = app.post('/world', async () => {
  await sleep(1000)
  return JSON.stringify({ a: 1, b: 2 })
})

app.setRouter(getHello, postWorld)
