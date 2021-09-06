// @ts-check
const micro = require('micro')
const toQuery = require('to-query')()

module.exports = async function (req, res) {
  const query = toQuery(req.url)
  console.log('query', query)

  try {
    const uploadedZip = await micro.buffer(req)
    console.log('uploaded zip', uploadedZip)

    micro.send(res, 200, 'ok')
  } catch (e) {
    console.error(e)
    micro.send(res, 500, { message: e.message })
  }
}
