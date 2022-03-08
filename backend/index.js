const http = require("http")
const app = require("./app")
const server = http.createServer(app)

server.listen(3004, () => {
  console.log("Server running ...")
})
