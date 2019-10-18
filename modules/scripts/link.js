const cp = require('child_process')


const a = cp.exec('yarn build:watch')
a.stdout.on('data', data => console.log(data))
a.stderr.on('error', err => console.log(err))

setTimeout(() => {
    const b = cp.exec('yarn link:all')
    b.stdout.on('data', data => console.log(data))
    b.stderr.on('error', err => console.log(err))
}, 20000);


