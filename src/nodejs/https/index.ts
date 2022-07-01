import { parse } from 'acorn'

const fnStr = `
function hello() {
    console.log('say hello')
}
`

console.log(parse(fnStr, { ecmaVersion: 2020 }))
