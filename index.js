const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const PORT = 3000
const messages = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => {
  console.log("a user connected ⚓️")
  socket.on("disconnect", () => {
    console.log("user disconnected🌿")
  })
})

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg)
    messages.push(msg)
    console.log("Messages: ", messages)
  })
})

server.listen(PORT, () => {
  console.log(`Listening on ${PORT} port.🚀`)
})
