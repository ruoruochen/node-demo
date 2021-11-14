// 获取Http模块
const http = require('http')
const url = require('url')

function start(route, handle) {
  function onRequest(request, response) {
    let postData = ''
    const pathName = url.parse(request.url).pathname
    console.log(`Request for ${pathName} received`)
    route(handle, pathName, response, request)
  }

  http.createServer(onRequest).listen(8889)
  console.log('Server has started')
}

module.exports = {
  start,
}
// export default start
