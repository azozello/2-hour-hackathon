const http = require('http')


compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)


const PORT = 8081
const GET_METHOD = 'GET'
const POST_METHOD = 'POST'
const HEADERS = {
  'Content-Type': 'application/json'
}
const SUCCESS_CODE = 200
const ERROR_CODE = 400


const getRouting = ({request, response}) => {
  if (request.method === GET_METHOD) {
    switch (request.url) {
      case '/subscribe':
        setTimeout(() => {
          response.writeHead(SUCCESS_CODE, HEADERS)
          response.end(JSON.stringify({response: 'Response'}))
        }, 5000)
        break
      default:
        response.writeHead(ERROR_CODE, HEADERS)
        response.end(JSON.stringify({error: 'Page not found'}))
        break
    }
  }
  return {request, response}
}

const postRouting = ({request, response}) => {
  if (request.method === POST_METHOD) {
    switch (request.url) {
      case '/a':
        response.end(JSON.stringify({response: 'a'}))
        break
      case '/b':
        response.end(JSON.stringify({response: 'b'}))
        break
      case '/c':
        response.end(JSON.stringify({response: 'c'}))
        break
      default:
        response.writeHead(ERROR_CODE, HEADERS)
        response.end(JSON.stringify({error: 'Page not found'}))
        break
    }
  }
  return {request, response}
}

const onRequest = (request, response) => {
  try {
    response.writeHead(SUCCESS_CODE, HEADERS)
    compose(getRouting, postRouting)({request, response})
  } catch (e) {
    console.error(e)
    response.writeHead(ERROR_CODE, HEADERS)
    response.end(JSON.stringify(e))
  }
}


const server = http.createServer(onRequest)

server.listen(PORT, () => console.log('Server started'))
