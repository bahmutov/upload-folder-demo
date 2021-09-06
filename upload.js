const { promisify } = require('util')
const stream = require('stream')
const fs = require('fs')
const got = require('got')

const pipeline = promisify(stream.pipeline)

async function upload() {
  await pipeline(
    fs.createReadStream('example.zip'),
    got.stream.post('http://localhost:7600/receive'),
    new stream.PassThrough(),
  )
  console.log('loaded file')
}
upload().then(console.log, console.error)
