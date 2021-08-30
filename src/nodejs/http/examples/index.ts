import { sleep } from 'yancey-js-util'
import NodeServer from '../index'

const app = new NodeServer(3004, () => {
  console.log('run')
})

const getHello = app.get('/hello', async () => {
  await sleep(1000)
  return JSON.stringify({ name: 'Yancey' })
})

const postWorld = app.post('/world', async () => {
  await sleep(1000)
  return JSON.stringify({ a: 1, b: 2 })
})

app.setRouters(getHello, postWorld)
