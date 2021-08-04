import http from 'http'
import { Method } from './types'

interface Dict {
  [x: string]: Request
}

interface Request {
  method: Method
  url: string
  cb: () => void
}

class NodeServer {
  private routers: Dict = {}

  constructor(private port: number, private callback: () => void) {
    this.port = port
    this.callback = callback
    this.initial()
  }

  public initial() {
    http
      .createServer(async (req, res) => {
        const _url = req.url || ''
        const _method = req.method || Method.GET

        const request = this.routers[_url]
        let cb
        if (request && request.method === _method) {
          cb = request.cb
        }

        if (typeof cb !== 'function') {
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
      method: Method.GET,
      url,
      cb,
    }
  }

  public post(url: string, cb: () => any): Request {
    return {
      method: Method.POST,
      url,
      cb,
    }
  }

  public setRouters(...args: Request[]) {
    for (const arg of args) {
      const { url } = arg

      if (this.routers[url]) {
        console.warn('repeat url!')
        continue
      }
      this.routers[url] = arg
    }
  }
}

export default NodeServer
