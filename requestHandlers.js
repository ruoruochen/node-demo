// 模块
const querystring = require('querystring')
const fs = require('fs')
const formidable = require('formidable')

// 请求处理器
function start(response) {
  console.log("Request handler 'start' was called.")
  const body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/upload" enctype="multipart/form-data" method="post">
      <input type="file" name="upload">
      <input type="submit" value="Submit text" />
    </form>
  </body>
</html>`
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.write(body)
  response.end()
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.")
  // 处理数据
  const form = new formidable.IncomingForm()
  form.uploadDir = 'E:/Study/Front-end/Node-Study-Area/demo'
  form.parse(request, (error, fileds, files) => {
    console.log('parsing done')
    // 同步修改文件名
    fs.renameSync(files.upload.filepath, './tmp/test.jpg')
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(`receive image:<br/>`)
    response.write(`<img src="/show"/>`)
    response.end()
  })
}

function show(response) {
  console.log("Request handler 'show' was called.")
  fs.readFile(
    'E:/Study/Front-end/Node-Study-Area/demo/tmp/test.jpg',
    'binary',
    (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' })
        response.write(error + '\n')
        response.end()
      } else {
        response.writeHead(200, { 'Content-Type': 'image/jpg' })
        response.write(file, 'binary')
        response.end()
      }
    }
  )
}

module.exports = {
  start,
  upload,
  show,
}
