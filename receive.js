// @ts-check
const micro = require('micro')

module.exports = async function (req, res) {
  try {
    const uploadedZip = await micro.buffer(req)
    console.log('uploaded zip', uploadedZip)

    micro.send(res, 200, 'ok')
  } catch (e) {
    console.error(e)
    micro.send(res, 500, { message: e.message })
  }
}
