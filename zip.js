// using https://www.npmjs.com/package/archiver
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

function ZipFolder(folderName) {
  console.log('Zipping folder %s', folderName)
  return new Promise((resolve, reject) => {
    // create a file to stream archive data to.
    const outputFilename = path.join(process.cwd(), 'example.zip')
    const output = fs.createWriteStream(outputFilename)
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes')
      console.log(
        'archiver has been finalized and the output file descriptor has closed.',
      )
      resolve(outputFilename)
    })

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('Data has been drained')
    })

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        reject(err)
      }
    })

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      reject(err)
    })

    // pipe archive data to the file
    archive.pipe(output)

    archive.directory(folderName, false)

    archive.finalize()
  })
}

if (!module.parent) {
  ZipFolder('test-folder').then(console.log, console.error)
}
