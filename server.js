// @ts-check
const http = require('http')
const micro = require('micro')

const PORT = 7600

;(async function () {
  const requestListener = async function (req, res) {
    try {
      const uploadedZip = await micro.buffer(req)
      console.log('uploaded zip', uploadedZip)

      micro.send(res, 200, 'ok')
    } catch (e) {
      console.error(e)
      micro.send(res, 500, { message: e.message })
    }
  }

  const server = http.createServer(requestListener)
  server.listen(PORT, () => {
    console.log('listening at %o', server.address())
  })
})()
