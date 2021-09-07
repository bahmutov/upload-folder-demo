// @ts-check
const micro = require('micro')
const toQuery = require('to-query')()
const unzipper = require('unzipper')
const path = require('path')
const del = require('del')

// receives a buffer with the zipped folder
// and query of parameters. The unzips the folder Zip
// into a temp folder and does nothing
module.exports = async function (req, res) {
  const query = toQuery(req.url)
  console.log('query', query)

  try {
    const outputFolder = path.join(process.cwd(), 'received')
    console.log('removing %s', outputFolder)
    await del(outputFolder)

    const uploadedZip = await micro.buffer(req)
    // console.log('received zip', uploadedZip)

    // https://github.com/ZJONSSON/node-unzipper
    const folder = await unzipper.Open.buffer(uploadedZip)
    // console.log('folder', folder)
    await folder.extract({
      path: outputFolder,
      concurrency: 5,
    })
    console.log('unzipped into folder %s', outputFolder)

    micro.send(res, 200, { ok: true })
  } catch (e) {
    console.error(e)
    micro.send(res, 500, { message: e.message })
  }
}
