const { promisify } = require('util')
const stream = require('stream')
const fs = require('fs')
const got = require('got')
const { URLSearchParams } = require('url')

const pipeline = promisify(stream.pipeline)

async function upload(options = {}) {
  const search = new URLSearchParams(options)

  const response = await pipeline(
    fs.createReadStream('example.zip'),
    got.stream.post(`http://localhost:7600/receive?${search.toString()}`),
    new stream.PassThrough(),
  )
  console.log('upload response', response)
}
upload({ width: 100, height: 200, elementSelector: '.foo' }).then(
  console.log,
  console.error,
)
