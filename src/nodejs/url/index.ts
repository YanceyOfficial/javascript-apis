import { pathToFileURL, URL } from 'url'

console.log(pathToFileURL('/hello/おはよう/🦙.txt'))

const url = new URL('http://localhost:3000/src/containers/Container2/index.tsx?t=1656405920135')
console.log(url.hostname)
