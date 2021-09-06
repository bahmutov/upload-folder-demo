const { promisify } = require('util')
const stream = require('stream')
const fs = require('fs')
const got = require('got')
const { URLSearchParams } = require('url')

const pipeline = promisify(stream.pipeline)

async function upload(options = {}) {
  const search = new URLSearchParams(options)

  await pipeline(
    fs.createReadStream('example.zip'),
    got.stream.post(`http://localhost:7600/receive?${search.toString()}`),
    new stream.PassThrough(),
  )
  console.log('loaded file')
}
upload({ width: 100, height: 200, elementSelector: '.foo' }).then(
  console.log,
  console.error,
)
