// const cp = require('child_process')
// const path = require('path')
// // var a = cp.exec('yarn build:watch')
// // a.on('message', (message) => { console.log('a',message) })

// // a.on('error',e=>console.log(e))

// // const b = cp.exec('ls');

// const a = cp.exec('yarn build:watch', (err) => {
//     if (!err) {
//         console.log('aaaaaaaaaaaaaaaaaaaaaaa')
//     }else{
//         console.log('zzzzzzzzzzzzzzzzz')
//     }
// })
// a.stdout.on('end', () => {
//     console.log('eeeeeeeeeeeeeeeeeeeend')
// })

// a.on('message', (message) => { console.log('message1', message) })
// a.on('error', e => console.log('error1', e))
// a.on('exit', () => console.log('exti1'))
// a.stdout.on('data', data => console.log('data1', data))
// a.stderr.on('error', err => console.log('error1', err))
// a.stdin.on('close', () => console.log('close1'))
// a.stdin.on('finish', a => console.log('finish1', a))

// const b = cp.exec('yarn start', { cwd: path.resolve('./packages/demo') })

// b.on('message', (message) => { console.log('b', message) })
// b.on('error', e => console.log('eeee', e))
// b.on('exit', () => console.log('exti'))
// b.stdout.on('data', data => console.log('data', data))
// b.stderr.on('error', err => console.log('err', err))
// b.stdin.on('close', () => console.log('close'))
// b.stdin.on('finish', a => console.log(a))
