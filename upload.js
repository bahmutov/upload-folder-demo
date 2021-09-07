const { promisify } = require('util')
const stream = require('stream')
const fs = require('fs')
const got = require('got')
const { URLSearchParams } = require('url')

const pipeline = promisify(stream.pipeline)

async function upload(options = {}) {
  const search = new URLSearchParams(options)

  // const output = new stream.Writable()
  // output.data = []
  // output._write = function (chunk) {
  //   output.data.push(chunk)
  // }

  // // Will be emitted when the input stream has ended,
  // // i.e. no more data will be provided
  // output.on('finish', function () {
  //   // Create a buffer from all the received chunks
  //   var b = Buffer.concat(this.data)

  //   // Insert your business logic here
  //   console.log('finished')
  // })

  // const r = await pipeline(
  //   fs.createReadStream('example.zip'),
  //   got.stream.post(`http://localhost:7600/receive?${search.toString()}`),
  //   new stream.PassThrough(),
  //   // output,
  // )
  const p = new Promise((resolve, reject) => {
    stream.pipeline(
      fs.createReadStream('example.zip'),
      got.stream.post(`http://localhost:7600/receive?${search.toString()}`),
      // new stream.PassThrough(),
      fs.createWriteStream('result.json'),
      (err) => {
        if (err) {
          console.log('Problem:', err.message)
          return reject(err)
        }
        console.log('posted')
        resolve()
      },
    )
  })
  await p

  console.log('upload response')
}
upload({ width: 100, height: 200, elementSelector: '.foo' }).then(console.error)
